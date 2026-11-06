import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import matter from 'gray-matter';

const ROOT_DIR = process.cwd();
const ARTICLES_DIR = path.join(ROOT_DIR, 'src', 'content', 'articles');
const SERIES_DIR = path.join(ROOT_DIR, 'src', 'content', 'series');
const ROADMAP_PATH = path.join(ROOT_DIR, 'src', 'config', 'roadmapOrder.json');

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

  const totalLessons = allArticles.filter(a => !!a.series).length;
  const totalStandalone = allArticles.filter(a => !a.series).length;
  const totalDrafts = allArticles.filter(a => a.draft).length;

  return {
    totalSeries: seriesList.length,
    totalArticles: allArticles.length,
    totalLessons,
    totalStandalone,
    totalDrafts,
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
            weight: s ? s.weight : 100
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

  return {
    ...seriesData,
    resources: Array.isArray(seriesData.resources) ? seriesData.resources : [],
    id: seriesId,
    articlesOnDisk: seriesArticlesOnDisk,
    unassignedArticles
  };
}

export function saveSeriesNavbar(seriesId, navbar, resources) {
  const seriesFilePath = path.join(SERIES_DIR, `${seriesId}.json`);
  if (!fs.existsSync(seriesFilePath)) {
    throw new Error(`Series "${seriesId}" not found.`);
  }

  const sData = JSON.parse(fs.readFileSync(seriesFilePath, 'utf8'));
  sData.navbar = navbar;
  if (Array.isArray(resources)) {
    sData.resources = resources;
  }
  fs.writeFileSync(seriesFilePath, JSON.stringify(sData, null, 2) + '\n', 'utf8');
  return { success: true, message: `Syllabus and resources for "${seriesId}" updated successfully.` };
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

  fs.writeFileSync(seriesFilePath, JSON.stringify(sData, null, 2) + '\n', 'utf8');
  return { success: true, message: `Series "${seriesId}" updated successfully.`, series: sData };
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

  const articleSlug = slugify(slug || title);
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

        const targetSection = seriesData.navbar[sectionIndex] || seriesData.navbar[seriesData.navbar.length - 1];
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
