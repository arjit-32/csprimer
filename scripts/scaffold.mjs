import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import crypto from 'node:crypto';
import { exec } from 'node:child_process';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import sharp from 'sharp';

const ROOT_DIR = process.cwd();
const ARTICLES_DIR = path.join(ROOT_DIR, 'src', 'content', 'articles');
const SERIES_DIR = path.join(ROOT_DIR, 'src', 'content', 'series');
const INTERVIEW_DIR = path.join(ROOT_DIR, 'src', 'content', 'interview-questions');
const SHORTS_DIR = path.join(ROOT_DIR, 'src', 'content', 'shorts');
const ROADMAP_PATH = path.join(ROOT_DIR, 'src', 'config', 'roadmapOrder.json');
export const CONVERTED_IMAGES_DIR = path.join(ROOT_DIR, 'converted_images');

if (!fs.existsSync(CONVERTED_IMAGES_DIR)) {
  fs.mkdirSync(CONVERTED_IMAGES_DIR, { recursive: true });
}

export const CANONICAL_CATEGORIES = [
  'Development',
  'Core-CS',
  'DSA',
  'System-Design',
  'AI-Engineering'
];

/**
 * Helpers
 */
export function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function listExistingSeries() {
  if (!fs.existsSync(SERIES_DIR)) return [];
  return fs.readdirSync(SERIES_DIR)
    .filter(file => file.endsWith('.json'))
    .map(file => {
      const id = file.replace(/\.json$/, '');
      try {
        const data = JSON.parse(fs.readFileSync(path.join(SERIES_DIR, file), 'utf8'));
        return {
          id,
          title: data.title || id,
          subtitle: data.subtitle || '',
          description: data.description || '',
          category: data.category || 'Development',
          weight: data.weight ?? 100,
          status: data.status || '',
          ongoing: Boolean(data.ongoing === true || data.ongoing === 'true' || data.ongoing === 'On-going'),
          time: data.time || '',
          image: data.image || '',
          lessonCount: Array.isArray(data.navbar)
            ? data.navbar.reduce((acc, sec) => acc + (sec.link ? sec.link.length : 0), 0)
            : 0,
          resourceCount: Array.isArray(data.resources) ? data.resources.length : 0
        };
      } catch {
        return { id, title: id, category: 'Development', weight: 100, status: '', ongoing: false, lessonCount: 0, resourceCount: 0 };
      }
    })
    .sort((a, b) => (a.weight - b.weight) || a.title.localeCompare(b.title));
}

export function listAllArticles() {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  const articles = [];

  for (const f of files) {
    if (f.startsWith('-')) continue;
    try {
      const fullPath = path.join(ARTICLES_DIR, f);
      const raw = fs.readFileSync(fullPath, 'utf8');
      const parsed = matter(raw);
      const ext = path.extname(f);
      const slug = path.basename(f, ext);

      articles.push({
        filename: f,
        slug,
        isMdx: ext === '.mdx',
        title: parsed.data.title || slug,
        subtitle: parsed.data.subtitle || '',
        description: parsed.data.description || '',
        author: parsed.data.author || 'Arjit Sharma',
        series: parsed.data.series || null,
        categories: Array.isArray(parsed.data.categories) ? parsed.data.categories : ['Development'],
        draft: Boolean(parsed.data.draft),
        featured: Boolean(parsed.data.featured),
        year: parsed.data.year || null
      });
    } catch {}
  }

  return articles.sort((a, b) => a.title.localeCompare(b.title));
}

export function getSiteStats() {
  const seriesList = listExistingSeries();
  const allArticles = listAllArticles();
  const interviewTopics = listInterviewTopics();
  const totalInterviewQuestions = interviewTopics.reduce((acc, t) => acc + (t.questions ? t.questions.length : 0), 0);
  const totalShorts = listAllShorts().length;

  const totalLessons = allArticles.filter(a => !!a.series).length;
  const totalStandalone = allArticles.filter(a => !a.series).length;
  const totalDrafts = allArticles.filter(a => a.draft).length;
  const totalImages = fs.existsSync(CONVERTED_IMAGES_DIR)
    ? fs.readdirSync(CONVERTED_IMAGES_DIR).filter(f => /\.(webp|png|jpe?g|gif|svg)$/i.test(f)).length
    : 0;

  return {
    totalSeries: seriesList.length,
    totalArticles: allArticles.length,
    totalLessons,
    totalStandalone,
    totalDrafts,
    totalInterviewQuestions,
    totalShorts,
    totalImages,
    categories: CANONICAL_CATEGORIES
  };
}

/**
 * 1. Roadmap Order Operations
 */
export function getRoadmapConfig() {
  if (!fs.existsSync(ROADMAP_PATH)) {
    throw new Error(`Roadmap order config not found at: ${ROADMAP_PATH}`);
  }
  const raw = JSON.parse(fs.readFileSync(ROADMAP_PATH, 'utf8'));
  const seriesMap = new Map(listExistingSeries().map(s => [s.id, s]));

  const enriched = {};
  for (const cat of CANONICAL_CATEGORIES) {
    const catData = raw[cat] || { layout: 'branching', paths: [], edges: [] };
    enriched[cat] = {
      layout: catData.layout || 'branching',
      edges: catData.edges || [],
      paths: (catData.paths || []).map(p => ({
        id: p.id,
        title: p.title,
        courses: (p.courses || []).map(cId => {
          const s = seriesMap.get(cId);
          return {
            id: cId,
            title: s ? s.title : cId,
            category: s ? s.category : cat,
            weight: s ? s.weight : 100,
            status: s ? (s.status || '') : ''
          };
        })
      }))
    };
  }

  return enriched;
}

export function saveRoadmapOrder({ category, pathIndex, courseIds }) {
  if (!fs.existsSync(ROADMAP_PATH)) {
    throw new Error(`Roadmap config not found at: ${ROADMAP_PATH}`);
  }
  const raw = JSON.parse(fs.readFileSync(ROADMAP_PATH, 'utf8'));
  const catKey = CANONICAL_CATEGORIES.find(c => c.toLowerCase() === category.toLowerCase()) || category;

  if (!raw[catKey] || !raw[catKey].paths || !raw[catKey].paths[pathIndex]) {
    throw new Error(`Target path index ${pathIndex} in category "${catKey}" does not exist.`);
  }

  raw[catKey].paths[pathIndex].courses = courseIds;
  fs.writeFileSync(ROADMAP_PATH, JSON.stringify(raw, null, 2) + '\n', 'utf8');
  return { success: true, message: `Updated courses order in [${catKey} > ${raw[catKey].paths[pathIndex].title}].` };
}

export function saveAllRoadmapPaths({ category, paths }) {
  if (!fs.existsSync(ROADMAP_PATH)) {
    throw new Error(`Roadmap config not found at: ${ROADMAP_PATH}`);
  }
  const raw = JSON.parse(fs.readFileSync(ROADMAP_PATH, 'utf8'));
  const catKey = CANONICAL_CATEGORIES.find(c => c.toLowerCase() === category.toLowerCase()) || category;

  if (!raw[catKey]) {
    raw[catKey] = { layout: 'branching', paths: [], edges: [] };
  }

  raw[catKey].paths = paths.map(p => ({
    id: p.id || slugify(p.title) || 'path',
    title: p.title || 'Section',
    courses: (p.courses || []).map(c => typeof c === 'string' ? c : c.id)
  }));

  fs.writeFileSync(ROADMAP_PATH, JSON.stringify(raw, null, 2) + '\n', 'utf8');
  return { success: true, message: `Saved all ${raw[catKey].paths.length} paths in "${catKey}".` };
}

export function syncSeriesWeights(category) {
  const roadmap = JSON.parse(fs.readFileSync(ROADMAP_PATH, 'utf8'));
  const catKey = CANONICAL_CATEGORIES.find(c => c.toLowerCase() === category.toLowerCase()) || category;

  if (!roadmap[catKey] || !roadmap[catKey].paths) {
    throw new Error(`Category "${catKey}" not found in roadmapOrder.json`);
  }

  let counter = 1;
  const updated = [];

  for (const p of roadmap[catKey].paths) {
    for (const courseId of (p.courses || [])) {
      const seriesPath = path.join(SERIES_DIR, `${courseId}.json`);
      if (fs.existsSync(seriesPath)) {
        try {
          const sData = JSON.parse(fs.readFileSync(seriesPath, 'utf8'));
          sData.weight = counter++;
          fs.writeFileSync(seriesPath, JSON.stringify(sData, null, 2) + '\n', 'utf8');
          updated.push({ id: courseId, weight: sData.weight });
        } catch {}
      }
    }
  }

  return { success: true, count: updated.length, updated };
}

