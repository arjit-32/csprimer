import http from 'node:http';
import {
  createSeries,
  createArticle,
  addToRoadmap,
  listExistingSeries,
  listAllArticles,
  getRoadmapConfig,
  saveRoadmapOrder,
  syncSeriesWeights,
  getSeriesDetails,
  saveSeriesNavbar,
  updateSeriesMetadata,
  toggleArticleDraft,
  getSiteStats,
  CANONICAL_CATEGORIES
} from './scaffold.mjs';

const PORT = 4322;

const HTML_DASHBOARD = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSPrimer Content Studio (Local)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #090d16;
      --card-bg: #111827;
      --card-inner: #1a2234;
      --border: #26334d;
      --border-light: #374665;
      --accent: #38bdf8;
      --accent-hover: #0ea5e9;
      --accent-glow: rgba(56, 189, 248, 0.2);
      --text: #f1f5f9;
      --text-muted: #94a3b8;
      --success: #10b981;
      --warning: #f59e0b;
      --error: #ef4444;
      --purple: #a855f7;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      padding: 2.5rem 1.5rem 5rem;
      max-width: 1160px;
      margin: 0 auto;
    }
    header {
      margin-bottom: 2rem;
      border-bottom: 1px solid var(--border);
      padding-bottom: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    h1 {
      font-size: 1.65rem;
      font-weight: 800;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }
    .badge-local {
      background: rgba(56, 189, 248, 0.15);
      border: 1px solid rgba(56, 189, 248, 0.35);
      color: var(--accent);
      font-size: 0.75rem;
      padding: 0.25rem 0.75rem;
      border-radius: 999px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .stats-bar {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .stat-box {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1rem 1.25rem;
    }
    .stat-label { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em; }
    .stat-val { font-size: 1.6rem; font-weight: 800; color: #fff; margin-top: 0.2rem; }

    .tabs {
      display: flex;
      gap: 0.4rem;
      margin-bottom: 1.5rem;
      background: var(--card-bg);
      padding: 0.4rem;
      border-radius: 14px;
      border: 1px solid var(--border);
      overflow-x: auto;
    }
    .tab-btn {
      flex: 1;
      min-width: 140px;
      padding: 0.75rem 0.8rem;
      border: none;
      background: transparent;
      color: var(--text-muted);
      border-radius: 10px;
      font-weight: 700;
      font-size: 0.88rem;
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;
      text-align: center;
    }
    .tab-btn.active {
      background: var(--card-inner);
      color: #fff;
      box-shadow: 0 2px 6px rgba(0,0,0,0.5);
      border: 1px solid var(--border-light);
    }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 2.2rem;
      box-shadow: 0 8px 30px rgba(0,0,0,0.4);
    }
    .tab-panel { display: none; }
    .tab-panel.active { display: block; }
    .form-group { margin-bottom: 1.3rem; }
    label {
      display: block;
      font-size: 0.88rem;
      font-weight: 600;
      margin-bottom: 0.45rem;
      color: var(--text);
    }
    .hint {
      font-size: 0.78rem;
      color: var(--text-muted);
      margin-top: 0.35rem;
    }
    input, select, textarea {
      width: 100%;
      padding: 0.75rem 0.95rem;
      background: #090d16;
      border: 1px solid var(--border);
      border-radius: 10px;
      color: var(--text);
      font-family: inherit;
      font-size: 0.95rem;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: var(--accent);
      box-shadow: 0 0 0 3px var(--accent-glow);
    }
    select:disabled {
      opacity: 0.6;
      background: #141b29;
      cursor: not-allowed;
      border-color: var(--border);
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.2rem;
    }
    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      margin-top: 0.8rem;
    }
    .checkbox-group input { width: auto; cursor: pointer; }
    .submit-btn {
      width: 100%;
      padding: 0.9rem 1.5rem;
      background: var(--accent);
      color: #090d16;
      border: none;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 800;
      cursor: pointer;
      transition: background 0.2s, transform 0.1s;
      margin-top: 1.2rem;
    }
    .submit-btn:hover { background: var(--accent-hover); }
    .submit-btn:active { transform: scale(0.99); }

    .btn-secondary {
      background: var(--card-inner);
      color: var(--text);
      border: 1px solid var(--border);
      padding: 0.55rem 0.9rem;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.85rem;
      transition: all 0.2s;
    }
    .btn-secondary:hover {
      background: #242f47;
      border-color: var(--accent);
    }

    /* Series Cards Grid */
    .series-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.25rem;
      margin-top: 1.2rem;
    }
    .series-card {
      background: var(--card-inner);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 1.35rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: border-color 0.2s, transform 0.15s;
    }
    .series-card:hover {
      border-color: var(--border-light);
      transform: translateY(-2px);
    }
    .series-card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0.6rem;
      margin-bottom: 0.6rem;
    }
    .series-card-title {
      font-size: 1.1rem;
      font-weight: 800;
      color: #fff;
    }
    .series-card-id {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: var(--text-muted);
    }
    .series-card-desc {
      font-size: 0.84rem;
      color: var(--text-muted);
      line-height: 1.4;
      margin-bottom: 1rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .series-card-meta {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }
    .series-card-controls {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.6rem;
      margin-top: 0.5rem;
    }
    .pill-ongoing {
      cursor: pointer;
      font-size: 0.72rem;
      padding: 0.2rem 0.55rem;
      border-radius: 999px;
      font-weight: 700;
      text-transform: uppercase;
      transition: all 0.2s;
    }
    .pill-ongoing.active {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.4);
    }
    .pill-ongoing.inactive {
      background: rgba(148, 163, 184, 0.1);
      color: var(--text-muted);
      border: 1px solid var(--border);
    }

    .purpose-selector {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 0.8rem;
      margin-bottom: 1.5rem;
    }
    .purpose-card {
      border: 2px solid var(--border);
      border-radius: 12px;
      padding: 1rem;
      cursor: pointer;
      transition: all 0.2s;
      background: var(--card-inner);
    }
    .purpose-card.active {
      border-color: var(--accent);
      background: rgba(56, 189, 248, 0.08);
    }
    .purpose-card h4 { font-size: 0.95rem; margin-bottom: 0.3rem; display: flex; align-items: center; gap: 0.4rem; }
    .purpose-card p { font-size: 0.78rem; color: var(--text-muted); line-height: 1.3; }

    .reorder-list {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      margin-top: 1rem;
    }
    .reorder-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--card-inner);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 0.85rem 1.1rem;
      transition: background 0.15s;
      gap: 0.8rem;
    }
    .reorder-item:hover {
      border-color: var(--border-light);
      background: #212c44;
    }
    .reorder-left {
      display: flex;
      align-items: center;
      gap: 0.9rem;
      flex: 1;
    }
    .reorder-index {
      font-family: 'JetBrains Mono', monospace;
      font-weight: 700;
      font-size: 0.85rem;
      color: var(--accent);
      min-width: 24px;
    }
    .reorder-title { font-weight: 700; font-size: 0.95rem; color: #fff; }
    .reorder-slug { font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; color: var(--text-muted); }
    .reorder-actions {
      display: flex;
      gap: 0.4rem;
      align-items: center;
    }
    .icon-btn {
      background: #090d16;
      border: 1px solid var(--border);
      color: var(--text);
      border-radius: 6px;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-weight: 700;
      transition: all 0.15s;
    }
    .icon-btn:hover:not(:disabled) {
      border-color: var(--accent);
      color: var(--accent);
      background: #172136;
    }
    .icon-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .path-section {
      background: #090d16;
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.25rem;
      margin-bottom: 1.5rem;
    }
    .path-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.8rem;
      gap: 0.8rem;
      flex-wrap: wrap;
    }
    .path-title { font-size: 1.1rem; font-weight: 700; color: #fff; }

    .alert-banner {
      background: rgba(245, 158, 11, 0.12);
      border: 1px solid rgba(245, 158, 11, 0.35);
      border-radius: 12px;
      padding: 1.1rem;
      margin-bottom: 1.5rem;
    }
    .alert-banner h4 { color: var(--warning); font-size: 0.95rem; margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.4rem; }

    .tag-badge {
      display: inline-block;
      padding: 0.2rem 0.5rem;
      border-radius: 6px;
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
    }
    .tag-Core-CS { background: rgba(59, 130, 246, 0.2); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.4); }
    .tag-DSA { background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.4); }
    .tag-Development { background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); }
    .tag-System-Design { background: rgba(168, 85, 247, 0.2); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.4); }
    .tag-AI-Engineering { background: rgba(236, 72, 153, 0.2); color: #f472b6; border: 1px solid rgba(236, 72, 153, 0.4); }

    .search-input {
      margin-bottom: 1.2rem;
      background: #090d16;
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 0.8rem 1rem;
      font-size: 0.95rem;
    }

    /* Modal */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.7);
      backdrop-filter: blur(4px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 1rem;
    }
    .modal-box {
      background: var(--card-bg);
      border: 1px solid var(--border-light);
      border-radius: 16px;
      padding: 2rem;
      max-width: 600px;
      width: 100%;
      box-shadow: 0 10px 40px rgba(0,0,0,0.6);
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid var(--border);
      padding-bottom: 1rem;
    }

    #toast {
      margin-top: 1.5rem;
      padding: 1rem 1.2rem;
      border-radius: 10px;
      font-size: 0.92rem;
      display: none;
      font-family: 'JetBrains Mono', monospace;
      white-space: pre-wrap;
    }
    #toast.success { background: rgba(16, 185, 129, 0.15); border: 1px solid var(--success); color: #34d399; }
    #toast.error { background: rgba(239, 68, 68, 0.15); border: 1px solid var(--error); color: #f87171; }
  </style>
