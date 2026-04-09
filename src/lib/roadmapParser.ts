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

/**
 * Gets a map of all categories and their properly ordered CourseNodes based on roadmapOrder.json.
 */
export async function getAllRoadmapCourses(): Promise<Record<string, CourseNode[]>> {
  const allSeries = await getCollection("series");
  const roadmapCourses: Record<string, CourseNode[]> = {};
  
  // Explicitly defined order from roadmapOrder.json
  const orderConfig = roadmapOrder as Record<string, string[]>;
  
  for (const [category, orderArray] of Object.entries(orderConfig)) {
    const courseNodes: CourseNode[] = [];
    
    for (const seriesId of orderArray) {
      const series = allSeries.find(s => s.id === seriesId);
      if (series) {
        const sections: CourseSection[] = series.data.navbar.map(nav => ({
          subheading: nav.subheading,
          lessons: nav.link.map(l => ({
            id: l.url,
            title: l.title,
            url: l.type === "articles" ? `/articles/${l.url}` : l.url,
            type: l.type
          }))
        }));
        
        courseNodes.push({
          id: series.id,
          title: series.data.title,
          description: series.data.description,
          image: series.data.image,
          sections: sections
        });
      }
    }
    
    roadmapCourses[category] = courseNodes;
  }
  
  return roadmapCourses;
}