export function addToRoadmap({ seriesId, category, pathId }) {
  if (!fs.existsSync(ROADMAP_PATH)) {
    throw new Error(`Roadmap order config not found at: ${ROADMAP_PATH}`);
  }

  const roadmapData = JSON.parse(fs.readFileSync(ROADMAP_PATH, 'utf8'));
  const catKey = CANONICAL_CATEGORIES.find(c => c.toLowerCase() === category.toLowerCase()) || category;

  if (!roadmapData[catKey]) {
    roadmapData[catKey] = {
      layout: 'branching',
      paths: [
        {
          id: `${slugify(catKey)}-path`,
          title: `${catKey} Track`,
          courses: []
        }
      ]
    };
  }

  const categoryConfig = roadmapData[catKey];
  let targetPath;

  if (pathId) {
    targetPath = categoryConfig.paths.find(p => p.id === pathId);
  }
  if (!targetPath && categoryConfig.paths.length > 0) {
    targetPath = categoryConfig.paths[categoryConfig.paths.length - 1];
  } else if (!targetPath) {
    targetPath = {
      id: `${slugify(catKey)}-path`,
      title: `${catKey} Track`,
      courses: []
    };
    categoryConfig.paths.push(targetPath);
  }

  if (!targetPath.courses.includes(seriesId)) {
    targetPath.courses.push(seriesId);
    fs.writeFileSync(ROADMAP_PATH, JSON.stringify(roadmapData, null, 2) + '\n', 'utf8');
    return { success: true, message: `Added "${seriesId}" to roadmap under [${catKey} > ${targetPath.title}].` };
  }

  return { success: true, message: `"${seriesId}" already exists in roadmap under [${catKey}].` };
}

export function addCourseToPath({ category, pathIndex, courseId }) {
  if (!fs.existsSync(ROADMAP_PATH)) throw new Error('Roadmap config not found.');
  const raw = JSON.parse(fs.readFileSync(ROADMAP_PATH, 'utf8'));
  const catKey = CANONICAL_CATEGORIES.find(c => c.toLowerCase() === category.toLowerCase()) || category;

  if (!raw[catKey] || !raw[catKey].paths || !raw[catKey].paths[pathIndex]) {
    throw new Error(`Target path index ${pathIndex} in category "${catKey}" does not exist.`);
  }

  const p = raw[catKey].paths[pathIndex];
  if (!p.courses.includes(courseId)) {
    p.courses.push(courseId);
    fs.writeFileSync(ROADMAP_PATH, JSON.stringify(raw, null, 2) + '\n', 'utf8');
    return { success: true, message: `Added "${courseId}" to path "${p.title}".` };
  }
  return { success: true, message: `"${courseId}" is already in path "${p.title}".` };
}

/**
 * 2. Series & Syllabus Operations
 */
