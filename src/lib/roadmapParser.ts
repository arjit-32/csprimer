import { getCollection } from "astro:content";
import roadmapOrder from "@/config/roadmapOrder.json";

export interface LessonNode {
  id: string;
  title: string;
  url: string;
  type: string;
}

export interface CourseSection {
  subheading: string;
  lessons: LessonNode[];
}

export interface CourseNode {
  id: string;
  title: string;
  description: string;
  image?: string;
  sections: CourseSection[];
}

export interface RoadmapPathDefinition {
  id: string;
  title: string;
  courses: CourseNode[];
}

export type RoadmapLayout = "linear" | "branching";

export interface RoadmapEdge {
  from: string;
  to: string;
}

export interface RoadmapCategory {
  category: string;
  layout: RoadmapLayout;
  paths: RoadmapPathDefinition[];
  courses: CourseNode[];
  edges: RoadmapEdge[];
}

function toCourseNode(series: any): CourseNode | null {
  if (!series) return null;

  // Filter out any "Further Learnings", "Resources", or external-only sections from roadmaps
  const validNavSections = (series.data.navbar || []).filter((nav: any) => {
    const sub = (nav.subheading || "").toLowerCase();
    if (sub.includes("further") || sub.includes("resource") || sub.includes("reference") || sub.includes("additional")) {
      return false;
    }
    const allExternal = nav.link && nav.link.length > 0 && nav.link.every((l: any) => l.type === "external");
    return !allExternal;
  });

  const sections: CourseSection[] = validNavSections
    .map((nav: any) => ({
      subheading: nav.subheading,
      lessons: (nav.link || [])
        .filter((l: any) => l.type === "articles")
        .map((l: any) => ({
          id: l.url,
          title: l.title,
          url: `/articles/${l.url}`,
          type: l.type
        }))
    }))
    .filter((sec: CourseSection) => sec.lessons.length > 0);

  return {
    id: series.id,
    title: series.data.title,
    description: series.data.description,
    image: series.data.image,
    sections
  };
}

function normalizeRoadmapConfig(category: string, config: any): { layout: RoadmapLayout; paths: RoadmapPathDefinition[] } {
  if (Array.isArray(config)) {
    return {
      layout: "linear",
      paths: [{ id: `${category}-default`, title: "Learning path", courses: config }]
    };
  }

  if (config && Array.isArray(config.paths) && config.paths.length > 0) {
    return {
      layout: config.layout ?? "branching",
      paths: config.paths.map((path: any, index: number) => ({
        id: path.id ?? `${category}-path-${index + 1}`,
        title: path.title ?? (config.paths.length > 1 ? `Path ${index + 1}` : "Learning path"),
        courses: Array.isArray(path.courses) ? path.courses : []
      }))
    };
  }

  const courses = Array.isArray(config?.courses) ? config.courses : [];
  return {
    layout: config?.layout ?? "linear",
    paths: [{ id: `${category}-default`, title: "Learning path", courses }]
  };
}

/**
 * Gets a map of all categories and their properly ordered CourseNodes based on roadmapOrder.json.
 */
export async function getAllRoadmapCourses(): Promise<Record<string, RoadmapCategory>> {
  const allSeries = await getCollection("series");
  const seriesMap = new Map(allSeries.map((series) => [series.id, series]));
  const roadmapCourses: Record<string, RoadmapCategory> = {};

  const orderConfig = roadmapOrder as Record<string, any>;

  for (const [category, config] of Object.entries(orderConfig)) {
    const { layout, paths } = normalizeRoadmapConfig(category, config);

    const normalizedPaths = paths.map((path) => ({
      ...path,
      courses: path.courses
        .map((seriesId: any) => toCourseNode(seriesMap.get(seriesId as any)))
        .filter(Boolean) as CourseNode[]
    }));

    const allCourses: CourseNode[] = [];
    const seen = new Set<string>();

    normalizedPaths.forEach((path) => {
      path.courses.forEach((course) => {
        if (!seen.has(course.id)) {
          seen.add(course.id);
          allCourses.push(course);
        }
      });
    });

    // Handle edges: explicit or auto-generated
    let edges: RoadmapEdge[] = [];
    if (Array.isArray(config.edges)) {
      edges = config.edges.filter(
        (e: any) => e && typeof e.from === "string" && typeof e.to === "string"
      );
    } else {
      // Auto-generate sequential edges per path
      normalizedPaths.forEach((path) => {
        for (let i = 0; i < path.courses.length - 1; i++) {
          edges.push({
            from: path.courses[i].id,
            to: path.courses[i + 1].id
          });
        }
      });
    }

    roadmapCourses[category] = {
      category,
      layout,
      paths: normalizedPaths.map((path) => ({
        id: path.id,
        title: path.title,
        courses: path.courses
      })),
      courses: allCourses,
      edges
    };
  }

  return roadmapCourses;
}