</head>
<body>
  <header>
    <div>
      <h1>⚡ CSPrimer Content Studio</h1>
      <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.3rem;">Local series data, roadmap progression & content manager</p>
    </div>
    <span class="badge-local">Local Dev Only</span>
  </header>

  <div class="stats-bar" id="statsBar">
    <div class="stat-box">
      <div class="stat-label">Total Courses</div>
      <div class="stat-val" id="stat-courses">-</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">Course Lessons</div>
      <div class="stat-val" id="stat-lessons">-</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">Standalone Projects</div>
      <div class="stat-val" id="stat-projects">-</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">Drafts</div>
      <div class="stat-val" id="stat-drafts">-</div>
    </div>
  </div>

  <div class="tabs">
    <button class="tab-btn active" onclick="switchTab('series-cards')">1. 📚 Course Series Cards</button>
    <button class="tab-btn" onclick="switchTab('syllabus')">2. 📖 Syllabus & Lessons</button>
    <button class="tab-btn" onclick="switchTab('article')">3. ✍️ Create Article / Project</button>
    <button class="tab-btn" onclick="switchTab('roadmap-order')">4. 🗺️ Reorder Roadmaps</button>
    <button class="tab-btn" onclick="switchTab('new-series')">5. ➕ New Series</button>
    <button class="tab-btn" onclick="switchTab('explorer')">6. 🗂️ All Articles</button>
  </div>

  <div class="card">
    <!-- 1. Course Series Cards & Quick Editor -->
    <div id="panel-series-cards" class="tab-panel active">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h3 style="font-size: 1.25rem; font-weight: 800;">📚 Course Series Manager</h3>
          <p class="hint">Inspect all 45 courses, change status (In Progress, Planned, Live), toggle On-going, and edit metadata.</p>
        </div>
        <div style="display: flex; gap: 0.6rem;">
          <select id="sc-filter-cat" onchange="renderSeriesCards()" style="width: 180px;">
            <option value="all">All Tracks</option>
            <option value="Development">Development</option>
            <option value="Core-CS">Core-CS</option>
            <option value="DSA">DSA</option>
            <option value="System-Design">System-Design</option>
            <option value="AI-Engineering">AI-Engineering</option>
          </select>
        </div>
      </div>

      <input type="text" id="sc-search" class="search-input" placeholder="🔍 Filter series by title or slug..." oninput="renderSeriesCards()">
      <div class="series-grid" id="series-grid-container"></div>
    </div>

    <!-- 2. Course Syllabus & Lessons Manager -->
    <div id="panel-syllabus" class="tab-panel">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h3 style="font-size: 1.25rem; font-weight: 800;">📖 Syllabus & Lesson Progression</h3>
          <p class="hint">Organize chapter sections, reorder lessons, and manage unassigned article files.</p>
        </div>
        <select id="syl-series-select" onchange="loadCourseSyllabus()" style="width: 260px; font-weight: 600;"></select>
      </div>

      <div id="syl-meta-banner"></div>
      <div id="syl-unassigned-container"></div>
      <div id="syl-content-container"></div>
    </div>

    <!-- 3. Create Article / Project Form -->
    <div id="panel-article" class="tab-panel">
      <label style="margin-bottom: 0.6rem;">Content Purpose *</label>
      <div class="purpose-selector">
        <div class="purpose-card active" id="purpose-lesson" onclick="setPurpose('lesson')">
          <h4>🎓 Course Lesson</h4>
          <p>Attached to a Course. Category is locked to course track.</p>
        </div>
        <div class="purpose-card" id="purpose-project" onclick="setPurpose('project')">
          <h4>🛠️ Hands-on Project</h4>
          <p>Standalone build (compiler, shell, app) surfaced on /articles.</p>
        </div>
        <div class="purpose-card" id="purpose-article" onclick="setPurpose('article')">
          <h4>💡 Standalone Deep Dive</h4>
          <p>Single-topic technical article surfaced on /articles.</p>
        </div>
      </div>

      <form onsubmit="handleCreateArticle(event)">
        <div class="grid-2">
          <div class="form-group">
            <label>Title *</label>
            <input type="text" id="art-title" placeholder="e.g. Building an In-Memory Key-Value Store" required oninput="autoSlugArticle()">
          </div>
          <div class="form-group">
            <label>Slug *</label>
            <input type="text" id="art-slug" placeholder="building-in-memory-key-value-store" required>
            <div class="hint">Creates src/content/articles/[slug].[md|mdx]</div>
          </div>
        </div>

        <div class="grid-2">
          <div class="form-group" id="group-series">
            <label>Assign to Course Series *</label>
            <select id="art-series" onchange="handleSeriesSelectionChange()">
              <option value="">-- Select Series --</option>
            </select>
          </div>
          <div class="form-group">
            <label id="art-category-label">Category *</label>
            <select id="art-category">
              <option value="Development">Development</option>
              <option value="Core-CS">Core-CS</option>
              <option value="DSA">DSA</option>
              <option value="System-Design">System-Design</option>
              <option value="AI-Engineering">AI-Engineering</option>
            </select>
            <div class="hint" id="art-category-hint">For standalone content, choose the relevant track.</div>
          </div>
        </div>

        <div class="form-group">
          <label>Subtitle / Tagline (optional)</label>
          <input type="text" id="art-subtitle" placeholder="Short secondary heading...">
        </div>

        <div class="form-group">
          <label>Description (optional)</label>
          <textarea id="art-desc" rows="2" placeholder="Summary for OpenGraph and preview cards..."></textarea>
        </div>

        <div class="grid-2">
          <div class="form-group">
            <label>Format</label>
            <select id="art-format">
              <option value="md">Markdown (.md)</option>
              <option value="mdx">MDX with Custom Components (.mdx)</option>
            </select>
          </div>
          <div class="checkbox-group" id="group-navbar-checkbox" style="margin-top: 2rem;">
            <input type="checkbox" id="art-navbar" checked>
            <label for="art-navbar" style="margin: 0; cursor: pointer;">Append lesson to series syllabus navbar</label>
          </div>
        </div>

        <button type="submit" class="submit-btn" id="art-submit-btn">📄 Create Lesson</button>
      </form>
    </div>

    <!-- 4. Reorder Roadmap Series -->
    <div id="panel-roadmap-order" class="tab-panel">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h3 style="font-size: 1.25rem; font-weight: 800;">🗺️ Roadmap Track & Sequence Manager</h3>
          <p class="hint">Reorder how courses appear along learning paths on the /roadmaps page.</p>
        </div>
        <div style="display: flex; gap: 0.8rem;">
          <select id="ro-category-select" onchange="renderRoadmapOrder()" style="width: 200px;">
            <option value="Development">Development</option>
            <option value="Core-CS">Core-CS</option>
            <option value="DSA">DSA</option>
            <option value="System-Design">System-Design</option>
            <option value="AI-Engineering">AI-Engineering</option>
          </select>
          <button class="btn-secondary" onclick="handleSyncWeights()">⚡ Sync Weights to Courses</button>
        </div>
      </div>

      <div id="ro-paths-container"></div>
    </div>

    <!-- 5. Create Series Form -->
    <div id="panel-new-series" class="tab-panel">
      <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 1rem;">➕ Create New Course Series</h3>
      <form onsubmit="handleCreateSeries(event)">
        <div class="grid-2">
          <div class="form-group">
            <label>Series Title *</label>
            <input type="text" id="series-title" placeholder="e.g. Docker Fundamentals" required oninput="autoSlugSeries()">
          </div>
          <div class="form-group">
            <label>Series ID / Slug *</label>
            <input type="text" id="series-id" placeholder="docker-fundamentals" required>
            <div class="hint">Creates src/content/series/[id].json</div>
          </div>
        </div>

        <div class="grid-2">
          <div class="form-group">
            <label>Category (Roadmap Track) *</label>
            <select id="series-category">
              <option value="Development">Development (Fullstack)</option>
              <option value="Core-CS">Core-CS (Operating Systems, Networks)</option>
              <option value="DSA">DSA (Algorithms & Problem Solving)</option>
              <option value="System-Design">System-Design (Architecture, Cloud)</option>
              <option value="AI-Engineering">AI-Engineering (LLMs, Agents)</option>
            </select>
          </div>
          <div class="form-group">
            <label>Estimated Time</label>
            <input type="text" id="series-time" placeholder="e.g. 4 hours" value="4 hours">
          </div>
        </div>

        <div class="form-group">
          <label>Subtitle / Tagline</label>
          <input type="text" id="series-subtitle" placeholder="e.g. From containers to multi-service orchestration">
        </div>

        <div class="form-group">
          <label>Description</label>
          <textarea id="series-desc" rows="3" placeholder="Complete course breakdown covering images, networking, and volumes..."></textarea>
        </div>

        <div class="checkbox-group">
          <input type="checkbox" id="series-add-roadmap" checked>
          <label for="series-add-roadmap" style="margin: 0; cursor: pointer;">Automatically register in roadmapOrder.json under chosen category</label>
        </div>
        <div class="checkbox-group">
          <input type="checkbox" id="series-create-intro" checked>
          <label for="series-create-intro" style="margin: 0; cursor: pointer;">Scaffold first lesson article (intro-[slug].md) in src/content/articles/</label>
        </div>

        <button type="submit" class="submit-btn">🚀 Create Series & Register Roadmap</button>
      </form>
    </div>

    <!-- 6. All Articles Explorer -->
    <div id="panel-explorer" class="tab-panel">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h3 style="font-size: 1.25rem; font-weight: 800;">🗂️ All Articles & Projects Explorer</h3>
          <p class="hint">Instant search and filters across all 300+ articles in the repository.</p>
        </div>
        <div style="display: flex; gap: 0.6rem;">
          <select id="exp-filter-type" onchange="renderArticlesExplorer()" style="width: 170px;">
            <option value="all">All Content</option>
            <option value="lessons">Course Lessons</option>
            <option value="projects">Standalone Projects</option>
            <option value="drafts">Drafts Only</option>
          </select>
          <select id="exp-filter-cat" onchange="renderArticlesExplorer()" style="width: 170px;">
            <option value="all">All Tracks</option>
            <option value="Development">Development</option>
            <option value="Core-CS">Core-CS</option>
            <option value="DSA">DSA</option>
            <option value="System-Design">System-Design</option>
            <option value="AI-Engineering">AI-Engineering</option>
          </select>
        </div>
      </div>

      <input type="text" id="exp-search" class="search-input" placeholder="🔍 Search articles by title or slug..." oninput="renderArticlesExplorer()">
      <div class="reorder-list" id="exp-list-container"></div>
    </div>

    <div id="toast"></div>
  </div>

  <!-- Edit Series Details Modal -->
  <div id="edit-series-modal" class="modal-backdrop">
    <div class="modal-box">
      <div class="modal-header">
        <h3 style="font-size: 1.2rem; font-weight: 800; color: #fff;">✏️ Edit Series Metadata</h3>
        <button class="icon-btn" onclick="closeEditModal()">✕</button>
      </div>
      <form onsubmit="handleSaveSeriesModal(event)">
        <input type="hidden" id="modal-series-id">
        <div class="form-group">
          <label>Course Title *</label>
          <input type="text" id="modal-series-title" required>
        </div>
        <div class="form-group">
          <label>Subtitle / Tagline</label>
          <input type="text" id="modal-series-subtitle">
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea id="modal-series-desc" rows="3"></textarea>
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label>Estimated Time</label>
            <input type="text" id="modal-series-time" placeholder="e.g. 4 hours">
          </div>
          <div class="form-group">
            <label>Weight (Sort Order)</label>
            <input type="number" id="modal-series-weight" value="100">
          </div>
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label>Status</label>
            <select id="modal-series-status">
              <option value="">🟢 Live / Ready</option>
              <option value="in-progress">⏳ In Progress</option>
              <option value="planned">🔒 Planned (Locked)</option>
              <option value="re-visiting">🔁 Re-visiting</option>
            </select>
          </div>
          <div class="checkbox-group" style="margin-top: 1.8rem;">
            <input type="checkbox" id="modal-series-ongoing">
            <label for="modal-series-ongoing" style="margin: 0; cursor: pointer;">Mark as On-going</label>
          </div>
        </div>
        <button type="submit" class="submit-btn" style="margin-top: 1rem;">💾 Save Series Metadata</button>
      </form>
    </div>
  </div>

  <script>
    let allSeries = [];
    let allArticles = [];
    let currentRoadmapData = {};
    let currentSyllabus = null;
    let currentPurpose = 'lesson';

    function switchTab(tab) {
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      event.target.classList.add('active');
      document.getElementById('panel-' + tab).classList.add('active');
      hideToast();

      if (tab === 'series-cards') renderSeriesCards();
      if (tab === 'roadmap-order') loadRoadmapData();
      if (tab === 'syllabus') loadCourseSyllabus();
      if (tab === 'explorer') loadArticlesExplorer();
    }

    function setPurpose(purpose) {
      currentPurpose = purpose;
      document.querySelectorAll('.purpose-card').forEach(c => c.classList.remove('active'));
      document.getElementById('purpose-' + purpose).classList.add('active');

      const seriesGroup = document.getElementById('group-series');
      const navbarCheckbox = document.getElementById('group-navbar-checkbox');
      const submitBtn = document.getElementById('art-submit-btn');
      const categorySelect = document.getElementById('art-category');
      const categoryHint = document.getElementById('art-category-hint');

      if (purpose === 'lesson') {
        seriesGroup.style.display = 'block';
        navbarCheckbox.style.display = 'flex';
        submitBtn.textContent = '📄 Create Course Lesson';
        handleSeriesSelectionChange();
      } else {
        seriesGroup.style.display = 'none';
        navbarCheckbox.style.display = 'none';
        document.getElementById('art-series').value = '';
        categorySelect.disabled = false;
        categoryHint.textContent = 'Select canonical track for this standalone item.';
        categoryHint.style.color = 'var(--text-muted)';
        if (purpose === 'project') {
          submitBtn.textContent = '🛠️ Create Hands-on Project (Surfaced on /articles)';
        } else {
          submitBtn.textContent = '💡 Create Standalone Deep Dive (Surfaced on /articles)';
        }
      }
    }

    function showToast(msg, isError = false) {
      const t = document.getElementById('toast');
      t.className = isError ? 'error' : 'success';
      t.textContent = msg;
      t.style.display = 'block';
    }

    function hideToast() {
      document.getElementById('toast').style.display = 'none';
    }

    function slugify(text) {
      return text.toString().toLowerCase().trim()
        .replace(/[^\\w\\s-]/g, '')
        .replace(/[\\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    function autoSlugSeries() {
      const title = document.getElementById('series-title').value;
      document.getElementById('series-id').value = slugify(title);
    }

    function autoSlugArticle() {
      const title = document.getElementById('art-title').value;
      document.getElementById('art-slug').value = slugify(title);
    }

    async function refreshStatus() {
      try {
        const res = await fetch('/api/status');
        const data = await res.json();
        allSeries = data.series || [];
        document.getElementById('stat-courses').textContent = data.stats.totalSeries;
        document.getElementById('stat-lessons').textContent = data.stats.totalLessons;
        document.getElementById('stat-projects').textContent = data.stats.totalStandalone;
        document.getElementById('stat-drafts').textContent = data.stats.totalDrafts;

        const artSelect = document.getElementById('art-series');
        const sylSelect = document.getElementById('syl-series-select');
        artSelect.innerHTML = '<option value="">-- Select Series --</option>';
        sylSelect.innerHTML = '';

        allSeries.forEach(s => {
          const opt1 = document.createElement('option');
          opt1.value = s.id;
          opt1.textContent = s.title + ' [' + s.id + '] (' + s.category + ')';
          artSelect.appendChild(opt1);

          const opt2 = document.createElement('option');
          opt2.value = s.id;
          opt2.textContent = s.title + ' [' + s.id + ']';
          sylSelect.appendChild(opt2);
        });

        handleSeriesSelectionChange();
        renderSeriesCards();
      } catch (err) {
        console.error('Failed to load status', err);
      }
    }

    /**
     * 1. Course Series Cards & Quick Actions
     */
    function renderSeriesCards() {
      const catFilter = document.getElementById('sc-filter-cat').value;
      const query = document.getElementById('sc-search').value.toLowerCase().trim();
      const container = document.getElementById('series-grid-container');
      container.innerHTML = '';

      const filtered = allSeries.filter(s => {
        if (catFilter !== 'all' && s.category !== catFilter) return false;
        if (query) {
          const matchTitle = s.title.toLowerCase().includes(query);
          const matchId = s.id.toLowerCase().includes(query);
          if (!matchTitle && !matchId) return false;
        }
        return true;
      });

      if (filtered.length === 0) {
        container.innerHTML = '<p class="hint">No course series matched your search.</p>';
        return;
      }

      filtered.forEach(s => {
        const card = document.createElement('div');
        card.className = 'series-card';
        card.innerHTML = \`
          <div>
            <div class="series-card-header">
              <div>
                <div class="series-card-title">\${s.title}</div>
                <div class="series-card-id">\${s.id}</div>
              </div>
              <span class="tag-badge tag-\${s.category}">\${s.category}</span>
            </div>
            <div class="series-card-desc">\${s.description || s.subtitle || 'No description provided.'}</div>
            
            <div class="series-card-meta">
              <span class="hint">📖 \${s.lessonCount} lessons</span>
              <span class="hint">• ⏱️ \${s.time || 'N/A'}</span>
              <span class="hint">• ⚖️ Weight: \${s.weight}</span>
              <span class="pill-ongoing \${s.ongoing ? 'active' : 'inactive'}" onclick="toggleOngoing('\${s.id}', \${!s.ongoing})" title="Click to toggle On-going status">
                \${s.ongoing ? '🟢 On-going' : '⚪ Completed'}
              </span>
            </div>
          </div>

          <div>
            <div style="margin-bottom: 0.6rem;">
              <label style="font-size: 0.78rem; margin-bottom: 0.25rem;">Course Status:</label>
              <select onchange="updateCourseStatus('\${s.id}', this.value)" style="padding: 0.4rem 0.7rem; font-size: 0.85rem;">
                <option value="" \${!s.status ? 'selected' : ''}>🟢 Live / Ready</option>
                <option value="in-progress" \${s.status === 'in-progress' ? 'selected' : ''}>⏳ In Progress</option>
                <option value="planned" \${s.status === 'planned' ? 'selected' : ''}>🔒 Planned (Locked)</option>
                <option value="re-visiting" \${s.status === 're-visiting' ? 'selected' : ''}>🔁 Re-visiting</option>
              </select>
            </div>

            <div class="series-card-controls">
              <button class="btn-secondary" onclick="openEditModal('\${s.id}')">✏️ Edit Details</button>
              <button class="btn-secondary" onclick="jumpToSyllabus('\${s.id}')">📖 Syllabus</button>
            </div>
          </div>
        \`;
        container.appendChild(card);
      });
    }

    async function updateCourseStatus(seriesId, status) {
      hideToast();
      try {
        const res = await fetch('/api/update-series-meta', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ seriesId, metadata: { status } })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        const s = allSeries.find(item => item.id === seriesId);
        if (s) s.status = status;
        showToast('✅ Updated status for "' + seriesId + '" to: ' + (status || 'Live'));
      } catch (err) {
        showToast('❌ ' + err.message, true);
      }
    }

    async function toggleOngoing(seriesId, newOngoing) {
      hideToast();
      try {
        const res = await fetch('/api/update-series-meta', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ seriesId, metadata: { ongoing: newOngoing } })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        const s = allSeries.find(item => item.id === seriesId);
        if (s) s.ongoing = newOngoing;
        renderSeriesCards();
        showToast('✅ Updated On-going status for "' + seriesId + '".');
      } catch (err) {
        showToast('❌ ' + err.message, true);
      }
    }

    function jumpToSyllabus(seriesId) {
      document.getElementById('syl-series-select').value = seriesId;
      switchTab('syllabus');
    }

    function openEditModal(seriesId) {
      const s = allSeries.find(item => item.id === seriesId);
      if (!s) return;

      document.getElementById('modal-series-id').value = s.id;
      document.getElementById('modal-series-title').value = s.title;
      document.getElementById('modal-series-subtitle').value = s.subtitle || '';
      document.getElementById('modal-series-desc').value = s.description || '';
      document.getElementById('modal-series-time').value = s.time || '';
      document.getElementById('modal-series-weight').value = s.weight ?? 100;
      document.getElementById('modal-series-status').value = s.status || '';
      document.getElementById('modal-series-ongoing').checked = Boolean(s.ongoing);

      document.getElementById('edit-series-modal').style.display = 'flex';
    }

    function closeEditModal() {
      document.getElementById('edit-series-modal').style.display = 'none';
    }

    async function handleSaveSeriesModal(e) {
      e.preventDefault();
      hideToast();
      const seriesId = document.getElementById('modal-series-id').value;
      const metadata = {
        title: document.getElementById('modal-series-title').value,
        subtitle: document.getElementById('modal-series-subtitle').value,
        description: document.getElementById('modal-series-desc').value,
        time: document.getElementById('modal-series-time').value,
        weight: Number(document.getElementById('modal-series-weight').value),
        status: document.getElementById('modal-series-status').value,
        ongoing: document.getElementById('modal-series-ongoing').checked,
      };

      try {
        const res = await fetch('/api/update-series-meta', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ seriesId, metadata })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        closeEditModal();
        showToast('✅ Saved changes for course "' + seriesId + '".');
        refreshStatus();
      } catch (err) {
        showToast('❌ ' + err.message, true);
      }
    }

    // STRICT RULE: If series is selected, category is locked to series category
    function handleSeriesSelectionChange() {
      if (currentPurpose !== 'lesson') return;

      const selectedId = document.getElementById('art-series').value;
      const categorySelect = document.getElementById('art-category');
      const categoryHint = document.getElementById('art-category-hint');

      if (!selectedId) {
        categorySelect.disabled = false;
        categoryHint.textContent = 'Please choose a course series to auto-bind category.';
        categoryHint.style.color = 'var(--text-muted)';
        return;
      }

      const seriesObj = allSeries.find(s => s.id === selectedId);
      if (seriesObj && seriesObj.category) {
        categorySelect.value = seriesObj.category;
        categorySelect.disabled = true;
        categoryHint.innerHTML = '🔒 <strong>Locked to Course Track:</strong> Category is automatically synchronized to <em>' + seriesObj.category + '</em>.';
        categoryHint.style.color = '#38bdf8';
      }
    }

    async function handleCreateSeries(e) {
      e.preventDefault();
      hideToast();
      const payload = {
        title: document.getElementById('series-title').value,
        id: document.getElementById('series-id').value,
        category: document.getElementById('series-category').value,
        time: document.getElementById('series-time').value,
        subtitle: document.getElementById('series-subtitle').value,
        description: document.getElementById('series-desc').value,
        addToRoadmaps: document.getElementById('series-add-roadmap').checked,
        createIntroArticle: document.getElementById('series-create-intro').checked,
      };

      try {
        const res = await fetch('/api/create-series', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed');
        showToast('✅ Series created successfully!\\n' + JSON.stringify(data, null, 2));
        refreshStatus();
        switchTab('series-cards');
      } catch (err) {
        showToast('❌ ' + err.message, true);
      }
    }

    async function handleCreateArticle(e) {
      e.preventDefault();
      hideToast();

      const seriesId = currentPurpose === 'lesson' ? (document.getElementById('art-series').value || null) : null;
      if (currentPurpose === 'lesson' && !seriesId) {
        return showToast('❌ Please select a course series for this lesson.', true);
      }

      const category = document.getElementById('art-category').value;

      const payload = {
        title: document.getElementById('art-title').value,
        slug: document.getElementById('art-slug').value,
        seriesId,
        categories: [category],
        subtitle: document.getElementById('art-subtitle').value,
        description: document.getElementById('art-desc').value,
        isMdx: document.getElementById('art-format').value === 'mdx',
        addToNavbar: currentPurpose === 'lesson' && document.getElementById('art-navbar').checked,
        contentType: currentPurpose
      };

      try {
        const res = await fetch('/api/create-article', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed');
        showToast('✅ ' + (currentPurpose === 'project' ? 'Project' : 'Article') + ' created successfully!\\n' + JSON.stringify(data, null, 2));
        refreshStatus();
      } catch (err) {
        showToast('❌ ' + err.message, true);
      }
    }

    /**
     * 2. Course Syllabus & Lessons Manager
     */
    async function loadCourseSyllabus() {
      const seriesId = document.getElementById('syl-series-select').value;
      if (!seriesId) return;

      const metaBanner = document.getElementById('syl-meta-banner');
      const unassignedContainer = document.getElementById('syl-unassigned-container');
      const contentContainer = document.getElementById('syl-content-container');

      contentContainer.innerHTML = '<p class="hint">Loading course details...</p>';
      unassignedContainer.innerHTML = '';

      try {
        const res = await fetch('/api/series/' + seriesId);
        currentSyllabus = await res.json();

        // Meta Banner
        metaBanner.innerHTML = \`
          <div style="background: var(--card-inner); border: 1px solid var(--border); border-radius: 12px; padding: 1.25rem; margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <h2 style="font-size: 1.3rem; font-weight: 800; color: #fff;">\${currentSyllabus.title}</h2>
                <span class="tag-badge tag-\${currentSyllabus.category}">\${currentSyllabus.category}</span>
                <span style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace;">[\${currentSyllabus.id}]</span>
              </div>
              <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.3rem;">\${currentSyllabus.description || currentSyllabus.subtitle || ''}</p>
            </div>
            <div style="display: flex; gap: 0.6rem;">
              <button class="btn-secondary" onclick="openEditModal('\${currentSyllabus.id}')">✏️ Edit Details</button>
              <a href="/courses/\${currentSyllabus.id}" target="_blank" class="btn-secondary" style="text-decoration: none;">↗ Preview Course</a>
            </div>
          </div>
        \`;

        // Check for unassigned articles
        if (currentSyllabus.unassignedArticles && currentSyllabus.unassignedArticles.length > 0) {
          unassignedContainer.innerHTML = \`
            <div class="alert-banner">
              <h4>⚠️ Found \${currentSyllabus.unassignedArticles.length} Unassigned Article(s) on Disk for this Course</h4>
              <p class="hint" style="color: #cbd5e1; margin-bottom: 0.8rem;">These files have <code>series: "\${currentSyllabus.id}"</code> in frontmatter but are not yet in the course syllabus.</p>
              <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                \${currentSyllabus.unassignedArticles.map(a => \`
                  <div style="display: flex; justify-content: space-between; align-items: center; background: #1a2234; padding: 0.6rem 0.9rem; border-radius: 8px;">
                    <div>
                      <strong>\${a.title}</strong>
                      <span style="font-family: monospace; font-size: 0.78rem; color: var(--text-muted); margin-left: 0.5rem;">/articles/\${a.slug}</span>
                    </div>
                    <button class="btn-secondary" onclick="attachUnassignedArticle('\${a.slug}', '\${a.title.replace(/'/g, "\\\\'")}')">+ Add to Syllabus</button>
                  </div>
                \`).join('')}
              </div>
            </div>
          \`;
        }

        renderSyllabusEditor();

      } catch (err) {
        contentContainer.innerHTML = '<p class="hint" style="color: var(--error);">Failed to load syllabus: ' + err.message + '</p>';
      }
    }

    function renderSyllabusEditor() {
      const container = document.getElementById('syl-content-container');
      container.innerHTML = '';
      if (!currentSyllabus || !currentSyllabus.navbar) return;

      currentSyllabus.navbar.forEach((section, sIdx) => {
        const secDiv = document.createElement('div');
        secDiv.className = 'path-section';
        secDiv.innerHTML = \`
          <div class="path-header">
            <input type="text" value="\${section.subheading}" onchange="currentSyllabus.navbar[\${sIdx}].subheading = this.value" style="font-size: 1.1rem; font-weight: 700; width: 60%; background: #111827;">
            <div style="display: flex; gap: 0.4rem;">
              <button class="icon-btn" onclick="moveSection(\${sIdx}, -1)" \${sIdx === 0 ? 'disabled' : ''} title="Move chapter up">▲</button>
              <button class="icon-btn" onclick="moveSection(\${sIdx}, 1)" \${sIdx === currentSyllabus.navbar.length - 1 ? 'disabled' : ''} title="Move chapter down">▼</button>
              <button class="btn-secondary" onclick="addLessonToSection(\${sIdx})">+ Add Lesson</button>
              <button class="icon-btn" style="color: var(--error);" onclick="removeSection(\${sIdx})" title="Delete chapter">✕</button>
            </div>
          </div>
          <div class="reorder-list" id="syl-sec-\${sIdx}"></div>
        \`;

        const listEl = secDiv.querySelector(\`#syl-sec-\${sIdx}\`);
        section.link.forEach((link, lIdx) => {
          const item = document.createElement('div');
          item.className = 'reorder-item';
          
          // FIX: Default to Live / Ready if link.status is undefined or empty!
          const currentStatus = link.status || '';

          item.innerHTML = \`
            <div class="reorder-left">
              <span class="reorder-index">#\${lIdx + 1}</span>
              <div style="flex: 1;">
                <input type="text" value="\${link.title}" onchange="currentSyllabus.navbar[\${sIdx}].link[\${lIdx}].title = this.value" style="background: transparent; border: none; font-weight: 700; font-size: 0.95rem; color: #fff; padding: 0;">
                <div class="reorder-slug">/articles/\${link.url}</div>
              </div>
            </div>
            <div class="reorder-actions" style="align-items: center;">
              <select onchange="updateLessonStatus(\${sIdx}, \${lIdx}, this.value)" style="padding: 0.35rem 0.6rem; font-size: 0.8rem; width: 140px;">
                <option value="" \${currentStatus === '' ? 'selected' : ''}>🟢 Live / Ready</option>
                <option value="in-progress" \${currentStatus === 'in-progress' ? 'selected' : ''}>⏳ In Progress</option>
                <option value="planned" \${currentStatus === 'planned' ? 'selected' : ''}>🔒 Planned (Locked)</option>
                <option value="re-visiting" \${currentStatus === 're-visiting' ? 'selected' : ''}>🔁 Re-visiting</option>
              </select>
              <button class="icon-btn" onclick="moveSyllabusLesson(\${sIdx}, \${lIdx}, -1)" \${lIdx === 0 ? 'disabled' : ''} title="Move up">▲</button>
              <button class="icon-btn" onclick="moveSyllabusLesson(\${sIdx}, \${lIdx}, 1)" \${lIdx === section.link.length - 1 ? 'disabled' : ''} title="Move down">▼</button>
              <button class="icon-btn" style="color: var(--error);" onclick="removeSyllabusLesson(\${sIdx}, \${lIdx})" title="Remove lesson">✕</button>
              <a href="/articles/\${link.url}" target="_blank" class="icon-btn" title="View live lesson" style="text-decoration: none;">↗</a>
            </div>
          \`;
          listEl.appendChild(item);
        });

        container.appendChild(secDiv);
      });

      const footer = document.createElement('div');
      footer.style.display = 'flex';
      footer.style.gap = '1rem';
      footer.style.marginTop = '1.5rem';
      footer.innerHTML = \`
        <button class="btn-secondary" onclick="addSyllabusSection()">+ Add Chapter Section</button>
        <button class="submit-btn" style="margin: 0; flex: 1;" onclick="saveCourseSyllabus()">💾 Save Course Syllabus Order</button>
      \`;
      container.appendChild(footer);
    }

    function updateLessonStatus(sIdx, lIdx, statusVal) {
      if (!statusVal) {
        delete currentSyllabus.navbar[sIdx].link[lIdx].status;
      } else {
        currentSyllabus.navbar[sIdx].link[lIdx].status = statusVal;
      }
    }

    function moveSection(sIdx, delta) {
      const target = sIdx + delta;
      if (target < 0 || target >= currentSyllabus.navbar.length) return;
      const temp = currentSyllabus.navbar[sIdx];
      currentSyllabus.navbar[sIdx] = currentSyllabus.navbar[target];
      currentSyllabus.navbar[target] = temp;
      renderSyllabusEditor();
    }

    function removeSection(sIdx) {
      if (!confirm('Delete this chapter section and its lesson links from syllabus?')) return;
      currentSyllabus.navbar.splice(sIdx, 1);
      renderSyllabusEditor();
    }

    function moveSyllabusLesson(sIdx, lIdx, delta) {
      const links = currentSyllabus.navbar[sIdx].link;
      const target = lIdx + delta;
      if (target < 0 || target >= links.length) return;
      const temp = links[lIdx];
      links[lIdx] = links[target];
      links[target] = temp;
      renderSyllabusEditor();
    }

    function removeSyllabusLesson(sIdx, lIdx) {
      currentSyllabus.navbar[sIdx].link.splice(lIdx, 1);
      renderSyllabusEditor();
    }

    function addLessonToSection(sIdx) {
      const title = prompt('Lesson Title:');
      if (!title) return;
      const url = prompt('Article Slug (without .md):', slugify(title));
      if (!url) return;
      currentSyllabus.navbar[sIdx].link.push({
        type: 'articles',
        url,
        title
      });
      renderSyllabusEditor();
    }

    function attachUnassignedArticle(slug, title) {
      if (!currentSyllabus.navbar || currentSyllabus.navbar.length === 0) {
        currentSyllabus.navbar = [{ subheading: '1. Lessons', link: [] }];
      }
      currentSyllabus.navbar[0].link.push({
        type: 'articles',
        url: slug,
        title
      });
      showToast('Attached "' + title + '" to first section. Remember to click Save!');
      loadCourseSyllabus();
    }

    function addSyllabusSection() {
      const title = prompt('Chapter / Section Subheading:');
      if (!title) return;
      currentSyllabus.navbar.push({ subheading: title, link: [] });
      renderSyllabusEditor();
    }

    async function saveCourseSyllabus() {
      hideToast();
      const seriesId = document.getElementById('syl-series-select').value;
      try {
        const res = await fetch('/api/save-syllabus', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ seriesId, navbar: currentSyllabus.navbar })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        showToast('✅ ' + data.message);
      } catch (err) {
        showToast('❌ ' + err.message, true);
      }
    }

    /**
     * 4. Roadmap Reordering
     */
    async function loadRoadmapData() {
      try {
        const res = await fetch('/api/roadmap');
        currentRoadmapData = await res.json();
        renderRoadmapOrder();
      } catch (err) {
        showToast('❌ Failed to load roadmap data: ' + err.message, true);
      }
    }

    function renderRoadmapOrder() {
      const cat = document.getElementById('ro-category-select').value;
      const catData = currentRoadmapData[cat];
      const container = document.getElementById('ro-paths-container');
      container.innerHTML = '';

      if (!catData || !catData.paths || catData.paths.length === 0) {
        container.innerHTML = '<p class="hint">No paths configured for this track yet.</p>';
        return;
      }

      catData.paths.forEach((pathObj, pIdx) => {
        const pathDiv = document.createElement('div');
        pathDiv.className = 'path-section';
        pathDiv.innerHTML = \`
          <div class="path-header">
            <div>
              <span class="path-title">\${pathObj.title}</span>
              <span class="hint" style="margin-left: 0.5rem;">[\${pathObj.id}] (\${pathObj.courses.length} courses)</span>
            </div>
            <button class="btn-secondary" onclick="savePathOrder('\${cat}', \${pIdx})">💾 Save Path Order</button>
          </div>
          <div class="reorder-list" id="path-list-\${pIdx}"></div>
        \`;

        const listEl = pathDiv.querySelector(\`#path-list-\${pIdx}\`);
        pathObj.courses.forEach((c, cIdx) => {
          const item = document.createElement('div');
          item.className = 'reorder-item';
          item.innerHTML = \`
            <div class="reorder-left">
              <span class="reorder-index">#\${cIdx + 1}</span>
              <div>
                <div class="reorder-title">\${c.title}</div>
                <div class="reorder-slug">\${c.id}</div>
              </div>
            </div>
            <div class="reorder-actions">
              <button class="icon-btn" onclick="moveRoadmapCourse('\${cat}', \${pIdx}, \${cIdx}, -1)" \${cIdx === 0 ? 'disabled' : ''}>▲</button>
              <button class="icon-btn" onclick="moveRoadmapCourse('\${cat}', \${pIdx}, \${cIdx}, 1)" \${cIdx === pathObj.courses.length - 1 ? 'disabled' : ''}>▼</button>
              <button class="icon-btn" style="color: var(--error);" onclick="removeRoadmapCourse('\${cat}', \${pIdx}, \${cIdx})">✕</button>
            </div>
          \`;
          listEl.appendChild(item);
        });

        container.appendChild(pathDiv);
      });
    }

    function moveRoadmapCourse(cat, pIdx, cIdx, delta) {
      const courses = currentRoadmapData[cat].paths[pIdx].courses;
      const target = cIdx + delta;
      if (target < 0 || target >= courses.length) return;
      const temp = courses[cIdx];
      courses[cIdx] = courses[target];
      courses[target] = temp;
      renderRoadmapOrder();
    }

    function removeRoadmapCourse(cat, pIdx, cIdx) {
      if (!confirm('Remove this course from roadmap path?')) return;
      currentRoadmapData[cat].paths[pIdx].courses.splice(cIdx, 1);
      renderRoadmapOrder();
    }

    async function savePathOrder(cat, pIdx) {
      hideToast();
      const courseIds = currentRoadmapData[cat].paths[pIdx].courses.map(c => c.id);
      try {
        const res = await fetch('/api/reorder-roadmap', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category: cat, pathIndex: pIdx, courseIds })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        showToast('✅ ' + data.message);
      } catch (err) {
        showToast('❌ ' + err.message, true);
      }
    }

    async function handleSyncWeights() {
      const cat = document.getElementById('ro-category-select').value;
      if (!confirm(\`Sync course weights for "\${cat}" to match this exact roadmap order?\`)) return;
      hideToast();
      try {
        const res = await fetch('/api/sync-weights', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category: cat })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        showToast(\`✅ Updated \${data.count} courses with sequential weights.\`);
      } catch (err) {
        showToast('❌ ' + err.message, true);
      }
    }

    /**
     * 6. All Articles Explorer
     */
    async function loadArticlesExplorer() {
      const container = document.getElementById('exp-list-container');
      container.innerHTML = '<p class="hint">Loading all articles...</p>';
      try {
        const res = await fetch('/api/articles');
        allArticles = await res.json();
        renderArticlesExplorer();
      } catch (err) {
        container.innerHTML = '<p class="hint" style="color: var(--error);">Failed: ' + err.message + '</p>';
      }
    }

    function renderArticlesExplorer() {
      const typeFilter = document.getElementById('exp-filter-type').value;
      const catFilter = document.getElementById('exp-filter-cat').value;
      const query = document.getElementById('exp-search').value.toLowerCase().trim();
      const container = document.getElementById('exp-list-container');
      container.innerHTML = '';

      const filtered = allArticles.filter(a => {
        if (typeFilter === 'lessons' && !a.series) return false;
        if (typeFilter === 'projects' && !!a.series) return false;
        if (typeFilter === 'drafts' && !a.draft) return false;

        if (catFilter !== 'all' && !a.categories.includes(catFilter)) return false;

        if (query) {
          const matchTitle = a.title.toLowerCase().includes(query);
          const matchSlug = a.slug.toLowerCase().includes(query);
          const matchSeries = a.series && a.series.toLowerCase().includes(query);
          if (!matchTitle && !matchSlug && !matchSeries) return false;
        }

        return true;
      });

      if (filtered.length === 0) {
        container.innerHTML = '<p class="hint">No articles matched your filters.</p>';
        return;
      }

      filtered.forEach((a, idx) => {
        const item = document.createElement('div');
        item.className = 'reorder-item';
        item.innerHTML = \`
          <div class="reorder-left">
            <span class="reorder-index">#\${idx + 1}</span>
            <div>
              <div class="reorder-title">\${a.title}</div>
              <div class="reorder-slug">
                \${a.series ? '<span style="color: var(--accent);">[' + a.series + ']</span> ' : '<span style="color: #34d399;">[Standalone]</span> '}
                /articles/\${a.slug}
              </div>
            </div>
          </div>
          <div class="reorder-actions">
            <span class="tag-badge tag-\${a.categories[0] || 'Development'}">\${a.categories[0] || 'Development'}</span>
            <button class="btn-secondary" style="font-size: 0.75rem; padding: 0.3rem 0.6rem;" onclick="handleToggleDraft('\${a.slug}')">\${a.draft ? '🔴 Draft' : '🟢 Live'}</button>
            <a href="/articles/\${a.slug}" target="_blank" class="icon-btn" title="View live" style="text-decoration: none;">↗</a>
          </div>
        \`;
        container.appendChild(item);
      });
    }

    async function handleToggleDraft(slug) {
      try {
        const res = await fetch('/api/toggle-draft', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        const art = allArticles.find(a => a.slug === slug);
        if (art) art.draft = data.draft;
        renderArticlesExplorer();
        refreshStatus();
      } catch (err) {
        showToast('❌ ' + err.message, true);
      }
    }

    refreshStatus();
  </script>
</body>
</html>
`;

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

function sendJSON(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'GET') {
    if (url.pathname === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      return res.end(HTML_DASHBOARD);
    }

    if (url.pathname === '/api/status') {
      const stats = getSiteStats();
      const series = listExistingSeries();
      return sendJSON(res, 200, { stats, series });
    }

    if (url.pathname === '/api/series') {
      const list = listExistingSeries();
      return sendJSON(res, 200, list);
    }

    if (url.pathname === '/api/articles') {
      const list = listAllArticles();
      return sendJSON(res, 200, list);
    }

    if (url.pathname === '/api/roadmap') {
      const roadmap = getRoadmapConfig();
      return sendJSON(res, 200, roadmap);
    }

    if (url.pathname.startsWith('/api/series/')) {
      const id = url.pathname.replace('/api/series/', '');
      try {
        const details = getSeriesDetails(id);
        return sendJSON(res, 200, details);
      } catch (err) {
        return sendJSON(res, 404, { error: err.message });
      }
    }
  }

  if (req.method === 'POST') {
    try {
      const payload = await parseBody(req);

      if (url.pathname === '/api/create-series') {
        const result = createSeries(payload);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/create-article') {
        const result = createArticle(payload);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/add-to-roadmap') {
        const result = addToRoadmap(payload);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/reorder-roadmap') {
        const result = saveRoadmapOrder(payload);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/sync-weights') {
        const result = syncSeriesWeights(payload.category);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/save-syllabus') {
        const result = saveSeriesNavbar(payload.seriesId, payload.navbar);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/update-series-meta') {
        const result = updateSeriesMetadata(payload.seriesId, payload.metadata);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/toggle-draft') {
        const result = toggleArticleDraft(payload.slug);
        return sendJSON(res, 200, result);
      }
    } catch (err) {
      return sendJSON(res, 400, { error: err.message });
    }
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`\n⚡ CSPrimer Content Studio is running!`);
  console.log(`🌐 Open in browser: http://localhost:${PORT}`);
  console.log(`Press Ctrl+C to stop.\n`);
});