export function getSeriesDetails(seriesId) {
  const seriesFilePath = path.join(SERIES_DIR, `${seriesId}.json`);
  if (!fs.existsSync(seriesFilePath)) {
    throw new Error(`Series "${seriesId}" not found.`);
  }
  const seriesData = JSON.parse(fs.readFileSync(seriesFilePath, 'utf8'));

  // Scan all articles on disk that belong to this series
  const allArticles = listAllArticles();
  const seriesArticlesOnDisk = allArticles.filter(a => a.series === seriesId);

  // Collect slugs already present in navbar and resources
  const navbarSlugs = new Set();
  if (Array.isArray(seriesData.navbar)) {
    seriesData.navbar.forEach(sec => {
      (sec.link || []).forEach(l => {
        if (l.type === 'articles') navbarSlugs.add(l.url);
      });
    });
  }
  if (Array.isArray(seriesData.resources)) {
    seriesData.resources.forEach(r => {
      if (r.url && !r.url.startsWith('http')) {
        const slug = r.url.replace(/^\/articles\//, '');
        navbarSlugs.add(slug);
      }
    });
  }

  // Find articles that have series: seriesId but are NOT in the navbar or resources yet
  const unassignedArticles = seriesArticlesOnDisk.filter(a => !navbarSlugs.has(a.slug));

  // All articles on disk that are NOT currently in this course's navbar
  const availableArticles = allArticles
    .filter(a => !navbarSlugs.has(a.slug))
    .map(a => ({
      slug: a.slug,
      title: a.title,
      series: a.series || null,
      categories: a.categories || [],
      isMdx: a.isMdx
    }));

  return {
    ...seriesData,
    resources: Array.isArray(seriesData.resources) ? seriesData.resources : [],
    id: seriesId,
    articlesOnDisk: seriesArticlesOnDisk,
    unassignedArticles,
    availableArticles
  };
}

export function saveSeriesNavbar(seriesId, navbar, resources) {
  const seriesFilePath = path.join(SERIES_DIR, `${seriesId}.json`);
  if (!fs.existsSync(seriesFilePath)) {
    throw new Error(`Series "${seriesId}" not found.`);
  }

  const sData = JSON.parse(fs.readFileSync(seriesFilePath, 'utf8'));
  sData.navbar = Array.isArray(navbar) ? navbar : [];
  if (Array.isArray(resources)) {
    sData.resources = resources;
  }
  fs.writeFileSync(seriesFilePath, JSON.stringify(sData, null, 2) + '\n', 'utf8');

  // Synchronize frontmatter of all linked articles so series is guaranteed to match
  if (Array.isArray(sData.navbar)) {
    for (const sec of sData.navbar) {
      if (Array.isArray(sec.link)) {
        for (const l of sec.link) {
          if (l.type === 'articles' && l.url) {
            const cleanSlug = slugify(l.url);
            const possibleFiles = [
              path.join(ARTICLES_DIR, `${l.url}.md`),
              path.join(ARTICLES_DIR, `${l.url}.mdx`),
              path.join(ARTICLES_DIR, `${cleanSlug}.md`),
              path.join(ARTICLES_DIR, `${cleanSlug}.mdx`)
            ];
            const artPath = possibleFiles.find(f => fs.existsSync(f));
            if (artPath) {
              try {
                const raw = fs.readFileSync(artPath, 'utf8');
                const parsed = matter(raw);
                let changed = false;
                if (parsed.data.series !== seriesId) {
                  parsed.data.series = seriesId;
                  changed = true;
                }
                if (sData.category && (!parsed.data.categories || parsed.data.categories[0] !== sData.category)) {
                  parsed.data.categories = [sData.category];
                  changed = true;
                }
                if (changed) {
                  fs.writeFileSync(artPath, matter.stringify(parsed.content, parsed.data), 'utf8');
                }
              } catch (e) {
                console.warn(`Could not sync frontmatter for ${l.url}:`, e.message);
              }
            }
          }
        }
      }
    }
  }

  return { success: true, message: `Syllabus and resources for "${seriesId}" updated successfully.` };
}

export function attachArticleToSeries({ seriesId, articleSlug, sectionIndex = 0, status = 'in-progress', title = null }) {
  if (!seriesId) throw new Error('Series ID is required.');
  if (!articleSlug) throw new Error('Article slug is required.');

  const seriesFilePath = path.join(SERIES_DIR, `${seriesId}.json`);
  if (!fs.existsSync(seriesFilePath)) {
    throw new Error(`Series "${seriesId}" does not exist.`);
  }

  const seriesData = JSON.parse(fs.readFileSync(seriesFilePath, 'utf8'));

  // 1. Locate article file
  const cleanSlug = slugify(articleSlug);
  const possibleFiles = [
    path.join(ARTICLES_DIR, `${articleSlug}.md`),
    path.join(ARTICLES_DIR, `${articleSlug}.mdx`),
    path.join(ARTICLES_DIR, `${cleanSlug}.md`),
    path.join(ARTICLES_DIR, `${cleanSlug}.mdx`)
  ];
  const articleFilePath = possibleFiles.find(f => fs.existsSync(f));
  if (!articleFilePath) {
    throw new Error(`Article "${articleSlug}" not found on disk.`);
  }

  // 2. Read and update article frontmatter
  const raw = fs.readFileSync(articleFilePath, 'utf8');
  const parsed = matter(raw);
  const oldSeries = parsed.data.series;
  const articleTitle = title || parsed.data.title || cleanSlug;

  parsed.data.series = seriesId;
  if (seriesData.category) {
    parsed.data.categories = [seriesData.category];
  }
  fs.writeFileSync(articleFilePath, matter.stringify(parsed.content, parsed.data), 'utf8');

  // 3. If it belonged to a different series, detach from old series navbar
  if (oldSeries && oldSeries !== seriesId) {
    const oldSeriesFilePath = path.join(SERIES_DIR, `${oldSeries}.json`);
    if (fs.existsSync(oldSeriesFilePath)) {
      try {
        const oldSeriesData = JSON.parse(fs.readFileSync(oldSeriesFilePath, 'utf8'));
        if (Array.isArray(oldSeriesData.navbar)) {
          for (const sec of oldSeriesData.navbar) {
            if (Array.isArray(sec.link)) {
              sec.link = sec.link.filter(l => !(l.type === 'articles' && (l.url === articleSlug || l.url === cleanSlug)));
            }
          }
          fs.writeFileSync(oldSeriesFilePath, JSON.stringify(oldSeriesData, null, 2) + '\n', 'utf8');
        }
      } catch (err) {
        console.warn(`Could not detach article from old series "${oldSeries}":`, err.message);
      }
    }
  }

  // 4. Update series navbar
  if (!Array.isArray(seriesData.navbar) || seriesData.navbar.length === 0) {
    seriesData.navbar = [{ subheading: '1. Lessons', link: [] }];
  }

  const sIdx = (sectionIndex >= 0 && sectionIndex < seriesData.navbar.length) ? sectionIndex : 0;
  if (!Array.isArray(seriesData.navbar[sIdx].link)) {
    seriesData.navbar[sIdx].link = [];
  }

  // Check if article is already in any section
  let existingEntry = null;
  for (const sec of seriesData.navbar) {
    if (Array.isArray(sec.link)) {
      const match = sec.link.find(l => l.type === 'articles' && (l.url === articleSlug || l.url === cleanSlug));
      if (match) {
        existingEntry = match;
        break;
      }
    }
  }

  if (existingEntry) {
    existingEntry.title = articleTitle;
    if (status) existingEntry.status = status;
  } else {
    seriesData.navbar[sIdx].link.push({
      type: 'articles',
      url: cleanSlug || articleSlug,
      title: articleTitle,
      status: status || 'in-progress'
    });
  }

  fs.writeFileSync(seriesFilePath, JSON.stringify(seriesData, null, 2) + '\n', 'utf8');

  return {
    success: true,
    seriesId,
    articleSlug: cleanSlug || articleSlug,
    title: articleTitle,
    sectionIndex: sIdx,
    navbar: seriesData.navbar,
    message: `Attached "${articleTitle}" to course "${seriesData.title || seriesId}".`
  };
}

export function detachArticleFromSeries({ seriesId, articleSlug, clearFrontmatter = true }) {
  if (!seriesId || !articleSlug) throw new Error('Series ID and article slug are required.');

  const seriesFilePath = path.join(SERIES_DIR, `${seriesId}.json`);
  if (!fs.existsSync(seriesFilePath)) {
    throw new Error(`Series "${seriesId}" does not exist.`);
  }

  const seriesData = JSON.parse(fs.readFileSync(seriesFilePath, 'utf8'));
  const cleanSlug = slugify(articleSlug);

  if (Array.isArray(seriesData.navbar)) {
    for (const sec of seriesData.navbar) {
      if (Array.isArray(sec.link)) {
        sec.link = sec.link.filter(l => !(l.type === 'articles' && (l.url === articleSlug || l.url === cleanSlug)));
      }
    }
    fs.writeFileSync(seriesFilePath, JSON.stringify(seriesData, null, 2) + '\n', 'utf8');
  }

  if (clearFrontmatter) {
    const possibleFiles = [
      path.join(ARTICLES_DIR, `${articleSlug}.md`),
      path.join(ARTICLES_DIR, `${articleSlug}.mdx`),
      path.join(ARTICLES_DIR, `${cleanSlug}.md`),
      path.join(ARTICLES_DIR, `${cleanSlug}.mdx`)
    ];
    const articleFilePath = possibleFiles.find(f => fs.existsSync(f));
    if (articleFilePath) {
      try {
        const raw = fs.readFileSync(articleFilePath, 'utf8');
        const parsed = matter(raw);
        if (parsed.data.series === seriesId) {
          delete parsed.data.series;
          fs.writeFileSync(articleFilePath, matter.stringify(parsed.content, parsed.data), 'utf8');
        }
      } catch (err) {
        console.warn(`Could not clear series frontmatter for "${articleSlug}":`, err.message);
      }
    }
  }

  return {
    success: true,
    seriesId,
    articleSlug,
    message: `Detached "${articleSlug}" from course "${seriesId}".`
  };
}

export function saveSeriesResources(seriesId, resources) {
  const seriesFilePath = path.join(SERIES_DIR, `${seriesId}.json`);
  if (!fs.existsSync(seriesFilePath)) {
    throw new Error(`Series "${seriesId}" not found.`);
  }

  const sData = JSON.parse(fs.readFileSync(seriesFilePath, 'utf8'));
  sData.resources = Array.isArray(resources) ? resources : [];
  fs.writeFileSync(seriesFilePath, JSON.stringify(sData, null, 2) + '\n', 'utf8');
  return { success: true, message: `Resources for "${seriesId}" updated successfully.` };
}

export function updateSeriesMetadata(seriesId, metadata) {
  const seriesFilePath = path.join(SERIES_DIR, `${seriesId}.json`);
  if (!fs.existsSync(seriesFilePath)) {
    throw new Error(`Series "${seriesId}" not found.`);
  }

  const sData = JSON.parse(fs.readFileSync(seriesFilePath, 'utf8'));
  if (metadata.title) sData.title = metadata.title;
  if (metadata.subtitle !== undefined) sData.subtitle = metadata.subtitle;
  if (metadata.description !== undefined) sData.description = metadata.description;
  if (metadata.category) sData.category = metadata.category;
  if (metadata.status !== undefined) {
    if (!metadata.status || metadata.status === 'published' || metadata.status === 'live' || metadata.status === 'ready' || metadata.status === 'none') {
      delete sData.status; // Remove so it renders as standard published course
    } else {
      sData.status = metadata.status;
    }
  }
  if (metadata.ongoing !== undefined) {
    sData.ongoing = Boolean(metadata.ongoing);
  }
  if (metadata.time !== undefined) sData.time = metadata.time;
  if (metadata.weight !== undefined) sData.weight = Number(metadata.weight);
  if (metadata.image !== undefined) sData.image = metadata.image;

  fs.writeFileSync(seriesFilePath, JSON.stringify(sData, null, 2) + '\n', 'utf8');
  return { success: true, message: `Series "${seriesId}" updated successfully.`, series: sData };
}

export function deleteSeries({ seriesId }) {
  const seriesFilePath = path.join(SERIES_DIR, `${seriesId}.json`);
  if (!fs.existsSync(seriesFilePath)) throw new Error(`Series "${seriesId}" not found.`);

  fs.unlinkSync(seriesFilePath);

  // Remove from roadmapOrder.json
  if (fs.existsSync(ROADMAP_PATH)) {
    try {
      const raw = JSON.parse(fs.readFileSync(ROADMAP_PATH, 'utf8'));
      for (const catKey of Object.keys(raw)) {
        if (Array.isArray(raw[catKey].paths)) {
          raw[catKey].paths.forEach(p => {
            if (Array.isArray(p.courses)) {
              p.courses = p.courses.filter(c => c !== seriesId);
            }
          });
        }
      }
      fs.writeFileSync(ROADMAP_PATH, JSON.stringify(raw, null, 2) + '\n', 'utf8');
    } catch {}
  }

  return { success: true, seriesId };
}

export function renameSeries({ oldId, newId, metadata = {} }) {
  if (!oldId) throw new Error('Old series ID is required.');
  const oldFilePath = path.join(SERIES_DIR, `${oldId}.json`);
  if (!fs.existsSync(oldFilePath)) {
    throw new Error(`Series "${oldId}" does not exist.`);
  }

  const targetId = slugify(newId || oldId);
  if (!targetId) throw new Error('New series ID is invalid.');

  let finalId = oldId;
  let updatedArticlesCount = 0;

  if (targetId !== oldId) {
    const newFilePath = path.join(SERIES_DIR, `${targetId}.json`);
    if (fs.existsSync(newFilePath)) {
      throw new Error(`A series with ID "${targetId}" already exists.`);
    }

    // 1. Rename the series JSON file
    fs.renameSync(oldFilePath, newFilePath);
    finalId = targetId;

    // 2. Update all articles that reference this series
    if (fs.existsSync(ARTICLES_DIR)) {
      const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
      for (const file of files) {
        const fullPath = path.join(ARTICLES_DIR, file);
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          const parsed = matter(content);
          if (parsed.data && parsed.data.series === oldId) {
            parsed.data.series = targetId;
            const updated = matter.stringify(parsed.content, parsed.data);
            fs.writeFileSync(fullPath, updated, 'utf8');
            updatedArticlesCount++;
          }
        } catch (err) {
          console.error(`Error updating article ${file}:`, err.message);
        }
      }
    }

    // 3. Update roadmapOrder.json
    if (fs.existsSync(ROADMAP_PATH)) {
      try {
        const roadmapData = JSON.parse(fs.readFileSync(ROADMAP_PATH, 'utf8'));
        for (const catKey of Object.keys(roadmapData)) {
          const cat = roadmapData[catKey];
          if (cat && Array.isArray(cat.paths)) {
            for (const p of cat.paths) {
              if (Array.isArray(p.courses)) {
                p.courses = p.courses.map(c => c === oldId ? targetId : c);
              }
            }
          }
          if (cat && Array.isArray(cat.edges)) {
            for (const edge of cat.edges) {
              if (edge.from === oldId) edge.from = targetId;
              if (edge.to === oldId) edge.to = targetId;
            }
          }
        }
        fs.writeFileSync(ROADMAP_PATH, JSON.stringify(roadmapData, null, 2) + '\n', 'utf8');
      } catch (err) {
        console.error('Error updating roadmapOrder:', err.message);
      }
    }

    // 4. Update shorts if any
    if (fs.existsSync(SHORTS_DIR)) {
      try {
        const shortFiles = fs.readdirSync(SHORTS_DIR).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
        for (const sf of shortFiles) {
          const fullPath = path.join(SHORTS_DIR, sf);
          const raw = fs.readFileSync(fullPath, 'utf8');
          const data = yaml.load(raw);
          if (data && data.series === oldId) {
            data.series = targetId;
            fs.writeFileSync(fullPath, yaml.dump(data), 'utf8');
          }
        }
      } catch (err) {
        console.error('Error updating shorts:', err.message);
      }
    }
  }

  // 5. Update metadata in the target file
  if (metadata && Object.keys(metadata).length > 0) {
    updateSeriesMetadata(finalId, metadata);
  }

  return {
    success: true,
    oldId,
    newId: finalId,
    updatedArticlesCount,
    message: targetId !== oldId
      ? `Renamed course from "${oldId}" to "${targetId}". Updated ${updatedArticlesCount} article(s) and roadmap order.`
      : `Updated course metadata for "${oldId}".`
  };
}

export function createSeries({
  id,
  title,
  description,
  category = 'Development',
  subtitle = '',
  status = 'in-progress',
  time = '4 hours',
  createIntroArticle = true,
  addToRoadmaps = true,
  pathId
}) {
  if (!id || !title) {
    throw new Error('Series "id" and "title" are required.');
  }

  const seriesId = slugify(id);
  const seriesFilePath = path.join(SERIES_DIR, `${seriesId}.json`);

  if (fs.existsSync(seriesFilePath)) {
    throw new Error(`Series "${seriesId}" already exists at: ${seriesFilePath}`);
  }

  const catKey = CANONICAL_CATEGORIES.find(c => c.toLowerCase() === category.toLowerCase()) || category;
  const introSlug = `intro-${seriesId}`;

  const seriesData = {
    ongoing: false,
    weight: 50,
    title,
    subtitle: subtitle || `Master ${title} from first principles`,
    description: description || `Complete guide and curriculum for ${title}.`,
    category: catKey,
    status,
    time,
    image: `../../assets/images/thumbnails/${seriesId}.webp`,
    navbar: [
      {
        subheading: '1. Foundations',
        link: [
          {
            type: 'articles',
            url: introSlug,
            title: `Introduction to ${title}`,
            status
          }
        ]
      }
    ],
    resources: []
  };

  fs.mkdirSync(SERIES_DIR, { recursive: true });
  fs.writeFileSync(seriesFilePath, JSON.stringify(seriesData, null, 2) + '\n', 'utf8');

  let roadmapResult = null;
  if (addToRoadmaps) {
    roadmapResult = addToRoadmap({ seriesId, category: catKey, pathId });
  }

  let introArticleResult = null;
  if (createIntroArticle) {
    introArticleResult = createArticle({
      title: `Introduction to ${title}`,
      slug: introSlug,
      seriesId,
      description: `Welcome to ${title}. Learn the core concepts and what we will build.`,
      addToNavbar: false
    });
  }

  return {
    success: true,
    seriesId,
    seriesPath: seriesFilePath,
    roadmapResult,
    introArticleResult
  };
}

/**
 * 3. Article / Project Operations
 */
export function createArticle({
  title,
  slug,
  seriesId,
  categories = [],
  description = '',
  subtitle = '',
  author = 'Arjit Sharma',
  draft = false,
  isMdx = false,
  addToNavbar = true,
  sectionIndex = 0,
  contentType = 'lesson'
}) {
  if (!title) {
    throw new Error('Article "title" is required.');
  }

  let articleSlug = slugify(slug || title);
  if (seriesId) {
    const prefix = `${slugify(seriesId)}-`;
    if (!articleSlug.startsWith(prefix) && articleSlug !== slugify(seriesId)) {
      articleSlug = `${prefix}${articleSlug}`;
    }
  }
  const ext = isMdx ? 'mdx' : 'md';
  const articleFilePath = path.join(ARTICLES_DIR, `${articleSlug}.${ext}`);

  if (fs.existsSync(articleFilePath)) {
    throw new Error(`Article file "${articleSlug}.${ext}" already exists.`);
  }

  // CRITICAL RULE: If seriesId is specified, the category MUST be strictly locked
  // to the series category so there is zero divergence.
  let finalCategories = categories;
  if (seriesId) {
    const seriesFilePath = path.join(SERIES_DIR, `${seriesId}.json`);
    if (fs.existsSync(seriesFilePath)) {
      try {
        const sData = JSON.parse(fs.readFileSync(seriesFilePath, 'utf8'));
        if (sData.category) {
          finalCategories = [sData.category]; // Strictly inherited and locked!
        }
      } catch {}
    }
  }

  if (!finalCategories || finalCategories.length === 0) {
    finalCategories = ['Development'];
  }

  const frontmatterLines = [
    '---',
    `title: "${title}"`
  ];

  if (subtitle) frontmatterLines.push(`subtitle: "${subtitle}"`);
  if (description) frontmatterLines.push(`description: "${description}"`);
  frontmatterLines.push(`author: "${author}"`);
  if (seriesId) frontmatterLines.push(`series: "${seriesId}"`);
  frontmatterLines.push(`categories: ${JSON.stringify(finalCategories)}`);
  frontmatterLines.push(`draft: ${draft}`);
  frontmatterLines.push(`featured: false`);
  frontmatterLines.push('---\n');

  const headline = contentType === 'project'
    ? `# 🛠️ ${title}\n`
    : `# ${title}\n`;

  const initialBody = [
    headline,
    description ? `${description}\n` : '',
    contentType === 'project'
      ? '## Overview & Objectives\n\nIn this hands-on project, we will build...\n\n## Requirements\n\n- Node.js or relevant runtime\n- Code editor\n\n## Step-by-Step Implementation\n\nWrite your implementation details here...\n'
      : '## 1. Overview\n\nWrite your lesson content here...\n'
  ].filter(Boolean).join('\n');

  fs.mkdirSync(ARTICLES_DIR, { recursive: true });
  fs.writeFileSync(articleFilePath, frontmatterLines.join('\n') + initialBody, 'utf8');

  let navbarUpdated = false;
  if (seriesId && addToNavbar) {
    const seriesFilePath = path.join(SERIES_DIR, `${seriesId}.json`);
    if (fs.existsSync(seriesFilePath)) {
      try {
        const seriesData = JSON.parse(fs.readFileSync(seriesFilePath, 'utf8'));
        if (!seriesData.navbar || !Array.isArray(seriesData.navbar) || seriesData.navbar.length === 0) {
          seriesData.navbar = [{ subheading: '1. Lessons', link: [] }];
        }

        const numIdx = Number(sectionIndex);
        const sIdx = (!isNaN(numIdx) && numIdx >= 0 && numIdx < seriesData.navbar.length) ? numIdx : 0;
        const targetSection = seriesData.navbar[sIdx] || seriesData.navbar[0];
        const alreadyLinked = targetSection.link.some(l => l.url === articleSlug);

        if (!alreadyLinked) {
          targetSection.link.push({
            type: 'articles',
            url: articleSlug,
            title,
            status: 'in-progress'
          });
          fs.writeFileSync(seriesFilePath, JSON.stringify(seriesData, null, 2) + '\n', 'utf8');
          navbarUpdated = true;
        }
      } catch (err) {
        console.warn(`Could not automatically append to series navbar: ${err.message}`);
      }
    }
  }

  return {
    success: true,
    slug: articleSlug,
    filePath: articleFilePath,
    navbarUpdated,
    category: finalCategories[0],
    isProject: !seriesId
  };
}

export function toggleArticleDraft(slug) {
  const files = [
    path.join(ARTICLES_DIR, `${slug}.md`),
    path.join(ARTICLES_DIR, `${slug}.mdx`)
  ];

  const targetFile = files.find(f => fs.existsSync(f));
  if (!targetFile) {
    throw new Error(`Article "${slug}" not found.`);
  }

  const raw = fs.readFileSync(targetFile, 'utf8');
  const parsed = matter(raw);
  const newDraft = !parsed.data.draft;
  parsed.data.draft = newDraft;

  const newContent = matter.stringify(parsed.content, parsed.data);
  fs.writeFileSync(targetFile, newContent, 'utf8');

  return { success: true, slug, draft: newDraft };
}

export function getArticleDetails(slug) {
  const cleanSlug = slugify(slug);
  const files = [
    path.join(ARTICLES_DIR, `${cleanSlug}.md`),
    path.join(ARTICLES_DIR, `${cleanSlug}.mdx`),
    path.join(ARTICLES_DIR, `${slug}.md`),
    path.join(ARTICLES_DIR, `${slug}.mdx`)
  ];
  const targetFile = files.find(f => fs.existsSync(f));
  if (!targetFile) {
    throw new Error(`Article "${slug}" not found.`);
  }

  const raw = fs.readFileSync(targetFile, 'utf8');
  const parsed = matter(raw);
  const ext = path.extname(targetFile);

  return {
    slug: path.basename(targetFile, ext),
    filename: path.basename(targetFile),
    isMdx: ext === '.mdx',
    frontmatter: {
      title: parsed.data.title || slug,
      subtitle: parsed.data.subtitle || '',
      description: parsed.data.description || '',
      author: parsed.data.author || 'Arjit Sharma',
      series: parsed.data.series || '',
      categories: Array.isArray(parsed.data.categories) ? parsed.data.categories : ['Development'],
      draft: Boolean(parsed.data.draft),
      featured: Boolean(parsed.data.featured),
      year: parsed.data.year || null,
      image: parsed.data.image || ''
    },
    content: parsed.content
  };
}

export function updateSeriesLinkSlug(oldSlug, newSlug, newTitle) {
  if (!fs.existsSync(SERIES_DIR)) return;
  const seriesFiles = fs.readdirSync(SERIES_DIR).filter(f => f.endsWith('.json'));
  for (const sf of seriesFiles) {
    const sp = path.join(SERIES_DIR, sf);
    try {
      const sData = JSON.parse(fs.readFileSync(sp, 'utf8'));
      let modified = false;
      if (Array.isArray(sData.navbar)) {
        sData.navbar.forEach(sec => {
          if (Array.isArray(sec.link)) {
            sec.link.forEach(l => {
              if (l.url === oldSlug) {
                l.url = newSlug;
                if (newTitle) l.title = newTitle;
                modified = true;
              }
            });
          }
        });
      }
      if (modified) {
        fs.writeFileSync(sp, JSON.stringify(sData, null, 2) + '\n', 'utf8');
      }
    } catch {}
  }
}

export function saveArticleContent({ slug, oldSlug, frontmatter, content, isMdx }) {
  if (!slug) throw new Error('Article slug is required.');
  const newSlug = slugify(slug);
  const targetOldSlug = oldSlug ? slugify(oldSlug) : newSlug;

  const oldFiles = [
    path.join(ARTICLES_DIR, `${targetOldSlug}.md`),
    path.join(ARTICLES_DIR, `${targetOldSlug}.mdx`)
  ];
  const existingOldFile = oldFiles.find(f => fs.existsSync(f));

  const ext = isMdx ? 'mdx' : (existingOldFile ? path.extname(existingOldFile).slice(1) : 'md');
  const newFilePath = path.join(ARTICLES_DIR, `${newSlug}.${ext}`);

  const cleanFrontmatter = {
    title: frontmatter.title || newSlug
  };
  if (frontmatter.subtitle) cleanFrontmatter.subtitle = frontmatter.subtitle;
  if (frontmatter.description) cleanFrontmatter.description = frontmatter.description;
  cleanFrontmatter.author = frontmatter.author || 'Arjit Sharma';
  if (frontmatter.series) cleanFrontmatter.series = frontmatter.series;
  cleanFrontmatter.categories = Array.isArray(frontmatter.categories) && frontmatter.categories.length > 0
    ? frontmatter.categories
    : ['Development'];
  if (frontmatter.draft !== undefined) cleanFrontmatter.draft = Boolean(frontmatter.draft);
  if (frontmatter.featured !== undefined) cleanFrontmatter.featured = Boolean(frontmatter.featured);
  if (frontmatter.year) cleanFrontmatter.year = Number(frontmatter.year);
  if (frontmatter.image) cleanFrontmatter.image = frontmatter.image;

  let oldSeriesId = null;
  if (existingOldFile) {
    try {
      const oldRaw = fs.readFileSync(existingOldFile, 'utf8');
      const oldParsed = matter(oldRaw);
      oldSeriesId = oldParsed.data ? oldParsed.data.series : null;
    } catch {}
  }

  if (cleanFrontmatter.series) {
    const sPath = path.join(SERIES_DIR, `${cleanFrontmatter.series}.json`);
    if (fs.existsSync(sPath)) {
      try {
        const sData = JSON.parse(fs.readFileSync(sPath, 'utf8'));
        if (sData.category) cleanFrontmatter.categories = [sData.category];

        // Ensure article is present in the series navbar
        if (!Array.isArray(sData.navbar) || sData.navbar.length === 0) {
          sData.navbar = [{ subheading: '1. Lessons', link: [] }];
        }
        let inNavbar = false;
        for (const sec of sData.navbar) {
          if (Array.isArray(sec.link)) {
            const found = sec.link.find(l => l.type === 'articles' && (l.url === newSlug || l.url === targetOldSlug));
            if (found) {
              found.url = newSlug;
              found.title = cleanFrontmatter.title;
              inNavbar = true;
              break;
            }
          }
        }
        if (!inNavbar) {
          sData.navbar[0].link.push({
            type: 'articles',
            url: newSlug,
            title: cleanFrontmatter.title,
            status: 'in-progress'
          });
        }
        fs.writeFileSync(sPath, JSON.stringify(sData, null, 2) + '\n', 'utf8');
      } catch (err) {
        console.warn(`Could not sync series navbar for "${cleanFrontmatter.series}":`, err.message);
      }
    }
  }

  // If old series was different from current series, remove from old series navbar
  if (oldSeriesId && oldSeriesId !== cleanFrontmatter.series) {
    const oldSPath = path.join(SERIES_DIR, `${oldSeriesId}.json`);
    if (fs.existsSync(oldSPath)) {
      try {
        const oldSData = JSON.parse(fs.readFileSync(oldSPath, 'utf8'));
        if (Array.isArray(oldSData.navbar)) {
          for (const sec of oldSData.navbar) {
            if (Array.isArray(sec.link)) {
              sec.link = sec.link.filter(l => !(l.type === 'articles' && (l.url === targetOldSlug || l.url === newSlug)));
            }
          }
          fs.writeFileSync(oldSPath, JSON.stringify(oldSData, null, 2) + '\n', 'utf8');
        }
      } catch (err) {
        console.warn(`Could not detach article from old series "${oldSeriesId}":`, err.message);
      }
    }
  }

  const fileData = matter.stringify(content, cleanFrontmatter);

  if (existingOldFile && existingOldFile !== newFilePath) {
    fs.unlinkSync(existingOldFile);
    updateSeriesLinkSlug(targetOldSlug, newSlug, cleanFrontmatter.title);
  }

  fs.mkdirSync(ARTICLES_DIR, { recursive: true });
  fs.writeFileSync(newFilePath, fileData, 'utf8');

  return { success: true, slug: newSlug, filePath: newFilePath };
}

export function deleteArticle({ slug }) {
  const cleanSlug = slugify(slug);
  const files = [
    path.join(ARTICLES_DIR, `${cleanSlug}.md`),
    path.join(ARTICLES_DIR, `${cleanSlug}.mdx`),
    path.join(ARTICLES_DIR, `${slug}.md`),
    path.join(ARTICLES_DIR, `${slug}.mdx`)
  ];
  const targetFile = files.find(f => fs.existsSync(f));
  if (!targetFile) throw new Error(`Article "${slug}" does not exist.`);

  fs.unlinkSync(targetFile);

  const unlinkedFrom = [];
  if (fs.existsSync(SERIES_DIR)) {
    const seriesFiles = fs.readdirSync(SERIES_DIR).filter(f => f.endsWith('.json'));
    for (const sf of seriesFiles) {
      const sp = path.join(SERIES_DIR, sf);
      try {
        const sData = JSON.parse(fs.readFileSync(sp, 'utf8'));
        let modified = false;
        if (Array.isArray(sData.navbar)) {
          sData.navbar.forEach(sec => {
            if (Array.isArray(sec.link)) {
              const beforeCount = sec.link.length;
              sec.link = sec.link.filter(l => l.url !== cleanSlug && l.url !== slug);
              if (sec.link.length !== beforeCount) modified = true;
            }
          });
        }
        if (Array.isArray(sData.resources)) {
          const beforeRCount = sData.resources.length;
          sData.resources = sData.resources.filter(r => r.url !== `/articles/${cleanSlug}` && r.url !== cleanSlug && r.url !== `/articles/${slug}` && r.url !== slug);
          if (sData.resources.length !== beforeRCount) modified = true;
        }
        if (modified) {
          fs.writeFileSync(sp, JSON.stringify(sData, null, 2) + '\n', 'utf8');
          unlinkedFrom.push(sf.replace('.json', ''));
        }
      } catch {}
    }
  }

  return { success: true, slug: cleanSlug, unlinkedFrom };
}

/**
 * 4. Interview Questions Operations
 */
export function listInterviewTopics() {
  if (!fs.existsSync(INTERVIEW_DIR)) return [];
  const files = fs.readdirSync(INTERVIEW_DIR).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
  return files.map(file => {
    const topic = file.replace(/\.(yaml|yml)$/, '');
    try {
      const raw = fs.readFileSync(path.join(INTERVIEW_DIR, file), 'utf8');
      const data = yaml.load(raw) || {};
      const questions = Array.isArray(data.questions) ? data.questions : [];
      return {
        topic,
        filename: file,
        questionCount: questions.length,
        questions
      };
    } catch {
      return { topic, filename: file, questionCount: 0, questions: [] };
    }
  }).sort((a, b) => a.topic.localeCompare(b.topic));
}

export function saveInterviewQuestion({ topic, questionData, isNew }) {
  if (!topic) throw new Error('Topic is required.');
  fs.mkdirSync(INTERVIEW_DIR, { recursive: true });
  const topicFile = path.join(INTERVIEW_DIR, `${topic}.yaml`);

  let doc = { questions: [] };
  if (fs.existsSync(topicFile)) {
    try {
      doc = yaml.load(fs.readFileSync(topicFile, 'utf8')) || { questions: [] };
      if (!Array.isArray(doc.questions)) doc.questions = [];
    } catch {}
  }

  let answerArray = [];
  if (Array.isArray(questionData.answer)) {
    answerArray = questionData.answer.map(a => String(a).trim()).filter(Boolean);
  } else if (typeof questionData.answer === 'string') {
    answerArray = questionData.answer.split('\n').map(a => a.trim()).filter(Boolean);
  }

  let tagsArray = [];
  if (Array.isArray(questionData.tags)) {
    tagsArray = questionData.tags.map(t => String(t).trim()).filter(Boolean);
  } else if (typeof questionData.tags === 'string') {
    tagsArray = questionData.tags.split(',').map(t => t.trim()).filter(Boolean);
  }
  if (tagsArray.length === 0) tagsArray = [topic];

  if (isNew || questionData.id === undefined || questionData.id === '') {
    let maxId = 0;
    doc.questions.forEach(q => {
      const n = Number(q.id);
      if (!isNaN(n) && n > maxId) maxId = n;
    });
    const newId = maxId + 1;
    const newQ = {
      id: newId,
      tags: tagsArray,
      question: questionData.question,
      answer: answerArray
    };
    if (questionData.code && questionData.code.trim()) {
      newQ.code = questionData.code.trim() + '\n';
    }
    doc.questions.push(newQ);
  } else {
    const targetId = questionData.id;
    const idx = doc.questions.findIndex(q => String(q.id) === String(targetId));
    const updatedQ = {
      id: isNaN(Number(targetId)) ? targetId : Number(targetId),
      tags: tagsArray,
      question: questionData.question,
      answer: answerArray
    };
    if (questionData.code && questionData.code.trim()) {
      updatedQ.code = questionData.code.trim() + '\n';
    }
    if (idx >= 0) {
      doc.questions[idx] = updatedQ;
    } else {
      doc.questions.push(updatedQ);
    }
  }

  const yamlStr = yaml.dump(doc, { lineWidth: -1, noRefs: true });
  fs.writeFileSync(topicFile, yamlStr, 'utf8');
  return { success: true, topic, questionCount: doc.questions.length };
}

export function deleteInterviewQuestion({ topic, questionId }) {
  const topicFile = path.join(INTERVIEW_DIR, `${topic}.yaml`);
  if (!fs.existsSync(topicFile)) throw new Error(`Topic "${topic}" not found.`);

  const doc = yaml.load(fs.readFileSync(topicFile, 'utf8')) || { questions: [] };
  if (!Array.isArray(doc.questions)) doc.questions = [];

  const initialCount = doc.questions.length;
  doc.questions = doc.questions.filter(q => String(q.id) !== String(questionId));

  if (doc.questions.length === initialCount) {
    throw new Error(`Question ID ${questionId} not found in ${topic}.`);
  }

  const yamlStr = yaml.dump(doc, { lineWidth: -1, noRefs: true });
  fs.writeFileSync(topicFile, yamlStr, 'utf8');
  return { success: true, topic, remaining: doc.questions.length };
}

export function createInterviewTopic({ topic }) {
  const cleanTopic = slugify(topic);
  const topicFile = path.join(INTERVIEW_DIR, `${cleanTopic}.yaml`);
  if (fs.existsSync(topicFile)) throw new Error(`Topic "${cleanTopic}" already exists.`);

  fs.mkdirSync(INTERVIEW_DIR, { recursive: true });
  fs.writeFileSync(topicFile, yaml.dump({ questions: [] }), 'utf8');
  return { success: true, topic: cleanTopic };
}

/**
 * 5. Shorts Operations
 */
export function listAllShorts() {
  if (!fs.existsSync(SHORTS_DIR)) return [];
  const results = [];

  function scan(dir, relSeries) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        scan(full, ent.name);
      } else if (ent.isFile() && (ent.name.endsWith('.md') || ent.name.endsWith('.mdx'))) {
        try {
          const raw = fs.readFileSync(full, 'utf8');
          const parsed = matter(raw);
          const slug = ent.name.replace(/\.(md|mdx)$/, '');
          results.push({
            slug,
            filename: ent.name,
            series: parsed.data.series || relSeries || 'general',
            seriesName: parsed.data.seriesName || relSeries || 'General',
            title: parsed.data.title || slug,
            youtubeId: parsed.data.youtubeId || '',
            order: parsed.data.order ?? 0,
            fullPath: full
          });
        } catch {}
      }
    }
  }

  scan(SHORTS_DIR, '');
  return results.sort((a, b) => a.series.localeCompare(b.series) || a.order - b.order);
}

export function saveShort({ originalSlug, slug, series, seriesName, title, youtubeId, order }) {
  if (!title || !youtubeId) throw new Error('Title and YouTube Video ID are required.');
  const seriesSlug = slugify(series || 'general');
  const shortSlug = slugify(slug || title);
  const targetDir = path.join(SHORTS_DIR, seriesSlug);

  fs.mkdirSync(targetDir, { recursive: true });

  const targetFile = path.join(targetDir, `${shortSlug}.md`);

  if (originalSlug && (originalSlug !== shortSlug || seriesSlug !== slugify(series))) {
    const oldFile = path.join(SHORTS_DIR, slugify(series || seriesSlug), `${originalSlug}.md`);
    if (fs.existsSync(oldFile)) fs.unlinkSync(oldFile);
  }

  const frontmatter = {
    title,
    youtubeId: youtubeId.trim(),
    series: seriesSlug,
    seriesName: seriesName || seriesSlug,
    order: Number(order) || 0
  };

  const fileContent = matter.stringify('', frontmatter);
  fs.writeFileSync(targetFile, fileContent, 'utf8');
  return { success: true, slug: shortSlug, series: seriesSlug };
}

export function deleteShort({ series, slug }) {
  const targetFile = path.join(SHORTS_DIR, series, `${slug}.md`);
  if (!fs.existsSync(targetFile)) throw new Error(`Short "${series}/${slug}" not found.`);
  fs.unlinkSync(targetFile);
  return { success: true, series, slug };
}

/**
 * Image Studio & Conversion Helpers
 */
export function listConvertedImages(folderPath = CONVERTED_IMAGES_DIR) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  const files = fs.readdirSync(folderPath).filter(f => /\.(webp|png|jpe?g|gif|svg)$/i.test(f));
  const images = files.map(file => {
    const fullPath = path.join(folderPath, file);
    const stat = fs.statSync(fullPath);
    return {
      filename: file,
      fullPath,
      url: `/converted-images/${encodeURIComponent(file)}`,
      sizeBytes: stat.size,
      sizeFormatted: stat.size > 1024 * 1024
        ? (stat.size / (1024 * 1024)).toFixed(2) + ' MB'
        : (stat.size / 1024).toFixed(1) + ' KB',
      mtime: stat.mtime.toISOString()
    };
  }).sort((a, b) => new Date(b.mtime) - new Date(a.mtime));

  return { folder: folderPath, count: images.length, images };
}

export function scanSourceFolder(inputFolder) {
  if (!inputFolder || !fs.existsSync(inputFolder)) {
    throw new Error(`Input folder does not exist: "${inputFolder}"`);
  }
  const files = fs.readdirSync(inputFolder).filter(f => /\.(png|jpe?g|bmp|tiff|webp)$/i.test(f));
  const items = files.map(file => {
    const fullPath = path.join(inputFolder, file);
    try {
      const stat = fs.statSync(fullPath);
      return {
        filename: file,
        fullPath,
        sizeBytes: stat.size,
        sizeFormatted: (stat.size / 1024).toFixed(1) + ' KB',
        mtime: stat.mtime.toISOString()
      };
    } catch {
      return null;
    }
  }).filter(Boolean);

  return { inputFolder, count: items.length, items };
}

export async function convertFolderImages({
  inputFolder,
  outputFolder = CONVERTED_IMAGES_DIR,
  quality = 82,
  lossless = false,
  overwrite = true
}) {
  if (!inputFolder || !fs.existsSync(inputFolder)) {
    throw new Error(`Input folder does not exist: "${inputFolder}"`);
  }
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }

  const files = fs.readdirSync(inputFolder).filter(f => /\.(png|jpe?g|bmp|tiff)$/i.test(f));
  if (files.length === 0) {
    return { success: true, count: 0, items: [], message: 'No eligible PNG/JPG images found in source folder.' };
  }

  const results = [];
  let totalOrig = 0;
  let totalWebp = 0;

  for (const file of files) {
    const srcPath = path.join(inputFolder, file);
    const parsed = path.parse(file);
    const targetName = `${parsed.name}.webp`;
    const destPath = path.join(outputFolder, targetName);

    if (!overwrite && fs.existsSync(destPath)) {
      results.push({
        filename: file,
        targetName,
        status: 'skipped',
        reason: 'Already exists'
      });
      continue;
    }

    try {
      const origStat = fs.statSync(srcPath);
      totalOrig += origStat.size;

      await sharp(srcPath)
        .webp({ quality: Number(quality) || 82, lossless: Boolean(lossless) })
        .toFile(destPath);

      const webpStat = fs.statSync(destPath);
      totalWebp += webpStat.size;

      const savings = origStat.size > 0
        ? Math.round(((origStat.size - webpStat.size) / origStat.size) * 100)
        : 0;

      results.push({
        filename: file,
        targetName,
        status: 'converted',
        origSizeBytes: origStat.size,
        webpSizeBytes: webpStat.size,
        origSizeFormatted: (origStat.size / 1024).toFixed(1) + ' KB',
        webpSizeFormatted: (webpStat.size / 1024).toFixed(1) + ' KB',
        savingsPercent: savings,
        url: `/converted-images/${encodeURIComponent(targetName)}`
      });
    } catch (err) {
      results.push({
        filename: file,
        targetName,
        status: 'error',
        error: err.message
      });
    }
  }

  const totalSavings = totalOrig > 0
    ? Math.round(((totalOrig - totalWebp) / totalOrig) * 100)
    : 0;

  return {
    success: true,
    totalScanned: files.length,
    convertedCount: results.filter(r => r.status === 'converted').length,
    totalOriginalFormatted: (totalOrig / 1024).toFixed(1) + ' KB',
    totalWebpFormatted: (totalWebp / 1024).toFixed(1) + ' KB',
    totalSavingsPercent: totalSavings,
    outputFolder,
    items: results
  };
}

export async function convertUploadedImage({
  filename,
  dataBase64,
  outputFolder = CONVERTED_IMAGES_DIR,
  quality = 82,
  lossless = false
}) {
  if (!filename || !dataBase64) {
    throw new Error('Filename and image data are required.');
  }
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }

  const rawBase64 = dataBase64.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(rawBase64, 'base64');
  const parsed = path.parse(filename);
  const targetName = `${parsed.name}.webp`;
  const destPath = path.join(outputFolder, targetName);

  await sharp(buffer)
    .webp({ quality: Number(quality) || 82, lossless: Boolean(lossless) })
    .toFile(destPath);

  const stat = fs.statSync(destPath);
  const origSize = buffer.length;
  const savings = origSize > 0 ? Math.round(((origSize - stat.size) / origSize) * 100) : 0;

  return {
    success: true,
    filename: targetName,
    originalSizeBytes: origSize,
    originalSizeFormatted: (origSize / 1024).toFixed(1) + ' KB',
    webpSizeBytes: stat.size,
    webpSizeFormatted: (stat.size / 1024).toFixed(1) + ' KB',
    savingsPercent: savings,
    url: `/converted-images/${encodeURIComponent(targetName)}`
  };
}

export function deleteConvertedImage({ filename, folderPath = CONVERTED_IMAGES_DIR }) {
  if (!filename) throw new Error('Filename is required.');
  const safeName = path.basename(filename);
  const targetPath = path.join(folderPath, safeName);
  if (!fs.existsSync(targetPath)) {
    throw new Error(`File does not exist: "${safeName}"`);
  }
  fs.unlinkSync(targetPath);
  return { success: true, filename: safeName };
}

export async function uploadToCloudinary({
  filename,
  folderPath = CONVERTED_IMAGES_DIR,
  cloudName = 'dwa6rcttw',
  uploadPreset = '',
  apiKey = '',
  apiSecret = '',
  folder = 'csprimer'
}) {
  if (!cloudName) throw new Error('Cloudinary cloud_name is required.');
  if (!uploadPreset && (!apiKey || !apiSecret)) {
    throw new Error('Provide either an upload_preset (unsigned) or apiKey + apiSecret (signed) for Cloudinary.');
  }

  const safeName = path.basename(filename);
  const filePath = path.join(folderPath, safeName);
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${safeName}`);
  }

  const fileBytes = fs.readFileSync(filePath);
  const fileBlob = new Blob([fileBytes]);
  const formData = new FormData();
  formData.append('file', fileBlob, safeName);

  if (uploadPreset) {
    formData.append('upload_preset', uploadPreset);
    if (folder) formData.append('folder', folder);
  } else {
    const timestamp = Math.round(Date.now() / 1000);
    const params = { timestamp };
    if (folder) params.folder = folder;

    const toSign = Object.keys(params)
      .sort()
      .map(k => `${k}=${params[k]}`)
      .join('&') + apiSecret;

    const signature = crypto.createHash('sha1').update(toSign).digest('hex');

    formData.append('api_key', apiKey);
    formData.append('timestamp', String(timestamp));
    formData.append('signature', signature);
    if (folder) formData.append('folder', folder);
  }

  const apiUrl = `https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudName)}/image/upload`;
  const response = await fetch(apiUrl, {
    method: 'POST',
    body: formData
  });

  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(data.error?.message || `Cloudinary upload failed (HTTP ${response.status})`);
  }

  return {
    success: true,
    filename: safeName,
    secure_url: data.secure_url,
    public_id: data.public_id,
    bytes: data.bytes,
    format: data.format,
    width: data.width,
    height: data.height,
    markdownTag: `![${safeName}](${data.secure_url})`
  };
}

export async function bulkUploadToCloudinary({
  filenames = [],
  folderPath = CONVERTED_IMAGES_DIR,
  cloudName = 'dwa6rcttw',
  uploadPreset = '',
  apiKey = '',
  apiSecret = '',
  folder = 'csprimer'
}) {
  if (!Array.isArray(filenames) || filenames.length === 0) {
    throw new Error('No files specified for upload.');
  }

  const succeeded = [];
  const failed = [];

  for (const filename of filenames) {
    try {
      const res = await uploadToCloudinary({
        filename,
        folderPath,
        cloudName,
        uploadPreset,
        apiKey,
        apiSecret,
        folder
      });
      succeeded.push(res);
    } catch (err) {
      failed.push({ filename, error: err.message });
    }
  }

  return {
    total: filenames.length,
    succeededCount: succeeded.length,
    failedCount: failed.length,
    succeeded,
    failed
  };
}

export function openFolderInExplorer(folderPath = CONVERTED_IMAGES_DIR) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  const resolved = path.resolve(folderPath);
  if (process.platform === 'win32') {
    exec(`explorer.exe "${resolved}"`);
  } else if (process.platform === 'darwin') {
    exec(`open "${resolved}"`);
  } else {
    exec(`xdg-open "${resolved}"`);
  }
  return { success: true, path: resolved };
}

/**
 * Interactive Terminal CLI
 */
async function runCLI() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (q) => new Promise(resolve => rl.question(q, resolve));

  console.log('\n🚀 CSPrimer Local Content Scaffolder\n');
  console.log('1) Create a New Series (Course) & Add to Roadmap');
  console.log('2) Create a New Article or Project');
  console.log('3) Add an Existing Series to Roadmap');
  console.log('4) Sync Series Weights from Roadmap Order\n');

  const choice = (await question('Select an option (1-4): ')).trim();

  try {
    if (choice === '1') {
      console.log('\n--- Create a New Series ---');
      const title = await question('Series Title (e.g. Docker Fundamentals): ');
      const rawId = await question(`Series ID/slug (press enter for "${slugify(title)}"): `);
      const id = rawId.trim() || slugify(title);

      console.log('\nCategories:');
      CANONICAL_CATEGORIES.forEach((c, idx) => console.log(`  ${idx + 1}) ${c}`));
      const catChoice = await question('Select category (1-5, default 1): ');
      const category = CANONICAL_CATEGORIES[parseInt(catChoice) - 1] || 'Development';

      const description = await question('Short Description: ');
      const subtitle = await question('Subtitle/Tagline (optional): ');

      const result = createSeries({
        id,
        title,
        description,
        subtitle,
        category,
        addToRoadmaps: true,
        createIntroArticle: true
      });

      console.log('\n✅ Series created successfully!');
      console.log(`📁 Series file: ${result.seriesPath}`);
      if (result.roadmapResult) console.log(`🗺️  Roadmap: ${result.roadmapResult.message}`);
      if (result.introArticleResult) console.log(`📄 Intro article: ${result.introArticleResult.filePath}`);
    } else if (choice === '2') {
      console.log('\n--- Create Article or Project ---');
      console.log('1) 🎓 Course Lesson (attach to an existing series)');
      console.log('2) 🛠️ Standalone Project / Deep Dive (goes to Projects section)');
      const typeChoice = (await question('Select type (1 or 2, default 1): ')).trim();

      const title = await question('Title: ');
      const rawSlug = await question(`Slug (press enter for "${slugify(title)}"): `);
      const slug = rawSlug.trim() || slugify(title);

      let seriesId = null;
      let categories = [];
      let contentType = 'lesson';

      if (typeChoice === '2') {
        contentType = 'project';
        console.log('\nCategories:');
        CANONICAL_CATEGORIES.forEach((c, idx) => console.log(`  ${idx + 1}) ${c}`));
        const catChoice = await question('Select category (1-5, default 1): ');
        categories = [CANONICAL_CATEGORIES[parseInt(catChoice) - 1] || 'Development'];
      } else {
        const existing = listExistingSeries();
        console.log('\nExisting Series:');
        existing.forEach((s, idx) => console.log(`  ${idx + 1}) ${s.title} [${s.id}] (${s.category})`));
        const sChoice = await question(`Assign to series (1-${existing.length}): `);
        const selected = existing[parseInt(sChoice) - 1];
        if (selected) {
          seriesId = selected.id;
          categories = [selected.category];
        }
      }

      const description = await question('Description (optional): ');
      const format = (await question('Format: md or mdx? (default md): ')).trim().toLowerCase();

      const result = createArticle({
        title,
        slug,
        seriesId,
        categories,
        description,
        isMdx: format === 'mdx',
        addToNavbar: !!seriesId,
        contentType
      });

      console.log(`\n✅ ${contentType === 'project' ? 'Project' : 'Article'} created successfully!`);
      console.log(`📄 File: ${result.filePath}`);
      if (result.navbarUpdated) console.log(`🔗 Attached to series "${seriesId}" syllabus!`);
    } else if (choice === '3') {
      console.log('\n--- Add Series to Roadmap ---');
      const existing = listExistingSeries();
      existing.forEach((s, idx) => console.log(`  ${idx + 1}) ${s.title} [${s.id}] (${s.category})`));
      const sChoice = await question(`Select series (1-${existing.length}): `);
      const selected = existing[parseInt(sChoice) - 1];

      if (!selected) {
        console.log('Invalid selection.');
      } else {
        const res = addToRoadmap({ seriesId: selected.id, category: selected.category });
        console.log(`\n✅ ${res.message}`);
      }
    } else if (choice === '4') {
      console.log('\n--- Sync Series Weights ---');
      CANONICAL_CATEGORIES.forEach((c, idx) => console.log(`  ${idx + 1}) ${c}`));
      const catChoice = await question('Select category to sync (1-5): ');
      const category = CANONICAL_CATEGORIES[parseInt(catChoice) - 1];
      if (category) {
        const res = syncSeriesWeights(category);
        console.log(`\n✅ Synced ${res.count} series weights in "${category}" to match roadmap order.`);
      }
    } else {
      console.log('No action selected. Exiting.');
    }
  } catch (err) {
    console.error(`\n❌ Error: ${err.message}`);
  } finally {
    rl.close();
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'))) {
  runCLI();
}
