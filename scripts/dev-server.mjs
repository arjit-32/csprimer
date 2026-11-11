import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
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
  saveSeriesResources,
  updateSeriesMetadata,
  attachArticleToSeries,
  detachArticleFromSeries,
  toggleArticleDraft,
  getSiteStats,
  getArticleDetails,
  saveArticleContent,
  deleteArticle,
  deleteSeries,
  addCourseToPath,
  listInterviewTopics,
  saveInterviewQuestion,
  deleteInterviewQuestion,
  createInterviewTopic,
  listAllShorts,
  saveShort,
  deleteShort,
  renameSeries,
  saveAllRoadmapPaths,
  listConvertedImages,
  scanSourceFolder,
  convertFolderImages,
  convertUploadedImage,
  deleteConvertedImage,
  uploadToCloudinary,
  bulkUploadToCloudinary,
  openFolderInExplorer,
  CONVERTED_IMAGES_DIR,
  CANONICAL_CATEGORIES
} from './scaffold.mjs';

const ROOT_DIR = process.cwd();
const DEFAULT_PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4323;

const HTML_DASHBOARD = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSPrimer Content Studio (Local)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <script src="/vendor/marked.min.js"></script>
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
      padding: 2rem 1.5rem 5rem;
      max-width: 1220px;
      margin: 0 auto;
    }
    header {
      margin-bottom: 1.8rem;
      border-bottom: 1px solid var(--border);
      padding-bottom: 1.4rem;
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
      grid-template-columns: repeat(7, 1fr);
      gap: 0.85rem;
      margin-bottom: 1.8rem;
    }
    @media (max-width: 1200px) {
      .stats-bar {
        grid-template-columns: repeat(4, 1fr);
      }
    }
    @media (max-width: 640px) {
      .stats-bar {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    .stat-box {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 0.9rem 1.15rem;
    }
    .stat-label { font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em; }
    .stat-val { font-size: 1.5rem; font-weight: 800; color: #fff; margin-top: 0.2rem; }

    .tabs {
      display: grid;
      grid-template-columns: repeat(9, 1fr);
      gap: 0.45rem;
      margin-bottom: 1.5rem;
      background: var(--card-bg);
      padding: 0.45rem;
      border-radius: 14px;
      border: 1px solid var(--border);
    }
    @media (max-width: 1280px) {
      .tabs {
        grid-template-columns: repeat(5, 1fr);
      }
    }
    @media (max-width: 768px) {
      .tabs {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    @media (max-width: 480px) {
      .tabs {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    .tab-btn {
      padding: 0.75rem 0.5rem;
      border: 1px solid transparent;
      background: transparent;
      color: var(--text-muted);
      border-radius: 10px;
      font-weight: 700;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      white-space: nowrap;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      user-select: none;
    }
    .tab-btn:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.04);
      border-color: var(--border);
    }
    .tab-btn.active {
      background: var(--card-inner);
      color: #fff;
      border-color: var(--accent);
      box-shadow: 0 0 14px rgba(56, 189, 248, 0.18);
    }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 2rem;
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
    .grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
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
      font-size: 0.96rem;
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
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
    }
    .btn-secondary:hover {
      background: #242f47;
      border-color: var(--accent);
    }
    .btn-danger {
      background: rgba(239, 68, 68, 0.15);
      color: #f87171;
      border: 1px solid rgba(239, 68, 68, 0.35);
      padding: 0.55rem 0.9rem;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.85rem;
      transition: all 0.2s;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
    }
    .btn-danger:hover {
      background: rgba(239, 68, 68, 0.3);
      border-color: var(--error);
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

    .drag-handle {
      cursor: grab;
      font-size: 1.15rem;
      color: var(--text-muted);
      padding: 0 0.35rem 0 0;
      user-select: none;
      display: inline-flex;
      align-items: center;
      transition: color 0.15s;
    }
    .drag-handle:hover {
      color: var(--accent);
    }
    .drag-handle:active {
      cursor: grabbing;
    }
    .reorder-item.dragging {
      opacity: 0.35;
      border: 2px dashed var(--accent);
      background: rgba(56, 189, 248, 0.08);
    }
    .reorder-item.drag-over-top {
      border-top: 3px solid var(--accent);
      background: #192238;
    }
    .reorder-item.drag-over-bottom {
      border-bottom: 3px solid var(--accent);
      background: #192238;
    }
    .path-section.drop-target {
      border-color: var(--accent);
      box-shadow: 0 0 16px var(--accent-glow);
    }
    .reorder-empty {
      padding: 1.5rem;
      text-align: center;
      border: 2px dashed var(--border);
      border-radius: 8px;
      color: var(--text-muted);
      font-size: 0.85rem;
      margin-top: 0.8rem;
    }

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
      background: rgba(0,0,0,0.78);
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
      max-width: 650px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 10px 40px rgba(0,0,0,0.6);
    }
    .modal-box.modal-large {
      max-width: 1140px;
      width: 96%;
      height: 92vh;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.2rem;
      border-bottom: 1px solid var(--border);
      padding-bottom: 0.9rem;
    }

    /* Article Editor Split Styles */
    .editor-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      flex: 1;
      min-height: 420px;
      height: 100%;
      margin-top: 1rem;
    }
    .editor-layout.mode-editor { grid-template-columns: 1fr; }
    .editor-layout.mode-editor .editor-preview-container { display: none; }
    .editor-layout.mode-preview { grid-template-columns: 1fr; }
    .editor-layout.mode-preview .editor-textarea-container { display: none; }

    .editor-textarea-container {
      display: flex;
      flex-direction: column;
      min-height: 0;
      height: 100%;
    }
    .editor-toolbar {
      display: flex;
      gap: 0.3rem;
      background: #090d16;
      border: 1px solid var(--border);
      border-bottom: none;
      border-radius: 8px 8px 0 0;
      padding: 0.4rem 0.6rem;
      flex-wrap: wrap;
    }
    .editor-toolbar button {
      background: var(--card-inner);
      border: 1px solid var(--border);
      color: var(--text);
      font-size: 0.78rem;
      padding: 0.25rem 0.55rem;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 600;
    }
    .editor-toolbar button:hover {
      background: #242f47;
      color: var(--accent);
      border-color: var(--accent);
    }
    .editor-textarea {
      flex: 1;
      height: 100%;
      min-height: 0;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.88rem;
      line-height: 1.6;
      padding: 1rem;
      background: #090d16;
      border: 1px solid var(--border);
      border-radius: 0 0 8px 8px;
      resize: none;
      color: #e2e8f0;
    }
    .editor-preview-container {
      background: #090d16;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1.25rem 1.5rem;
      overflow-y: auto;
      font-size: 0.94rem;
      line-height: 1.7;
      color: #cbd5e1;
      min-height: 0;
      height: 100%;
    }
    .editor-preview-container h1,
    .editor-preview-container h2,
    .editor-preview-container h3 {
      color: #fff;
      margin: 1.2rem 0 0.6rem;
    }
    .editor-preview-container pre {
      background: #111827;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 0.8rem 1rem;
      margin: 0.8rem 0;
      overflow-x: auto;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      color: #38bdf8;
    }
    .editor-preview-container code {
      font-family: 'JetBrains Mono', monospace;
      background: #1e293b;
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
      color: #38bdf8;
      font-size: 0.88em;
    }
    .editor-preview-container blockquote {
      border-left: 3px solid var(--accent);
      padding-left: 1rem;
      margin: 0.8rem 0;
      color: #94a3b8;
    }
    .editor-preview-container ul,
    .editor-preview-container ol {
      margin: 0.6rem 0 0.6rem 1.4rem;
    }

    /* Shorts Grid */
    .shorts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 1.2rem;
      margin-top: 1.2rem;
    }
    .short-card {
      background: var(--card-inner);
      border: 1px solid var(--border);
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.2s;
    }
    .short-card:hover {
      border-color: var(--border-light);
      transform: translateY(-2px);
    }
    .short-thumb-box {
      position: relative;
      background: #000;
      aspect-ratio: 16/9;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .short-thumb-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .short-play-badge {
      position: absolute;
      background: rgba(239, 68, 68, 0.9);
      color: #fff;
      font-size: 0.75rem;
      font-weight: 800;
      padding: 0.2rem 0.6rem;
      border-radius: 6px;
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
    .short-card-body {
      padding: 1rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* Interview Questions Cards */
    .iq-card {
      background: var(--card-inner);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.2rem 1.4rem;
      margin-bottom: 1rem;
      transition: border-color 0.2s;
    }
    .iq-card:hover { border-color: var(--border-light); }
    .iq-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0.8rem;
      margin-bottom: 0.8rem;
    }
    .iq-question-text {
      font-size: 1.05rem;
      font-weight: 700;
      color: #fff;
      line-height: 1.4;
    }
    .iq-answers {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      margin: 0.8rem 0;
      font-size: 0.88rem;
      color: #cbd5e1;
      line-height: 1.5;
    }
    .iq-answer-bullet {
      display: flex;
      gap: 0.5rem;
      align-items: baseline;
    }
    .iq-code-box {
      background: #090d16;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 0.8rem 1rem;
      margin-top: 0.6rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.82rem;
      color: #38bdf8;
      overflow-x: auto;
      white-space: pre;
    }

    /* Image Studio & Cloudinary Styles */
    .image-dropzone {
      border: 2px dashed var(--accent);
      border-radius: 14px;
      padding: 2.2rem 1.5rem;
      text-align: center;
      background: rgba(56, 189, 248, 0.03);
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    .image-dropzone:hover, .image-dropzone.dragover {
      background: rgba(56, 189, 248, 0.1);
      border-color: var(--accent-hover);
      transform: scale(1.008);
    }
    .image-dropzone-icon {
      font-size: 2.5rem;
      line-height: 1;
    }
    .image-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.25rem;
      margin-top: 1.2rem;
    }
    .image-card {
      background: var(--card-inner);
      border: 1px solid var(--border);
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.2s ease;
    }
    .image-card:hover {
      border-color: var(--border-light);
      transform: translateY(-2px);
      box-shadow: 0 10px 24px rgba(0,0,0,0.45);
    }
    .image-card-preview {
      background: #090d16;
      aspect-ratio: 16/10;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
      border-bottom: 1px solid var(--border);
    }
    .image-card-preview img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .image-card-body {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
      flex: 1;
      justify-content: space-between;
    }
    .image-card-name {
      font-size: 0.9rem;
      font-weight: 700;
      color: #fff;
      word-break: break-all;
    }
    .image-card-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.78rem;
      color: var(--text-muted);
      font-family: 'JetBrains Mono', monospace;
    }
    .image-card-actions {
      display: flex;
      gap: 0.4rem;
      flex-wrap: wrap;
    }
    .image-card-actions button {
      flex: 1;
      font-size: 0.78rem;
      padding: 0.4rem 0.6rem;
      justify-content: center;
    }
    .cloudinary-box {
      background: #090d16;
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.25rem;
      margin-bottom: 1.5rem;
    }
    .progress-bar-container {
      width: 100%;
      height: 8px;
      background: #1e293b;
      border-radius: 999px;
      overflow: hidden;
      margin-top: 0.8rem;
      display: none;
    }
    .progress-bar-fill {
      height: 100%;
      background: var(--accent);
      width: 0%;
      transition: width 0.2s ease;
    }

    #toast {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      max-width: 480px;
      padding: 1rem 1.4rem;
      border-radius: 12px;
      font-size: 0.92rem;
      font-weight: 600;
      display: none;
      font-family: 'JetBrains Mono', monospace;
      white-space: pre-wrap;
      z-index: 99999;
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.7);
      cursor: pointer;
      animation: toastSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes toastSlideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    #toast.success { background: rgba(16, 185, 129, 0.2); border: 1px solid var(--success); color: #34d399; backdrop-filter: blur(8px); }
    #toast.error { background: rgba(239, 68, 68, 0.2); border: 1px solid var(--error); color: #f87171; backdrop-filter: blur(8px); }
  </style>
</head>
<body>
  <header>
    <div>
      <h1>⚡ CSPrimer Content Studio</h1>
      <p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 0.25rem;">Full site content studio: courses, lessons, roadmaps, interview bytes & shorts</p>
    </div>
    <div style="display: flex; align-items: center; gap: 0.8rem;">
      <a href="http://localhost:4321" target="_blank" class="btn-secondary" style="text-decoration: none;">🌐 Public Preview</a>
      <button class="btn-secondary" onclick="refreshStatus()">🔄 Refresh Status</button>
      <span class="badge-local">Local Dev</span>
    </div>
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
    <div class="stat-box">
      <div class="stat-label">Interview Bytes</div>
      <div class="stat-val" id="stat-interview">-</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">Shorts Videos</div>
      <div class="stat-val" id="stat-shorts">-</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">Converted WebP</div>
      <div class="stat-val" id="stat-images">-</div>
    </div>
  </div>

  <div class="tabs">
    <button class="tab-btn active" id="tab-btn-series-cards" data-tab="series-cards" onclick="switchTab('series-cards')"><span>📚</span> Courses</button>
    <button class="tab-btn" id="tab-btn-syllabus" data-tab="syllabus" onclick="switchTab('syllabus')"><span>📖</span> Syllabus</button>
    <button class="tab-btn" id="tab-btn-article" data-tab="article" onclick="switchTab('article')"><span>✍️</span> New Article</button>
    <button class="tab-btn" id="tab-btn-roadmap-order" data-tab="roadmap-order" onclick="switchTab('roadmap-order')"><span>🗺️</span> Roadmaps</button>
    <button class="tab-btn" id="tab-btn-new-series" data-tab="new-series" onclick="switchTab('new-series')"><span>➕</span> New Series</button>
    <button class="tab-btn" id="tab-btn-explorer" data-tab="explorer" onclick="switchTab('explorer')"><span>🗂️</span> Articles</button>
    <button class="tab-btn" id="tab-btn-interview-bytes" data-tab="interview-bytes" onclick="switchTab('interview-bytes')"><span>💡</span> Interview Bytes</button>
    <button class="tab-btn" id="tab-btn-shorts" data-tab="shorts" onclick="switchTab('shorts')"><span>🎬</span> Shorts Studio</button>
    <button class="tab-btn" id="tab-btn-images" data-tab="images" onclick="switchTab('images')"><span>🖼️</span> Images & WebP</button>
  </div>

  <div class="card">
    <!-- 1. Course Series Cards & Quick Editor -->
    <div id="panel-series-cards" class="tab-panel active">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h3 style="font-size: 1.25rem; font-weight: 800;">📚 Course Series Manager</h3>
          <p class="hint">Inspect all courses, change status (Live, Planned, In-Progress), toggle On-going, and edit metadata.</p>
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

    <!-- 2. Course Syllabus & Resources Manager -->
    <div id="panel-syllabus" class="tab-panel">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h3 style="font-size: 1.25rem; font-weight: 800;">📖 Syllabus & Resources Progression</h3>
          <p class="hint">Organize chapter sections, reorder lessons, lock/unlock lessons, edit markdown content, and manage resources.</p>
        </div>
        <select id="syl-series-select" onchange="loadCourseSyllabus()" style="width: 280px; font-weight: 600;"></select>
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
          <p>Attached to a Course. Category is strictly locked to course track.</p>
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

        <div class="grid-2" id="grid-art-course-row">
          <div class="form-group" id="group-series">
            <label>Assign to Course Series *</label>
            <select id="art-series" onchange="handleSeriesSelectionChange()">
              <option value="">-- Select Series --</option>
            </select>
          </div>
          <div class="form-group" id="group-art-section" style="display: none;">
            <label>Target Chapter / Section *</label>
            <select id="art-section-select">
              <option value="0">1. Lessons</option>
            </select>
            <div class="hint">Where this lesson will be placed in the course syllabus</div>
          </div>
          <div class="form-group" id="group-art-category">
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
          <p class="hint">Reorder how courses appear along learning paths on the /roadmaps page, move across sections, or add new paths.</p>
        </div>
        <div style="display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap;">
          <select id="ro-category-select" onchange="renderRoadmapOrder()" style="width: 170px;">
            <option value="Development">Development</option>
            <option value="Core-CS">Core-CS</option>
            <option value="DSA">DSA</option>
            <option value="System-Design">System-Design</option>
            <option value="AI-Engineering">AI-Engineering</option>
          </select>
          <button class="btn-secondary" onclick="addNewRoadmapPath()">➕ Add Section</button>
          <button class="btn-secondary" onclick="saveAllCurrentRoadmapPaths()">💾 Save All Paths</button>
          <button class="btn-secondary" style="border-color: var(--accent); color: var(--accent);" onclick="saveAndSyncWeights()">⚡ Save & Sync Weights</button>
        </div>
      </div>

      <div style="background: rgba(56, 189, 248, 0.06); border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 8px; padding: 0.65rem 1rem; margin-bottom: 1.2rem; font-size: 0.82rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.6rem;">
        <span>💡</span>
        <span>Drag and drop courses using the <strong>⠿</strong> handle, or use <strong>⏫</strong> (top) / <strong>▲</strong> / <strong>▼</strong> / <strong>⏬</strong> (bottom). Easily move courses between sections with the <em>Move to...</em> dropdown.</span>
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
          <p class="hint">Instant search, markdown editor, and draft toggle across all 300+ articles in the repository.</p>
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

    <!-- 7. Interview Bytes Manager -->
    <div id="panel-interview-bytes" class="tab-panel">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h3 style="font-size: 1.25rem; font-weight: 800;">💡 Interview Bytes Manager</h3>
          <p class="hint">Curate interview questions, bullet answers, code snippets and topic tags across YAML collections.</p>
        </div>
        <div style="display: flex; gap: 0.6rem;">
          <select id="iq-topic-select" onchange="renderInterviewQuestions()" style="width: 180px;"></select>
          <button class="btn-secondary" onclick="openNewInterviewModal()">+ Add Question</button>
          <button class="btn-secondary" onclick="openNewTopicModal()">+ New Topic File</button>
        </div>
      </div>

      <input type="text" id="iq-search" class="search-input" placeholder="🔍 Search questions, answers, or tags..." oninput="renderInterviewQuestions()">
      <div id="iq-list-container"></div>
    </div>

    <!-- 8. Shorts Studio -->
    <div id="panel-shorts" class="tab-panel">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h3 style="font-size: 1.25rem; font-weight: 800;">🎬 Shorts Video Studio</h3>
          <p class="hint">Manage bite-sized video learning cards, YouTube IDs, and series playlists.</p>
        </div>
        <div style="display: flex; gap: 0.6rem;">
          <select id="shorts-series-select" onchange="renderShortsStudio()" style="width: 200px;"></select>
          <button class="btn-secondary" onclick="openNewShortModal()">+ Add Short Video</button>
        </div>
      </div>

      <input type="text" id="shorts-search" class="search-input" placeholder="🔍 Search shorts by title or series..." oninput="renderShortsStudio()">
      <div class="shorts-grid" id="shorts-grid-container"></div>
    </div>

    <!-- 9. Image Studio & Cloudinary Hub -->
    <div id="panel-images" class="tab-panel">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h3 style="font-size: 1.25rem; font-weight: 800;">🖼️ Image Studio & Cloudinary Hub</h3>
          <p class="hint">Convert PNG/JPG screenshots to WebP, inspect converted files, and bulk upload directly to Cloudinary.</p>
        </div>
        <div style="display: flex; gap: 0.6rem;">
          <button class="btn-secondary" onclick="openExplorerFolder()">📂 Open in Explorer</button>
          <button class="btn-secondary" onclick="loadImagesStudio()">🔄 Refresh Gallery</button>
        </div>
      </div>

      <div class="grid-2" style="margin-bottom: 1.5rem;">
        <!-- Batch Folder-to-Folder Converter -->
        <div class="path-section" style="margin-bottom: 0;">
          <div class="path-header">
            <div class="path-title">📁 Folder Batch Converter</div>
            <span class="badge-local">From Disk</span>
          </div>
          <p class="hint" style="margin-bottom: 1rem;">Convert all PNG and JPG images in a directory into WebP.</p>

          <div class="form-group">
            <label>Source Images Folder *</label>
            <input type="text" id="img-source-folder" value="C:\\Users\\SharmaArj\\OneDrive - Informa plc\\Pictures\\Screenshots" placeholder="e.g. C:\Users\Username\Pictures\Screenshots">
            <div class="hint">Path to folder containing raw screenshots or PNG/JPG images.</div>
          </div>

          <div class="form-group">
            <label>Destination WebP Folder *</label>
            <input type="text" id="img-dest-folder" placeholder="Default: C:\arjit-32\Computer-Science-Primer\converted_images">
            <div class="hint">Where WebP files will be saved. Default is the project's converted_images folder.</div>
          </div>

          <div class="grid-2">
            <div class="form-group">
              <label>WebP Quality (<span id="quality-val">82</span>%)</label>
              <input type="range" id="img-quality" min="50" max="100" value="82" oninput="document.getElementById('quality-val').textContent = this.value">
            </div>
            <div class="checkbox-group" style="margin-top: 1.6rem;">
              <input type="checkbox" id="img-lossless">
              <label for="img-lossless" style="margin: 0; cursor: pointer;">Lossless Mode</label>
            </div>
          </div>

          <div style="display: flex; gap: 0.8rem; margin-top: 0.8rem;">
            <button class="btn-secondary" type="button" onclick="scanInputFolder()">🔍 Scan Folder</button>
            <button class="submit-btn" style="margin-top: 0;" type="button" onclick="convertInputFolder()">⚡ Convert All to WebP</button>
          </div>
          <div id="scan-results-box" style="margin-top: 0.8rem; font-size: 0.84rem; color: var(--text-muted);"></div>
        </div>

        <!-- Direct Browser Dropzone -->
        <div class="path-section" style="margin-bottom: 0; display: flex; flex-direction: column;">
          <div class="path-header">
            <div class="path-title">📥 Browser Dropzone</div>
            <span class="badge-local">Drag & Drop</span>
          </div>
          <p class="hint" style="margin-bottom: 1rem;">Drag screenshot files straight from your desktop or file manager.</p>

          <div class="image-dropzone" id="imageDropzone" onclick="document.getElementById('file-picker-input').click()" ondragover="handleDragOver(event)" ondragleave="handleDragLeave(event)" ondrop="handleDropFiles(event)">
            <input type="file" id="file-picker-input" multiple accept="image/png,image/jpeg,image/webp,image/gif,image/bmp" style="display: none;" onchange="handleFilePickerSelect(event)">
            <div class="image-dropzone-icon">📷</div>
            <div style="font-weight: 700; color: #fff;">Click to Browse or Drag & Drop Images Here</div>
            <div class="hint">PNG, JPG, BMP, or TIFF. Automatically converted to WebP on the fly.</div>
          </div>

          <div id="drop-status-box" style="margin-top: 1rem; font-size: 0.84rem; color: var(--text-muted); flex: 1;"></div>
        </div>
      </div>

      <!-- Cloudinary Integration Section -->
      <div class="cloudinary-box">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem; flex-wrap: wrap; gap: 0.8rem;">
          <div>
            <h4 style="font-size: 1.05rem; font-weight: 800; color: #fff; display: flex; align-items: center; gap: 0.5rem;">
              <span>☁️</span> Cloudinary Bulk Uploader
            </h4>
            <p class="hint">Upload converted WebP images to your Cloudinary media library and get instant markdown URLs.</p>
          </div>
          <div style="display: flex; gap: 0.6rem;">
            <button class="btn-secondary" onclick="saveCloudinarySettings()">💾 Save Cloudinary Settings</button>
            <button class="submit-btn" style="margin: 0; width: auto; padding: 0.5rem 1.2rem;" onclick="handleBulkUploadCloudinary()">☁️ Bulk Upload All WebP</button>
          </div>
        </div>

        <div class="grid-3" style="margin-bottom: 0.8rem;">
          <div class="form-group" style="margin-bottom: 0;">
            <label style="font-size: 0.82rem;">Cloud Name *</label>
            <input type="text" id="cld-cloud-name" value="dwa6rcttw" placeholder="dwa6rcttw">
          </div>
          <div class="form-group" style="margin-bottom: 0;">
            <label style="font-size: 0.82rem;">Target Folder</label>
            <input type="text" id="cld-folder" value="csprimer" placeholder="e.g. csprimer">
          </div>
          <div class="form-group" style="margin-bottom: 0;">
            <label style="font-size: 0.82rem;">Upload Preset (Unsigned)</label>
            <input type="text" id="cld-upload-preset" placeholder="e.g. ml_default or unsigned_preset">
          </div>
        </div>

        <details style="margin-top: 0.6rem; cursor: pointer;">
          <summary style="font-size: 0.82rem; color: var(--text-muted);">🔑 Or use Signed API Credentials (API Key & Secret)</summary>
          <div class="grid-2" style="margin-top: 0.6rem;">
            <div class="form-group" style="margin-bottom: 0;">
              <label style="font-size: 0.8rem;">API Key</label>
              <input type="text" id="cld-api-key" placeholder="Enter Cloudinary API Key">
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label style="font-size: 0.8rem;">API Secret</label>
              <input type="password" id="cld-api-secret" placeholder="Enter Cloudinary API Secret">
            </div>
          </div>
        </details>

        <div class="progress-bar-container" id="cld-progress-bar">
          <div class="progress-bar-fill" id="cld-progress-fill"></div>
        </div>
        <div id="cld-upload-status" style="margin-top: 0.6rem; font-size: 0.82rem; color: var(--text-muted); font-family: 'JetBrains Mono', monospace;"></div>
      </div>

      <!-- Converted Images Gallery -->
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.8rem;">
          <div style="display: flex; align-items: baseline; gap: 0.8rem;">
            <h4 style="font-size: 1.1rem; font-weight: 800; color: #fff;">Converted WebP Gallery</h4>
            <span class="hint" id="gallery-count-label">0 images</span>
          </div>
          <input type="text" id="gallery-search" class="search-input" style="width: 280px; margin-bottom: 0;" placeholder="🔍 Filter images by name..." oninput="filterGallery()">
        </div>

        <div class="image-grid" id="converted-images-container"></div>
      </div>
    </div>
  </div>

  <!-- Edit Series Details Modal -->
  <div id="edit-series-modal" class="modal-backdrop">
    <div class="modal-box">
      <div class="modal-header">
        <h3 style="font-size: 1.2rem; font-weight: 800; color: #fff;">✏️ Edit Series Metadata</h3>
        <button class="icon-btn" onclick="closeEditModal()">✕</button>
      </div>
      <form onsubmit="handleSaveSeriesModal(event)">
        <input type="hidden" id="modal-series-old-id">
        <div class="grid-2">
          <div class="form-group">
            <label>Course Title *</label>
            <input type="text" id="modal-series-title" required>
          </div>
          <div class="form-group">
            <label>Course Slug / File Name *</label>
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <input type="text" id="modal-series-id" required pattern="[a-z0-9-]+" style="font-family: 'JetBrains Mono', monospace; font-weight: 600; color: var(--accent);">
              <span style="font-size: 0.85rem; color: var(--text-muted); font-family: 'JetBrains Mono', monospace;">.json</span>
            </div>
            <span style="font-size: 0.73rem; color: var(--text-muted); margin-top: 0.2rem; display: block;">Renaming renames the JSON file and migrates all attached articles & roadmap references.</span>
          </div>
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label>Category (Roadmap Track) *</label>
            <select id="modal-series-category">
              <option value="Development">Development</option>
              <option value="Core-CS">Core-CS</option>
              <option value="DSA">DSA</option>
              <option value="System-Design">System-Design</option>
              <option value="AI-Engineering">AI-Engineering</option>
            </select>
          </div>
          <div class="form-group">
            <label>Estimated Time</label>
            <input type="text" id="modal-series-time" placeholder="e.g. 4 hours">
          </div>
        </div>
        <div class="form-group">
          <label>Subtitle / Tagline</label>
          <input type="text" id="modal-series-subtitle">
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea id="modal-series-desc" rows="3"></textarea>
        </div>
        <div class="form-group">
          <label>Thumbnail Image Path</label>
          <input type="text" id="modal-series-image" placeholder="../../assets/images/thumbnails/slug.webp">
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
          <div class="form-group">
            <label>Weight (Sort Order)</label>
            <input type="number" id="modal-series-weight" value="100">
          </div>
        </div>
        <div class="checkbox-group" style="margin-bottom: 1.5rem;">
          <input type="checkbox" id="modal-series-ongoing">
          <label for="modal-series-ongoing" style="margin: 0; cursor: pointer;">Mark as On-going Course</label>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
          <button type="button" class="btn-danger" onclick="handleDeleteSeriesModal()">🗑️ Delete Course</button>
          <button type="submit" class="submit-btn" style="margin: 0; flex: 1;">💾 Save Series Metadata</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Full Article Markdown & Frontmatter Editor Modal -->
  <div id="article-editor-modal" class="modal-backdrop">
    <div class="modal-box modal-large">
      <div class="modal-header">
        <div style="display: flex; align-items: center; gap: 0.8rem; flex-wrap: wrap;">
          <h3 id="ed-modal-title" style="font-size: 1.2rem; font-weight: 800; color: #fff;">✏️ Article Editor</h3>
          <span id="ed-modal-badge" class="badge-local">Markdown</span>
          <span id="ed-stats" style="font-size: 0.8rem; color: var(--text-muted); font-family: 'JetBrains Mono', monospace;">0 words • 0 min read</span>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <div style="display: flex; background: #090d16; border: 1px solid var(--border); border-radius: 8px; padding: 0.2rem;">
            <button class="btn-secondary" style="border: none; padding: 0.35rem 0.7rem; font-size: 0.78rem;" onclick="setEditorMode('split')">Split</button>
            <button class="btn-secondary" style="border: none; padding: 0.35rem 0.7rem; font-size: 0.78rem;" onclick="setEditorMode('editor')">Write</button>
            <button class="btn-secondary" style="border: none; padding: 0.35rem 0.7rem; font-size: 0.78rem;" onclick="setEditorMode('preview')">Preview</button>
          </div>
          <button class="icon-btn" onclick="closeArticleEditor()">✕</button>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 0.8rem; flex: 1; min-height: 0;">
        <div class="grid-3" style="margin-bottom: 0;">
          <div class="form-group" style="margin-bottom: 0;">
            <label style="font-size: 0.8rem;">Article Title *</label>
            <input type="text" id="ed-title" style="padding: 0.55rem 0.8rem; font-size: 0.9rem;" required>
          </div>
          <div class="form-group" style="margin-bottom: 0;">
            <label style="font-size: 0.8rem;">Slug *</label>
            <input type="text" id="ed-slug" style="padding: 0.55rem 0.8rem; font-size: 0.9rem;" required>
            <input type="hidden" id="ed-old-slug">
          </div>
          <div class="form-group" style="margin-bottom: 0;">
            <label style="font-size: 0.8rem;">Course Series (or Standalone)</label>
            <select id="ed-series" style="padding: 0.55rem 0.8rem; font-size: 0.85rem;" onchange="handleEditorSeriesChange()"></select>
          </div>
        </div>

        <div class="grid-3" style="margin-bottom: 0;">
          <div class="form-group" style="margin-bottom: 0;">
            <label style="font-size: 0.8rem;">Subtitle</label>
            <input type="text" id="ed-subtitle" placeholder="Tagline..." style="padding: 0.55rem 0.8rem; font-size: 0.85rem;">
          </div>
          <div class="form-group" style="margin-bottom: 0;">
            <label style="font-size: 0.8rem;">Description</label>
            <input type="text" id="ed-desc" placeholder="Summary..." style="padding: 0.55rem 0.8rem; font-size: 0.85rem;">
          </div>
          <div style="display: flex; gap: 1rem; align-items: center; margin-top: 1.4rem;">
            <div class="checkbox-group" style="margin: 0;">
              <input type="checkbox" id="ed-draft">
              <label for="ed-draft" style="margin: 0; cursor: pointer; font-size: 0.85rem;">Draft (Hidden)</label>
            </div>
            <div class="checkbox-group" style="margin: 0;">
              <input type="checkbox" id="ed-featured">
              <label for="ed-featured" style="margin: 0; cursor: pointer; font-size: 0.85rem;">Featured</label>
            </div>
          </div>
        </div>

        <div class="editor-layout" id="editor-layout">
          <div class="editor-textarea-container">
            <div class="editor-toolbar">
              <button type="button" onclick="insertFormat('## ', '')">H2</button>
              <button type="button" onclick="insertFormat('### ', '')">H3</button>
              <button type="button" onclick="insertFormat('**', '**')">Bold</button>
              <button type="button" onclick="insertFormat('*', '*')">Italic</button>
              <button type="button" onclick="insertFormat('\`', '\`')">Code</button>
              <button type="button" onclick="insertFormat('\\n\`\`\`js\\n', '\\n\`\`\`\\n')">Code Block</button>
              <button type="button" onclick="insertFormat('\\n> ', '')">Quote</button>
              <button type="button" onclick="insertFormat('[', '](https://)')">Link</button>
              <button type="button" onclick="insertFormat('![alt](', ')')">Image</button>
              <button type="button" onclick="insertFormat('\\n- ', '')">List</button>
              <button type="button" onclick="openMediaPickerForEditor()" style="color: var(--accent); font-weight: 700;">🖼️ Insert Studio Image</button>
            </div>
            <textarea id="ed-content" class="editor-textarea" oninput="updateEditorPreview()" onkeydown="handleEditorTabKey(event)" placeholder="Write your markdown lesson here..."></textarea>
          </div>
          <div class="editor-preview-container" id="editor-preview"></div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-top: 0.5rem;">
          <button type="button" class="btn-danger" onclick="handleDeleteCurrentArticle()">🗑️ Delete Article</button>
          <div style="display: flex; gap: 0.8rem;">
            <button type="button" class="btn-secondary" onclick="closeArticleEditor()">Cancel</button>
            <button type="button" class="submit-btn" style="margin: 0; width: auto; padding: 0.65rem 1.6rem;" onclick="handleSaveCurrentArticle()">💾 Save Article</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Add Lesson To Syllabus Modal -->
  <div id="add-lesson-modal" class="modal-backdrop">
    <div class="modal-box">
      <div class="modal-header">
        <h3 style="font-size: 1.2rem; font-weight: 800; color: #fff;">+ Add Lesson to Chapter</h3>
        <button class="icon-btn" onclick="closeAddLessonModal()">✕</button>
      </div>
      <input type="hidden" id="alm-section-index">
      
      <div style="display: flex; gap: 0.5rem; margin-bottom: 1.2rem; background: #090d16; padding: 0.3rem; border-radius: 8px; border: 1px solid var(--border);">
        <button type="button" class="btn-secondary" id="alm-tab-existing" style="flex: 1; border: none;" onclick="setAddLessonMode('existing')">Attach Existing Article</button>
        <button type="button" class="btn-secondary" id="alm-tab-new" style="flex: 1; border: none;" onclick="setAddLessonMode('new')">Create New Article File</button>
      </div>

      <div id="alm-pane-existing">
        <div class="form-group">
          <label>Filter & Search Articles on Disk:</label>
          <input type="text" id="alm-search-input" placeholder="🔍 Search by title or slug..." oninput="filterAlmArticles()" style="margin-bottom: 0.6rem;">
          <div style="display: flex; gap: 0.4rem; margin-bottom: 0.6rem; flex-wrap: wrap;">
            <button type="button" class="btn-secondary" id="alm-filter-all" style="font-size: 0.75rem; padding: 0.2rem 0.5rem;" onclick="setAlmFilter('all')">All Articles</button>
            <button type="button" class="btn-secondary" id="alm-filter-unassigned" style="font-size: 0.75rem; padding: 0.2rem 0.5rem; background: var(--card-inner); color: var(--accent);" onclick="setAlmFilter('unassigned')">Unassigned for this Course</button>
            <button type="button" class="btn-secondary" id="alm-filter-standalone" style="font-size: 0.75rem; padding: 0.2rem 0.5rem;" onclick="setAlmFilter('standalone')">Standalone (No Series)</button>
          </div>
          <label>Select Article to Attach *</label>
          <select id="alm-existing-select" size="6" style="width: 100%; font-family: 'JetBrains Mono', monospace; font-size: 0.82rem; height: 160px; padding: 0.45rem; background: #090d16; border: 1px solid var(--border); border-radius: 8px; color: var(--text);"></select>
          <div class="hint" id="alm-select-hint">Attaching will link this article to the syllabus and automatically sync its frontmatter.</div>
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label>Target Chapter / Section</label>
            <select id="alm-target-section"></select>
          </div>
          <div class="form-group">
            <label>Lesson Status</label>
            <select id="alm-existing-status">
              <option value="in-progress">⏳ In Progress</option>
              <option value="ready">🟢 Live / Ready</option>
              <option value="planned">🔒 Planned (Locked)</option>
              <option value="re-visiting">🔁 Re-visiting</option>
            </select>
          </div>
        </div>
        <button class="submit-btn" style="width: 100%; margin-top: 0.5rem;" onclick="handleAttachExistingToSection()">🚀 Attach & Save to Syllabus</button>
      </div>

      <div id="alm-pane-new" style="display: none;">
        <div class="form-group">
          <label>Lesson Title *</label>
          <input type="text" id="alm-new-title" placeholder="e.g. Distributed Consensus Basics" oninput="autoSlugAlm()">
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label>Article Slug *</label>
            <input type="text" id="alm-new-slug" placeholder="distributed-consensus-basics">
          </div>
          <div class="form-group">
            <label>Target Chapter / Section</label>
            <select id="alm-new-target-section"></select>
          </div>
        </div>
        <div class="form-group">
          <label>Format</label>
          <select id="alm-new-format">
            <option value="md">Markdown (.md)</option>
            <option value="mdx">MDX (.mdx)</option>
          </select>
        </div>
        <button class="submit-btn" style="width: 100%; margin-top: 0.5rem;" onclick="handleCreateNewLessonForSection()">🚀 Create & Attach Lesson</button>
      </div>
    </div>
  </div>

  <!-- Attach Any Article to Any Course Modal (Global) -->
  <div id="attach-article-modal" class="modal-backdrop">
    <div class="modal-box">
      <div class="modal-header">
        <h3 style="font-size: 1.2rem; font-weight: 800; color: #fff;">📎 Attach Article to Course</h3>
        <button class="icon-btn" onclick="closeAttachArticleModal()">✕</button>
      </div>
      <input type="hidden" id="aam-slug">
      <div style="background: var(--card-inner); border: 1px solid var(--border); border-radius: 8px; padding: 0.8rem 1rem; margin-bottom: 1.2rem;">
        <div style="font-weight: 700; color: #fff; font-size: 1rem;" id="aam-title-display">Article Title</div>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: var(--accent); margin-top: 0.2rem;" id="aam-slug-display">/articles/slug</div>
        <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.3rem;" id="aam-current-series-display">Currently: Standalone</div>
      </div>
      <div class="form-group">
        <label>Select Target Course Series *</label>
        <select id="aam-series-select" onchange="handleAamSeriesChange()"></select>
      </div>
      <div class="grid-2">
        <div class="form-group">
          <label>Target Chapter / Section</label>
          <select id="aam-section-select"></select>
        </div>
        <div class="form-group">
          <label>Status</label>
          <select id="aam-status-select">
            <option value="in-progress">⏳ In Progress</option>
            <option value="ready">🟢 Live / Ready</option>
            <option value="planned">🔒 Planned (Locked)</option>
            <option value="re-visiting">🔁 Re-visiting</option>
          </select>
        </div>
      </div>
      <button class="submit-btn" style="width: 100%; margin-top: 0.5rem;" onclick="handleSaveAamModal()">🚀 Attach Article to Course</button>
    </div>
  </div>

  <!-- Interview Question Modal -->
  <div id="interview-modal" class="modal-backdrop">
    <div class="modal-box">
      <div class="modal-header">
        <h3 id="iq-modal-title" style="font-size: 1.2rem; font-weight: 800; color: #fff;">💡 Interview Question</h3>
        <button class="icon-btn" onclick="closeInterviewModal()">✕</button>
      </div>
      <form onsubmit="handleSaveInterviewQuestion(event)">
        <input type="hidden" id="iq-field-topic">
        <input type="hidden" id="iq-field-id">
        <input type="hidden" id="iq-field-is-new">
        
        <div class="form-group">
          <label>Question Prompt *</label>
          <input type="text" id="iq-field-question" placeholder="e.g. 🔍 What is the Event Loop in Node.js?" required>
        </div>

        <div class="form-group">
          <label>Tags (comma separated)</label>
          <input type="text" id="iq-field-tags" placeholder="e.g. nodejs, event-loop, asynchronous">
        </div>

        <div class="form-group">
          <label>Answer (Each line becomes a bullet point) *</label>
          <textarea id="iq-field-answer" rows="5" placeholder="1️⃣ First key point...&#10;2️⃣ Second key point...&#10;3️⃣ Third key point..." required></textarea>
        </div>

        <div class="form-group">
          <label>Code Snippet (optional)</label>
          <textarea id="iq-field-code" rows="4" style="font-family: 'JetBrains Mono', monospace; font-size: 0.85rem;" placeholder="console.log('Start');&#10;setTimeout(() => console.log('Timeout'), 0);"></textarea>
        </div>

        <button type="submit" class="submit-btn">💾 Save Interview Question</button>
      </form>
    </div>
  </div>

  <!-- New Topic File Modal -->
  <div id="interview-topic-modal" class="modal-backdrop">
    <div class="modal-box">
      <div class="modal-header">
        <h3 style="font-size: 1.2rem; font-weight: 800; color: #fff;">➕ New Interview Topic File</h3>
        <button class="icon-btn" onclick="closeNewTopicModal()">✕</button>
      </div>
      <form onsubmit="handleCreateTopicFile(event)">
        <div class="form-group">
          <label>Topic Slug (e.g. python, react, docker) *</label>
          <input type="text" id="topic-new-name" placeholder="react" required>
          <div class="hint">Creates src/content/interview-questions/[slug].yaml</div>
        </div>
        <button type="submit" class="submit-btn">🚀 Create Topic</button>
      </form>
    </div>
  </div>

  <!-- Short Modal -->
  <div id="short-modal" class="modal-backdrop">
    <div class="modal-box">
      <div class="modal-header">
        <h3 id="short-modal-title" style="font-size: 1.2rem; font-weight: 800; color: #fff;">🎬 Short Video</h3>
        <button class="icon-btn" onclick="closeShortModal()">✕</button>
      </div>
      <form onsubmit="handleSaveShort(event)">
        <input type="hidden" id="short-field-original-slug">
        
        <div class="form-group">
          <label>Short Title *</label>
          <input type="text" id="short-field-title" placeholder="e.g. IAM Policies Explained in 60s" required oninput="autoSlugShort()">
        </div>

        <div class="grid-2">
          <div class="form-group">
            <label>Slug *</label>
            <input type="text" id="short-field-slug" placeholder="iam-policies-explained" required>
          </div>
          <div class="form-group">
            <label>Order Number</label>
            <input type="number" id="short-field-order" value="1">
          </div>
        </div>

        <div class="grid-2">
          <div class="form-group">
            <label>Series Folder (e.g. oci-shorts) *</label>
            <input type="text" id="short-field-series" placeholder="oci-shorts" required>
          </div>
          <div class="form-group">
            <label>Series Display Name *</label>
            <input type="text" id="short-field-series-name" placeholder="Oracle Cloud" required>
          </div>
        </div>

        <div class="form-group">
          <label>YouTube Video ID *</label>
          <input type="text" id="short-field-ytid" placeholder="e.g. LbeV3TwK48s" required oninput="previewShortYoutubeThumbnail()">
          <div class="hint">The 11-character ID from https://youtube.com/shorts/[ID]</div>
        </div>

        <div id="short-yt-preview" style="display: none; margin-bottom: 1.2rem; text-align: center;">
          <img id="short-yt-thumb" style="max-height: 140px; border-radius: 8px; border: 1px solid var(--border);">
        </div>

        <button type="submit" class="submit-btn">💾 Save Short Video</button>
      </form>
    </div>
  </div>

  <script>
    let allSeries = [];
    let allArticles = [];
    let allInterviewTopics = [];
    let allShorts = [];
    let currentRoadmapData = {};
    let currentSyllabus = null;
    let currentPurpose = 'lesson';
    let currentArticleData = null;

    function switchTab(tab) {
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab || btn.id === 'tab-btn-' + tab);
      });
      document.querySelectorAll('.tab-panel').forEach(p => {
        p.classList.toggle('active', p.id === 'panel-' + tab);
      });
      hideToast();

      if (tab === 'series-cards') renderSeriesCards();
      if (tab === 'roadmap-order') loadRoadmapData();
      if (tab === 'syllabus') loadCourseSyllabus();
      if (tab === 'explorer') loadArticlesExplorer();
      if (tab === 'interview-bytes') loadInterviewTopics();
      if (tab === 'shorts') loadShortsStudio();
      if (tab === 'images') loadImagesStudio();
    }

    function setPurpose(purpose) {
      currentPurpose = purpose;
      document.querySelectorAll('.purpose-card').forEach(c => c.classList.remove('active'));
      document.getElementById('purpose-' + purpose).classList.add('active');

      const seriesGroup = document.getElementById('group-series');
      const sectionGroup = document.getElementById('group-art-section');
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
        if (sectionGroup) sectionGroup.style.display = 'none';
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

    let toastTimer = null;
    function showToast(msg, isError = false) {
      const t = document.getElementById('toast');
      if (!t) return;
      t.className = isError ? 'error' : 'success';
      t.textContent = msg;
      t.style.display = 'block';
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        hideToast();
      }, 4000);
    }

    function hideToast() {
      const t = document.getElementById('toast');
      if (t) t.style.display = 'none';
      if (toastTimer) {
        clearTimeout(toastTimer);
        toastTimer = null;
      }
    }

    function escapeHtml(str) {
      if (str === null || str === undefined) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
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
      const seriesSelect = document.getElementById('art-series');
      const seriesId = currentPurpose === 'lesson' && seriesSelect ? seriesSelect.value : null;
      const baseSlug = slugify(title);
      if (seriesId && baseSlug) {
        const prefix = slugify(seriesId) + '-';
        document.getElementById('art-slug').value = baseSlug.startsWith(prefix) ? baseSlug : (prefix + baseSlug);
      } else {
        document.getElementById('art-slug').value = baseSlug;
      }
    }

    function autoSlugAlm() {
      const title = document.getElementById('alm-new-title').value;
      const prefix = (currentSyllabus && currentSyllabus.id) ? (slugify(currentSyllabus.id) + '-') : '';
      const baseSlug = slugify(title);
      if (prefix && baseSlug) {
        document.getElementById('alm-new-slug').value = baseSlug.startsWith(prefix) ? baseSlug : (prefix + baseSlug);
      } else {
        document.getElementById('alm-new-slug').value = baseSlug;
      }
    }

    function autoSlugShort() {
      const title = document.getElementById('short-field-title').value;
      document.getElementById('short-field-slug').value = slugify(title);
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
        document.getElementById('stat-interview').textContent = data.stats.totalInterviewQuestions || 0;
        document.getElementById('stat-shorts').textContent = data.stats.totalShorts || 0;
        const imgStatEl = document.getElementById('stat-images');
        if (imgStatEl) imgStatEl.textContent = data.stats.totalImages || 0;

        try {
          const artRes = await fetch('/api/articles');
          if (artRes.ok) allArticles = await artRes.json();
        } catch (e) {}

        const artSelect = document.getElementById('art-series');
        const sylSelect = document.getElementById('syl-series-select');
        const edSeriesSelect = document.getElementById('ed-series');
        
        const prevSylVal = sylSelect ? (sylSelect.value || currentSyllabus?.id || '') : '';

        artSelect.innerHTML = '<option value="">-- Select Series --</option>';
        sylSelect.innerHTML = '';
        edSeriesSelect.innerHTML = '<option value="">[None - Standalone Project]</option>';

        allSeries.forEach(s => {
          const opt1 = document.createElement('option');
          opt1.value = s.id;
          opt1.textContent = s.title + ' [' + s.id + '] (' + s.category + ')';
          artSelect.appendChild(opt1);

          const opt2 = document.createElement('option');
          opt2.value = s.id;
          opt2.textContent = s.title + ' [' + s.id + ']';
          sylSelect.appendChild(opt2);

          const opt3 = document.createElement('option');
          opt3.value = s.id;
          opt3.textContent = s.title + ' (' + s.category + ')';
          edSeriesSelect.appendChild(opt3);
        });

        if (prevSylVal && allSeries.some(s => s.id === prevSylVal)) {
          sylSelect.value = prevSylVal;
        }

        handleSeriesSelectionChange();
        renderSeriesCards();
      } catch (err) {
        console.error('Failed to load status', err);
      }
    }

    /**
     * 1. Course Series Cards
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
              <span class="hint">• 📚 \${s.resourceCount || 0} resources</span>
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
              <button class="btn-secondary" onclick="jumpToSyllabus('\${s.id}')">📖 Syllabus & Lessons</button>
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

      document.getElementById('modal-series-old-id').value = s.id;
      document.getElementById('modal-series-id').value = s.id;
      document.getElementById('modal-series-title').value = s.title;
      document.getElementById('modal-series-subtitle').value = s.subtitle || '';
      document.getElementById('modal-series-desc').value = s.description || '';
      document.getElementById('modal-series-time').value = s.time || '';
      document.getElementById('modal-series-weight').value = s.weight ?? 100;
      document.getElementById('modal-series-status').value = s.status || '';
      document.getElementById('modal-series-category').value = s.category || 'Development';
      document.getElementById('modal-series-image').value = s.image || '';
      document.getElementById('modal-series-ongoing').checked = Boolean(s.ongoing);

      document.getElementById('edit-series-modal').style.display = 'flex';
    }

    function closeEditModal() {
      document.getElementById('edit-series-modal').style.display = 'none';
    }

    async function handleSaveSeriesModal(e) {
      e.preventDefault();
      hideToast();
      const oldId = document.getElementById('modal-series-old-id').value;
      const newId = document.getElementById('modal-series-id').value.trim().toLowerCase();
      const metadata = {
        title: document.getElementById('modal-series-title').value,
        subtitle: document.getElementById('modal-series-subtitle').value,
        description: document.getElementById('modal-series-desc').value,
        category: document.getElementById('modal-series-category').value,
        image: document.getElementById('modal-series-image').value,
        time: document.getElementById('modal-series-time').value,
        weight: Number(document.getElementById('modal-series-weight').value),
        status: document.getElementById('modal-series-status').value,
        ongoing: document.getElementById('modal-series-ongoing').checked,
      };

      if (newId !== oldId) {
        if (!confirm('Rename course file from "' + oldId + '.json" to "' + newId + '.json"?\\n\\nThis will automatically update series references across all related articles and the roadmap sequence.')) {
          return;
        }
      }

      try {
        const res = await fetch('/api/series/rename', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ oldId, newId, metadata })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        closeEditModal();
        showToast('✅ ' + (data.message || 'Saved course changes.'));
        await refreshStatus();
        await loadRoadmapData();
      } catch (err) {
        showToast('❌ ' + err.message, true);
      }
    }

    async function handleDeleteSeriesModal() {
      const seriesId = document.getElementById('modal-series-old-id').value || document.getElementById('modal-series-id').value;
      if (!confirm('Are you sure you want to delete course "' + seriesId + '"? This will delete the series JSON file and remove it from roadmapOrder.json.')) return;
      hideToast();
      try {
        const res = await fetch('/api/series/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ seriesId })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        closeEditModal();
        showToast('🗑️ Course "' + seriesId + '" deleted.');
        await refreshStatus();
        await loadRoadmapData();
      } catch (err) {
        showToast('❌ ' + err.message, true);
      }
    }

    function handleSeriesSelectionChange() {
      const sectionGroup = document.getElementById('group-art-section');
      const sectionSelect = document.getElementById('art-section-select');

      if (currentPurpose !== 'lesson') {
        if (sectionGroup) sectionGroup.style.display = 'none';
        return;
      }

      const selectedId = document.getElementById('art-series').value;
      const categorySelect = document.getElementById('art-category');
      const categoryHint = document.getElementById('art-category-hint');

      autoSlugArticle();

      if (!selectedId) {
        categorySelect.disabled = false;
        categoryHint.textContent = 'Please choose a course series to auto-bind category.';
        categoryHint.style.color = 'var(--text-muted)';
        if (sectionGroup) sectionGroup.style.display = 'none';
        return;
      }

      const seriesObj = allSeries.find(s => s.id === selectedId);
      if (seriesObj && seriesObj.category) {
        categorySelect.value = seriesObj.category;
        categorySelect.disabled = true;
        categoryHint.innerHTML = '🔒 <strong>Locked to Course Track:</strong> Category is automatically synchronized to <em>' + seriesObj.category + '</em>.';
        categoryHint.style.color = '#38bdf8';
      }

      if (sectionGroup && sectionSelect) {
        sectionGroup.style.display = 'block';
        sectionSelect.innerHTML = '<option value="0">Loading chapters...</option>';
        fetch('/api/series/' + selectedId)
          .then(res => res.json())
          .then(sData => {
            sectionSelect.innerHTML = '';
            if (sData && Array.isArray(sData.navbar) && sData.navbar.length > 0) {
              sData.navbar.forEach((sec, idx) => {
                const opt = document.createElement('option');
                opt.value = idx;
                opt.textContent = (idx + 1) + '. ' + (sec.subheading || 'Chapter ' + (idx + 1));
                sectionSelect.appendChild(opt);
              });
            } else {
              sectionSelect.innerHTML = '<option value="0">1. Lessons</option>';
            }
          })
          .catch(() => {
            sectionSelect.innerHTML = '<option value="0">1. Lessons (Default)</option>';
          });
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
        showToast('✅ Series created successfully!');
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
      const slug = document.getElementById('art-slug').value;
      const sectionIndex = currentPurpose === 'lesson'
        ? Number(document.getElementById('art-section-select')?.value || 0)
        : 0;

      const payload = {
        title: document.getElementById('art-title').value,
        slug,
        seriesId,
        categories: [category],
        subtitle: document.getElementById('art-subtitle').value,
        description: document.getElementById('art-desc').value,
        isMdx: document.getElementById('art-format').value === 'mdx',
        addToNavbar: currentPurpose === 'lesson' && document.getElementById('art-navbar').checked,
        sectionIndex,
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
        showToast('✅ ' + (currentPurpose === 'project' ? 'Project' : 'Article') + ' created! Click "Edit Markdown" below to start writing.');
        await refreshStatus();
        openArticleEditor(data.slug || slug);
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
        if (!Array.isArray(currentSyllabus.resources)) {
          currentSyllabus.resources = [];
        }

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

        if (currentSyllabus.unassignedArticles && currentSyllabus.unassignedArticles.length > 0) {
          unassignedContainer.innerHTML = \`
            <div class="alert-banner">
              <h4>⚠️ Found \${currentSyllabus.unassignedArticles.length} Unassigned Article(s) on Disk for this Course</h4>
              <p class="hint" style="color: #cbd5e1; margin-bottom: 0.8rem;">These files have <code>series: "\${currentSyllabus.id}"</code> in frontmatter but are not yet linked in the syllabus navbar.</p>
              <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                \${currentSyllabus.unassignedArticles.map(a => \`
                  <div style="display: flex; justify-content: space-between; align-items: center; background: #1a2234; padding: 0.6rem 0.9rem; border-radius: 8px;">
                    <div>
                      <strong>\${a.title}</strong>
                      <span style="font-family: monospace; font-size: 0.78rem; color: var(--text-muted); margin-left: 0.5rem;">/articles/\${a.slug}</span>
                    </div>
                    <div style="display: flex; gap: 0.4rem;">
                      <button class="btn-secondary" onclick="openArticleEditor('\${a.slug}')">✏️ Edit</button>
                      <button class="btn-secondary" onclick="attachUnassignedArticle('\${a.slug}', '\${a.title.replace(/'/g, "\\\\'")}')">+ Add to Syllabus</button>
                    </div>
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

    function syncSyllabusFromDOM() {
      if (!currentSyllabus) return;
      if (Array.isArray(currentSyllabus.navbar)) {
        document.querySelectorAll('.syl-section-subheading').forEach(input => {
          const sIdx = Number(input.dataset.sIdx);
          if (currentSyllabus.navbar[sIdx]) {
            currentSyllabus.navbar[sIdx].subheading = input.value;
          }
        });
        document.querySelectorAll('.syl-lesson-title').forEach(input => {
          const sIdx = Number(input.dataset.sIdx);
          const lIdx = Number(input.dataset.lIdx);
          if (currentSyllabus.navbar[sIdx]?.link?.[lIdx]) {
            currentSyllabus.navbar[sIdx].link[lIdx].title = input.value;
          }
        });
      }
      if (Array.isArray(currentSyllabus.resources)) {
        document.querySelectorAll('.syl-resource-title').forEach(input => {
          const rIdx = Number(input.dataset.rIdx);
          if (currentSyllabus.resources[rIdx]) currentSyllabus.resources[rIdx].title = input.value;
        });
        document.querySelectorAll('.syl-resource-url').forEach(input => {
          const rIdx = Number(input.dataset.rIdx);
          if (currentSyllabus.resources[rIdx]) currentSyllabus.resources[rIdx].url = input.value;
        });
        document.querySelectorAll('.syl-resource-desc').forEach(input => {
          const rIdx = Number(input.dataset.rIdx);
          if (currentSyllabus.resources[rIdx]) currentSyllabus.resources[rIdx].description = input.value;
        });
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
            <input type="text"
              class="syl-section-subheading"
              data-s-idx="\${sIdx}"
              value="\${escapeHtml(section.subheading)}"
              oninput="if(currentSyllabus?.navbar?.[\${sIdx}]) currentSyllabus.navbar[\${sIdx}].subheading = this.value"
              onchange="if(currentSyllabus?.navbar?.[\${sIdx}]) currentSyllabus.navbar[\${sIdx}].subheading = this.value"
              placeholder="Chapter Subheading (e.g. 1. Foundations & Concepts)"
              style="font-size: 1.1rem; font-weight: 700; width: 55%; background: #111827;">
            <div style="display: flex; gap: 0.4rem; align-items: center;">
              <button class="icon-btn" onclick="moveSection(\${sIdx}, -1)" \${sIdx === 0 ? 'disabled' : ''} title="Move chapter up">▲</button>
              <button class="icon-btn" onclick="moveSection(\${sIdx}, 1)" \${sIdx === currentSyllabus.navbar.length - 1 ? 'disabled' : ''} title="Move chapter down">▼</button>
              <button class="btn-secondary" onclick="openAddLessonModal(\${sIdx})">+ Add Lesson</button>
              <button class="icon-btn" style="color: var(--error);" onclick="removeSection(\${sIdx})" title="Delete chapter">✕</button>
            </div>
          </div>
          <div class="reorder-list" id="syl-sec-\${sIdx}"></div>
        \`;

        const listEl = secDiv.querySelector(\`#syl-sec-\${sIdx}\`);
        section.link.forEach((link, lIdx) => {
          const item = document.createElement('div');
          item.className = 'reorder-item';
          const currentStatus = link.status || '';

          item.innerHTML = \`
            <div class="reorder-left">
              <span class="reorder-index">#\${lIdx + 1}</span>
              <div style="flex: 1;">
                <input type="text"
                  class="syl-lesson-title"
                  data-s-idx="\${sIdx}"
                  data-l-idx="\${lIdx}"
                  value="\${escapeHtml(link.title)}"
                  oninput="if(currentSyllabus?.navbar?.[\${sIdx}]?.link?.[\${lIdx}]) currentSyllabus.navbar[\${sIdx}].link[\${lIdx}].title = this.value"
                  onchange="if(currentSyllabus?.navbar?.[\${sIdx}]?.link?.[\${lIdx}]) currentSyllabus.navbar[\${sIdx}].link[\${lIdx}].title = this.value"
                  placeholder="Lesson Title"
                  style="background: transparent; border: none; font-weight: 700; font-size: 0.95rem; color: #fff; padding: 0; width: 100%;">
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
              <button class="btn-secondary" style="padding: 0.35rem 0.65rem; font-size: 0.78rem;" onclick="openArticleEditor('\${link.url}')">✏️ Edit</button>
              <button class="icon-btn" onclick="moveSyllabusLesson(\${sIdx}, \${lIdx}, -1)" \${lIdx === 0 ? 'disabled' : ''} title="Move up">▲</button>
              <button class="icon-btn" onclick="moveSyllabusLesson(\${sIdx}, \${lIdx}, 1)" \${lIdx === section.link.length - 1 ? 'disabled' : ''} title="Move down">▼</button>
              <button class="icon-btn" style="color: var(--error);" onclick="removeSyllabusLesson(\${sIdx}, \${lIdx})" title="Unlink lesson">✕</button>
              <a href="/articles/\${link.url}" target="_blank" class="icon-btn" title="View live lesson" style="text-decoration: none;">↗</a>
            </div>
          \`;
          listEl.appendChild(item);
        });

        container.appendChild(secDiv);
      });

      // Resources Section
      const resSec = document.createElement('div');
      resSec.className = 'resources-editor-box';
      resSec.style.cssText = 'margin-top: 2rem; background: var(--card-inner); border: 1px solid var(--border); border-radius: 12px; padding: 1.25rem;';
      
      const resources = currentSyllabus.resources || [];
      
      resSec.innerHTML = \`
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; flex-wrap: wrap; gap: 0.8rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.25rem;">📚</span>
              <h4 style="font-size: 1.15rem; font-weight: 800; color: #fff;">Further Learnings & Resources</h4>
              <span class="badge-local" style="font-size: 0.68rem; padding: 0.2rem 0.6rem; color: #fb7299; border-color: rgba(251,114,153,0.3); background: rgba(251,114,153,0.1);">Course Page Only</span>
            </div>
            <p class="hint" style="margin-top: 0.3rem; font-size: 0.82rem;">Special section displayed only on the individual course page (/courses/\${currentSyllabus.id}). Excluded from roadmaps and lesson progress tracking.</p>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn-secondary" onclick="addResourceItem()">+ Add Resource</button>
            <button class="btn-secondary" onclick="saveCourseResources()">💾 Save Resources Only</button>
          </div>
        </div>
        <div id="syl-resources-list" style="display: flex; flex-direction: column; gap: 0.75rem;"></div>
      \`;

      const resListEl = resSec.querySelector('#syl-resources-list');
      if (resources.length === 0) {
        resListEl.innerHTML = \`
          <div style="text-align: center; padding: 1.5rem; color: var(--text-muted); font-size: 0.85rem; border: 1px dashed var(--border); border-radius: 8px;">
            No supplementary resources yet. Click "+ Add Resource" to recommend external courses, official docs, books, or handwritten notes.
          </div>
        \`;
      } else {
        resources.forEach((resItem, rIdx) => {
          const item = document.createElement('div');
          item.className = 'reorder-item';
          item.style.flexDirection = 'column';
          item.style.alignItems = 'stretch';
          item.style.gap = '0.5rem';

          item.innerHTML = \`
            <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
              <div style="display: flex; align-items: center; gap: 0.6rem; flex: 1; min-width: 280px;">
                <span class="reorder-index">#\${rIdx + 1}</span>
                <input type="text"
                  class="syl-resource-title"
                  data-r-idx="\${rIdx}"
                  placeholder="Resource Title (e.g. Stanford Lectures / Book / Notes)"
                  value="\${escapeHtml(resItem.title || '')}"
                  oninput="if(currentSyllabus?.resources?.[\${rIdx}]) currentSyllabus.resources[\${rIdx}].title = this.value"
                  onchange="if(currentSyllabus?.resources?.[\${rIdx}]) currentSyllabus.resources[\${rIdx}].title = this.value"
                  style="font-weight: 700; font-size: 0.9rem; flex: 1; background: #111827;">
              </div>
              <div style="display: flex; align-items: center; gap: 0.4rem;">
                <button class="icon-btn" onclick="moveResourceItem(\${rIdx}, -1)" \${rIdx === 0 ? 'disabled' : ''} title="Move up">▲</button>
                <button class="icon-btn" onclick="moveResourceItem(\${rIdx}, 1)" \${rIdx === resources.length - 1 ? 'disabled' : ''} title="Move down">▼</button>
                <button class="icon-btn" style="color: var(--error);" onclick="removeResourceItem(\${rIdx})" title="Delete resource">✕</button>
                <a href="\${resItem.url}" target="_blank" class="icon-btn" title="Open resource link" style="text-decoration: none;">↗</a>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 2fr 3fr; gap: 0.6rem;">
              <input type="text"
                class="syl-resource-url"
                data-r-idx="\${rIdx}"
                placeholder="URL (e.g. https://... or /articles/slug)"
                value="\${escapeHtml(resItem.url || '')}"
                oninput="if(currentSyllabus?.resources?.[\${rIdx}]) currentSyllabus.resources[\${rIdx}].url = this.value"
                onchange="if(currentSyllabus?.resources?.[\${rIdx}]) currentSyllabus.resources[\${rIdx}].url = this.value"
                style="font-family: monospace; font-size: 0.82rem; background: #111827;">
              <input type="text"
                class="syl-resource-desc"
                data-r-idx="\${rIdx}"
                placeholder="Optional brief note/caption..."
                value="\${escapeHtml(resItem.description || '')}"
                oninput="if(currentSyllabus?.resources?.[\${rIdx}]) currentSyllabus.resources[\${rIdx}].description = this.value"
                onchange="if(currentSyllabus?.resources?.[\${rIdx}]) currentSyllabus.resources[\${rIdx}].description = this.value"
                style="font-size: 0.82rem; color: var(--text-muted); background: #111827;">
            </div>
          \`;
          resListEl.appendChild(item);
        });
      }

      container.appendChild(resSec);

      const footer = document.createElement('div');
      footer.style.display = 'flex';
      footer.style.gap = '1rem';
      footer.style.marginTop = '1.5rem';
      footer.innerHTML = \`
        <button class="btn-secondary" onclick="addSyllabusSection()">+ Add Chapter Section</button>
        <button class="btn-secondary" onclick="addResourceItem()">+ Add Resource Link</button>
        <button class="submit-btn" style="margin: 0; flex: 1;" onclick="saveCourseSyllabus()">💾 Save Course Syllabus & Resources</button>
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
      syncSyllabusFromDOM();
      const target = sIdx + delta;
      if (target < 0 || target >= currentSyllabus.navbar.length) return;
      const temp = currentSyllabus.navbar[sIdx];
      currentSyllabus.navbar[sIdx] = currentSyllabus.navbar[target];
      currentSyllabus.navbar[target] = temp;
      renderSyllabusEditor();
    }

    function removeSection(sIdx) {
      syncSyllabusFromDOM();
      if (!confirm('Delete this chapter section and its lesson links from syllabus?')) return;
      currentSyllabus.navbar.splice(sIdx, 1);
      renderSyllabusEditor();
    }

    function moveSyllabusLesson(sIdx, lIdx, delta) {
      syncSyllabusFromDOM();
      const links = currentSyllabus.navbar[sIdx].link;
      const target = lIdx + delta;
      if (target < 0 || target >= links.length) return;
      const temp = links[lIdx];
      links[lIdx] = links[target];
      links[target] = temp;
      renderSyllabusEditor();
    }

    function removeSyllabusLesson(sIdx, lIdx) {
      syncSyllabusFromDOM();
      currentSyllabus.navbar[sIdx].link.splice(lIdx, 1);
      renderSyllabusEditor();
    }

    let currentAlmFilter = 'all';
    let almArticlesList = [];

    async function openAddLessonModal(sIdx) {
      syncSyllabusFromDOM();
      sIdx = Number(sIdx || 0);
      document.getElementById('alm-section-index').value = sIdx;
      setAddLessonMode('existing');

      if (!allArticles || allArticles.length === 0) {
        try {
          const artRes = await fetch('/api/articles');
          if (artRes.ok) allArticles = await artRes.json();
        } catch (e) {
          console.error('Failed to load articles for modal', e);
        }
      }

      // Populate target section dropdowns
      const targetSec = document.getElementById('alm-target-section');
      const newTargetSec = document.getElementById('alm-new-target-section');
      targetSec.innerHTML = '';
      newTargetSec.innerHTML = '';
      if (currentSyllabus && Array.isArray(currentSyllabus.navbar)) {
        currentSyllabus.navbar.forEach((sec, idx) => {
          const opt1 = document.createElement('option');
          opt1.value = idx;
          opt1.textContent = (idx + 1) + '. ' + (sec.subheading || 'Section ' + (idx + 1));
          if (idx === sIdx) opt1.selected = true;
          targetSec.appendChild(opt1);

          const opt2 = document.createElement('option');
          opt2.value = idx;
          opt2.textContent = (idx + 1) + '. ' + (sec.subheading || 'Section ' + (idx + 1));
          if (idx === sIdx) opt2.selected = true;
          newTargetSec.appendChild(opt2);
        });
      }

      // Collect slugs already present in this course navbar
      const inNavbarSlugs = new Set();
      if (currentSyllabus && Array.isArray(currentSyllabus.navbar)) {
        currentSyllabus.navbar.forEach(sec => {
          (sec.link || []).forEach(l => {
            if (l.type === 'articles') inNavbarSlugs.add(l.url);
          });
        });
      }

      // Filter all articles to those not already in navbar
      almArticlesList = (allArticles || []).filter(a => !inNavbarSlugs.has(a.slug));
      document.getElementById('alm-search-input').value = '';
      currentAlmFilter = (currentSyllabus.unassignedArticles && currentSyllabus.unassignedArticles.length > 0) ? 'unassigned' : 'all';
      setAlmFilter(currentAlmFilter);

      document.getElementById('alm-new-title').value = '';
      document.getElementById('alm-new-slug').value = '';
      document.getElementById('add-lesson-modal').style.display = 'flex';
    }

    function closeAddLessonModal() {
      document.getElementById('add-lesson-modal').style.display = 'none';
    }

    function setAddLessonMode(mode) {
      const tabEx = document.getElementById('alm-tab-existing');
      const tabNew = document.getElementById('alm-tab-new');
      const paneEx = document.getElementById('alm-pane-existing');
      const paneNew = document.getElementById('alm-pane-new');

      if (mode === 'existing') {
        tabEx.style.background = 'var(--card-inner)';
        tabEx.style.color = '#fff';
        tabNew.style.background = 'transparent';
        tabNew.style.color = 'var(--text-muted)';
        paneEx.style.display = 'block';
        paneNew.style.display = 'none';
      } else {
        tabNew.style.background = 'var(--card-inner)';
        tabNew.style.color = '#fff';
        tabEx.style.background = 'transparent';
        tabEx.style.color = 'var(--text-muted)';
        paneNew.style.display = 'block';
        paneEx.style.display = 'none';
      }
    }

    function setAlmFilter(filter) {
      currentAlmFilter = filter;
      const btnAll = document.getElementById('alm-filter-all');
      const btnUn = document.getElementById('alm-filter-unassigned');
      const btnSt = document.getElementById('alm-filter-standalone');

      if (btnAll) {
        btnAll.style.background = filter === 'all' ? 'var(--card-inner)' : 'transparent';
        btnAll.style.color = filter === 'all' ? 'var(--accent)' : 'var(--text-muted)';
      }
      if (btnUn) {
        btnUn.style.background = filter === 'unassigned' ? 'var(--card-inner)' : 'transparent';
        btnUn.style.color = filter === 'unassigned' ? 'var(--accent)' : 'var(--text-muted)';
      }
      if (btnSt) {
        btnSt.style.background = filter === 'standalone' ? 'var(--card-inner)' : 'transparent';
        btnSt.style.color = filter === 'standalone' ? 'var(--accent)' : 'var(--text-muted)';
      }
      renderAlmArticles();
    }

    function filterAlmArticles() {
      renderAlmArticles();
    }

    function renderAlmArticles() {
      const q = (document.getElementById('alm-search-input').value || '').toLowerCase().trim();
      const existingSelect = document.getElementById('alm-existing-select');
      existingSelect.innerHTML = '';

      const filtered = almArticlesList.filter(a => {
        if (currentAlmFilter === 'unassigned' && a.series !== currentSyllabus.id) return false;
        if (currentAlmFilter === 'standalone' && !!a.series) return false;
        if (q) {
          const matchTitle = (a.title || '').toLowerCase().includes(q);
          const matchSlug = (a.slug || '').toLowerCase().includes(q);
          if (!matchTitle && !matchSlug) return false;
        }
        return true;
      });

      if (filtered.length === 0) {
        existingSelect.innerHTML = '<option value="" disabled>No articles found matching filter/search</option>';
        return;
      }

      filtered.forEach((a, idx) => {
        const opt = document.createElement('option');
        opt.value = a.slug;
        let prefix = '';
        if (a.series === currentSyllabus.id) {
          prefix = '⭐ [Unassigned for this Course] ';
        } else if (!a.series) {
          prefix = '📄 [Standalone] ';
        } else {
          prefix = '🔄 [In: ' + a.series + '] ';
        }
        opt.textContent = prefix + a.title + ' (' + a.slug + ')';
        if (idx === 0) opt.selected = true;
        existingSelect.appendChild(opt);
      });
    }

    async function handleAttachExistingToSection() {
      const sIdx = Number(document.getElementById('alm-target-section').value || document.getElementById('alm-section-index').value || 0);
      const slug = document.getElementById('alm-existing-select').value;
      const status = document.getElementById('alm-existing-status').value || 'in-progress';
      if (!slug) return showToast('❌ Please select an article to attach.', true);

      hideToast();
      try {
        const res = await fetch('/api/series/attach-article', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            seriesId: currentSyllabus.id,
            articleSlug: slug,
            sectionIndex: sIdx,
            status
          })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        closeAddLessonModal();
        showToast('✅ ' + data.message);
        await refreshStatus();
        await loadCourseSyllabus();
      } catch (err) {
        showToast('❌ ' + err.message, true);
      }
    }

    async function handleCreateNewLessonForSection() {
      const sIdx = Number(document.getElementById('alm-new-target-section').value || document.getElementById('alm-section-index').value || 0);
      const title = document.getElementById('alm-new-title').value.trim();
      const rawSlug = document.getElementById('alm-new-slug').value.trim() || slugify(title);
      const prefix = (currentSyllabus && currentSyllabus.id) ? (slugify(currentSyllabus.id) + '-') : '';
      const slug = (prefix && !rawSlug.startsWith(prefix)) ? (prefix + rawSlug) : rawSlug;
      const format = document.getElementById('alm-new-format').value;

      if (!title) return showToast('❌ Lesson title is required.', true);

      hideToast();
      try {
        const payload = {
          title,
          slug,
          seriesId: currentSyllabus.id,
          categories: [currentSyllabus.category],
          isMdx: format === 'mdx',
          addToNavbar: true,
          sectionIndex: sIdx,
          contentType: 'lesson'
        };
        const res = await fetch('/api/create-article', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        closeAddLessonModal();
        showToast('✅ Created lesson and attached to syllabus!');
        await refreshStatus();
        await loadCourseSyllabus();
        openArticleEditor(data.slug || slug);
      } catch (err) {
        showToast('❌ ' + err.message, true);
      }
    }

    async function attachUnassignedArticle(slug, title) {
      hideToast();
      try {
        const res = await fetch('/api/series/attach-article', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            seriesId: currentSyllabus.id,
            articleSlug: slug,
            sectionIndex: 0,
            title
          })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        showToast('✅ Attached "' + title + '" to syllabus.');
        await refreshStatus();
        await loadCourseSyllabus();
      } catch (err) {
        showToast('❌ ' + err.message, true);
      }
    }

    function openAttachArticleModal(slug, title, currentSeries) {
      document.getElementById('aam-slug').value = slug;
      document.getElementById('aam-title-display').textContent = title;
      document.getElementById('aam-slug-display').textContent = '/articles/' + slug;
      document.getElementById('aam-current-series-display').textContent = currentSeries ? 'Currently in course: ' + currentSeries : 'Currently: Standalone (No Course)';

      const seriesSelect = document.getElementById('aam-series-select');
      seriesSelect.innerHTML = '<option value="">-- Choose Course --</option>';
      allSeries.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.id;
        opt.textContent = s.title + ' [' + s.id + '] (' + s.category + ')';
        if (s.id === currentSeries) opt.selected = true;
        seriesSelect.appendChild(opt);
      });

      handleAamSeriesChange();
      document.getElementById('attach-article-modal').style.display = 'flex';
    }

    function closeAttachArticleModal() {
      document.getElementById('attach-article-modal').style.display = 'none';
    }

    async function handleAamSeriesChange() {
      const seriesId = document.getElementById('aam-series-select').value;
      const secSelect = document.getElementById('aam-section-select');
      secSelect.innerHTML = '';
      if (!seriesId) {
        secSelect.innerHTML = '<option value="0">1. Lessons</option>';
        return;
      }
      try {
        const res = await fetch('/api/series/' + seriesId);
        const data = await res.json();
        if (Array.isArray(data.navbar) && data.navbar.length > 0) {
          data.navbar.forEach((sec, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.textContent = (idx + 1) + '. ' + (sec.subheading || 'Section ' + (idx + 1));
            secSelect.appendChild(opt);
          });
        } else {
          secSelect.innerHTML = '<option value="0">1. Lessons</option>';
        }
      } catch (e) {
        secSelect.innerHTML = '<option value="0">1. Lessons</option>';
      }
    }

    async function handleSaveAamModal() {
      const slug = document.getElementById('aam-slug').value;
      const seriesId = document.getElementById('aam-series-select').value;
      const sectionIndex = Number(document.getElementById('aam-section-select').value || 0);
      const status = document.getElementById('aam-status-select').value || 'in-progress';

      if (!seriesId) return showToast('❌ Please select a course series.', true);

      hideToast();
      try {
        const res = await fetch('/api/series/attach-article', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            seriesId,
            articleSlug: slug,
            sectionIndex,
            status
          })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        closeAttachArticleModal();
        showToast('✅ ' + data.message);
        await refreshStatus();
        await loadArticlesExplorer();
      } catch (err) {
        showToast('❌ ' + err.message, true);
      }
    }

    function addSyllabusSection() {
      syncSyllabusFromDOM();
      const title = prompt('Chapter / Section Subheading:');
      if (!title) return;
      currentSyllabus.navbar.push({ subheading: title, link: [] });
      renderSyllabusEditor();
    }

    function addResourceItem() {
      syncSyllabusFromDOM();
      if (!currentSyllabus.resources) currentSyllabus.resources = [];
      const title = prompt('Resource Title (e.g. "Alex Aiken - Stanford lectures" or "MIT 6.824"):');
      if (!title) return;
      const url = prompt('Resource URL (e.g. https://youtube.com/... or /articles/os-handwritten-notes):');
      if (!url) return;
      const desc = prompt('Optional description (or leave empty):', '') || '';
      currentSyllabus.resources.push({
        title,
        url,
        description: desc
      });
      renderSyllabusEditor();
    }

    function removeResourceItem(rIdx) {
      syncSyllabusFromDOM();
      if (!confirm('Remove this resource?')) return;
      currentSyllabus.resources.splice(rIdx, 1);
      renderSyllabusEditor();
    }

    function moveResourceItem(rIdx, delta) {
      syncSyllabusFromDOM();
      const target = rIdx + delta;
      if (target < 0 || target >= currentSyllabus.resources.length) return;
      const temp = currentSyllabus.resources[rIdx];
      currentSyllabus.resources[rIdx] = currentSyllabus.resources[target];
      currentSyllabus.resources[target] = temp;
      renderSyllabusEditor();
    }

    async function saveCourseResources() {
      hideToast();
      syncSyllabusFromDOM();
      const seriesId = document.getElementById('syl-series-select').value;
      try {
        const res = await fetch('/api/save-resources', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ seriesId, resources: currentSyllabus.resources || [] })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        showToast('✅ ' + data.message);
        const s = allSeries.find(item => item.id === seriesId);
        if (s) s.resourceCount = (currentSyllabus.resources || []).length;
        renderSeriesCards();
      } catch (err) {
        showToast('❌ Failed to save resources: ' + err.message, true);
      }
    }

    async function saveCourseSyllabus() {
      hideToast();
      syncSyllabusFromDOM();
      const seriesId = document.getElementById('syl-series-select').value;
      if (!seriesId) return showToast('❌ No course selected.', true);

      try {
        const res = await fetch('/api/save-syllabus', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            seriesId,
            navbar: currentSyllabus.navbar,
            resources: currentSyllabus.resources || []
          })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        showToast('✅ ' + data.message);
        const s = allSeries.find(item => item.id === seriesId);
        if (s) {
          s.lessonCount = currentSyllabus.navbar.reduce((acc, sec) => acc + (sec.link ? sec.link.length : 0), 0);
          s.resourceCount = (currentSyllabus.resources || []).length;
        }
        renderSeriesCards();
        renderSyllabusEditor();
      } catch (err) {
        showToast('❌ ' + err.message, true);
      }
    }

    /**
     * 4. Roadmap Reordering
     */
    let draggedRoadmapItem = null;

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
        container.innerHTML = '<div class="reorder-empty">No learning paths configured for "' + cat + '" yet.<br><button class="btn-secondary" style="margin-top:0.8rem;" onclick="addNewRoadmapPath()">➕ Add First Section</button></div>';
        return;
      }

      const availableCourses = allSeries.filter(s => s.category === cat);

      catData.paths.forEach((pathObj, pIdx) => {
        const existingIds = new Set(pathObj.courses.map(c => typeof c === 'string' ? c : c.id));
        const unaddedCourses = availableCourses.filter(s => !existingIds.has(s.id));

        const pathDiv = document.createElement('div');
        pathDiv.className = 'path-section';
        pathDiv.ondragover = (e) => { e.preventDefault(); };
        pathDiv.ondrop = (e) => {
          if (e.target.closest('.reorder-item')) return;
          handleRoadmapPathDrop(e, cat, pIdx);
        };

        const otherPaths = catData.paths.map((p, idx) => ({ id: p.id, title: p.title, idx })).filter(p => p.idx !== pIdx);

        pathDiv.innerHTML = \`
          <div class="path-header">
            <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
              <span class="path-title">\${pathObj.title}</span>
              <span class="hint" style="font-family: 'JetBrains Mono', monospace; font-size: 0.78rem;">[\${pathObj.id}]</span>
              <span class="badge-local" style="font-size: 0.7rem; padding: 0.15rem 0.5rem;">\${pathObj.courses.length} courses</span>
              <button class="icon-btn" style="width: 26px; height: 26px; font-size: 0.75rem;" title="Rename section title" onclick="renameRoadmapPath('\${cat}', \${pIdx})">✏️</button>
              <button class="icon-btn" style="width: 26px; height: 26px; font-size: 0.75rem; color: var(--error);" title="Delete section" onclick="removeRoadmapPath('\${cat}', \${pIdx})">🗑️</button>
            </div>
            <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
              \${unaddedCourses.length > 0 ? \`
                <select id="ro-add-select-\${pIdx}" style="width: 190px; padding: 0.4rem 0.6rem; font-size: 0.8rem;">
                  \${unaddedCourses.map(c => \`<option value="\${c.id}">+ \${c.title}</option>\`).join('')}
                </select>
                <button class="btn-secondary" style="font-size: 0.8rem; padding: 0.4rem 0.75rem;" onclick="handleAddCourseToPath('\${cat}', \${pIdx})">+ Add Course</button>
              \` : ''}
              <button class="btn-secondary" style="font-size: 0.8rem; padding: 0.4rem 0.75rem;" onclick="savePathOrder('\${cat}', \${pIdx})">💾 Save Path</button>
            </div>
          </div>
          <div class="reorder-list" id="path-list-\${pIdx}"></div>
        \`;

        const listEl = pathDiv.querySelector(\`#path-list-\${pIdx}\`);

        if (pathObj.courses.length === 0) {
          const emptyDiv = document.createElement('div');
          emptyDiv.className = 'reorder-empty';
          emptyDiv.innerHTML = 'Section is empty. Drag and drop courses here or select from dropdown above.';
          listEl.appendChild(emptyDiv);
        } else {
          pathObj.courses.forEach((c, cIdx) => {
            const courseObj = typeof c === 'string' ? { id: c, title: c, status: '' } : c;
            const fullSeries = allSeries.find(item => item.id === courseObj.id);
            const status = (fullSeries && fullSeries.status) || courseObj.status || '';
            let statusBadge = '<span class="badge-local" style="color:#10b981; border-color:#10b98140; background:#10b98115; font-size:0.68rem; padding:0.12rem 0.4rem;">🟢 Live</span>';
            if (status === 'in-progress') {
              statusBadge = '<span class="badge-local" style="color:#f59e0b; border-color:#f59e0b40; background:#f59e0b15; font-size:0.68rem; padding:0.12rem 0.4rem;">⏳ In Progress</span>';
            } else if (status === 'planned') {
              statusBadge = '<span class="badge-local" style="color:#94a3b8; border-color:#94a3b840; background:#94a3b815; font-size:0.68rem; padding:0.12rem 0.4rem;">🔒 Planned</span>';
            } else if (status === 're-visiting') {
              statusBadge = '<span class="badge-local" style="color:#a855f7; border-color:#a855f740; background:#a855f715; font-size:0.68rem; padding:0.12rem 0.4rem;">🔁 Re-visiting</span>';
            }

            const item = document.createElement('div');
            item.className = 'reorder-item';
            item.draggable = true;
            item.dataset.pIdx = pIdx;
            item.dataset.cIdx = cIdx;

            item.ondragstart = (e) => handleRoadmapDragStart(e, cat, pIdx, cIdx);
            item.ondragover = (e) => handleRoadmapDragOver(e, cat, pIdx, cIdx);
            item.ondragleave = (e) => handleRoadmapDragLeave(e);
            item.ondrop = (e) => handleRoadmapDrop(e, cat, pIdx, cIdx);
            item.ondragend = (e) => handleRoadmapDragEnd(e);

            item.innerHTML = \`
              <div class="reorder-left">
                <span class="drag-handle" title="Drag to reorder">⠿</span>
                <span class="reorder-index">#\${cIdx + 1}</span>
                <div style="flex: 1; min-width: 0;">
                  <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                    <span class="reorder-title">\${courseObj.title}</span>
                    \${statusBadge}
                  </div>
                  <div class="reorder-slug">\${courseObj.id}</div>
                </div>
              </div>
              <div class="reorder-actions">
                \${otherPaths.length > 0 ? \`
                  <select onchange="moveCourseToPath('\${cat}', \${pIdx}, \${cIdx}, Number(this.value))" style="font-size: 0.76rem; padding: 0.28rem 0.5rem; max-width: 130px; background: var(--bg); border: 1px solid var(--border);" title="Move course to another section">
                    <option value="" disabled selected>Move to...</option>
                    \${otherPaths.map(op => \`<option value="\${op.idx}">➔ \${op.title}</option>\`).join('')}
                  </select>
                \` : ''}
                <button class="icon-btn" title="Move to Top" onclick="moveRoadmapCourse('\${cat}', \${pIdx}, \${cIdx}, -999)" \${cIdx === 0 ? 'disabled' : ''}>⏫</button>
                <button class="icon-btn" title="Move Up" onclick="moveRoadmapCourse('\${cat}', \${pIdx}, \${cIdx}, -1)" \${cIdx === 0 ? 'disabled' : ''}>▲</button>
                <button class="icon-btn" title="Move Down" onclick="moveRoadmapCourse('\${cat}', \${pIdx}, \${cIdx}, 1)" \${cIdx === pathObj.courses.length - 1 ? 'disabled' : ''}>▼</button>
                <button class="icon-btn" title="Move to Bottom" onclick="moveRoadmapCourse('\${cat}', \${pIdx}, \${cIdx}, 999)" \${cIdx === pathObj.courses.length - 1 ? 'disabled' : ''}>⏬</button>
                <button class="icon-btn" style="color: var(--error);" title="Remove from path" onclick="removeRoadmapCourse('\${cat}', \${pIdx}, \${cIdx})">✕</button>
              </div>
            \`;
            listEl.appendChild(item);
          });
        }

        container.appendChild(pathDiv);
      });
    }

    function handleRoadmapDragStart(e, cat, pIdx, cIdx) {
      draggedRoadmapItem = { cat, pIdx, cIdx };
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', JSON.stringify({ cat, pIdx, cIdx }));
      e.currentTarget.classList.add('dragging');
    }

    function handleRoadmapDragOver(e, cat, pIdx, cIdx) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      const targetEl = e.currentTarget;
      if (!targetEl || targetEl.classList.contains('dragging')) return;
      const rect = targetEl.getBoundingClientRect();
      const midY = rect.top + rect.height / 2;
      if (e.clientY < midY) {
        targetEl.classList.add('drag-over-top');
        targetEl.classList.remove('drag-over-bottom');
      } else {
        targetEl.classList.add('drag-over-bottom');
        targetEl.classList.remove('drag-over-top');
      }
    }

    function handleRoadmapDragLeave(e) {
      if (e.currentTarget) {
        e.currentTarget.classList.remove('drag-over-top', 'drag-over-bottom');
      }
    }

    function handleRoadmapDrop(e, cat, targetPIdx, targetCIdx) {
      e.preventDefault();
      e.stopPropagation();
      if (e.currentTarget) {
        e.currentTarget.classList.remove('drag-over-top', 'drag-over-bottom');
      }
      if (!draggedRoadmapItem) return;
      const { cat: srcCat, pIdx: srcPIdx, cIdx: srcCIdx } = draggedRoadmapItem;
      if (srcCat !== cat) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const insertAfter = e.clientY >= (rect.top + rect.height / 2);

      const srcList = currentRoadmapData[cat].paths[srcPIdx].courses;
      const [item] = srcList.splice(srcCIdx, 1);
      const destList = currentRoadmapData[cat].paths[targetPIdx].courses;

      let finalTargetIdx = targetCIdx;
      if (srcPIdx === targetPIdx && srcCIdx < targetCIdx) {
        finalTargetIdx--;
      }
      if (insertAfter) {
        finalTargetIdx++;
      }
      if (finalTargetIdx < 0) finalTargetIdx = 0;
      if (finalTargetIdx > destList.length) finalTargetIdx = destList.length;

      destList.splice(finalTargetIdx, 0, item);
      draggedRoadmapItem = null;
      renderRoadmapOrder();
      showToast('Moved "' + (item.title || item.id) + '". Click "Save All Paths" to persist.');
    }

    function handleRoadmapPathDrop(e, cat, targetPIdx) {
      e.preventDefault();
      if (!draggedRoadmapItem) return;
      const { cat: srcCat, pIdx: srcPIdx, cIdx: srcCIdx } = draggedRoadmapItem;
      if (srcCat !== cat) return;

      const srcList = currentRoadmapData[cat].paths[srcPIdx].courses;
      const [item] = srcList.splice(srcCIdx, 1);
      currentRoadmapData[cat].paths[targetPIdx].courses.push(item);
      draggedRoadmapItem = null;
      renderRoadmapOrder();
      showToast('Moved "' + (item.title || item.id) + '" to section. Click "Save All Paths" to persist.');
    }

    function handleRoadmapDragEnd(e) {
      document.querySelectorAll('.reorder-item').forEach(el => {
        el.classList.remove('dragging', 'drag-over-top', 'drag-over-bottom');
      });
      draggedRoadmapItem = null;
    }

    function moveRoadmapCourse(cat, pIdx, cIdx, delta) {
      const courses = currentRoadmapData[cat].paths[pIdx].courses;
      if (delta === -999) {
        const [item] = courses.splice(cIdx, 1);
        courses.unshift(item);
      } else if (delta === 999) {
        const [item] = courses.splice(cIdx, 1);
        courses.push(item);
      } else {
        const target = cIdx + delta;
        if (target < 0 || target >= courses.length) return;
        const temp = courses[cIdx];
        courses[cIdx] = courses[target];
        courses[target] = temp;
      }
      renderRoadmapOrder();
    }

    function moveCourseToPath(cat, srcPIdx, cIdx, targetPIdx) {
      if (srcPIdx === targetPIdx) return;
      const srcList = currentRoadmapData[cat].paths[srcPIdx].courses;
      const [item] = srcList.splice(cIdx, 1);
      const destPath = currentRoadmapData[cat].paths[targetPIdx];
      destPath.courses.push(item);
      renderRoadmapOrder();
      showToast('Moved "' + (item.title || item.id) + '" to "' + destPath.title + '". Click "Save All Paths" to persist.');
    }

    function removeRoadmapCourse(cat, pIdx, cIdx) {
      const course = currentRoadmapData[cat].paths[pIdx].courses[cIdx];
      const name = course ? (course.title || course.id) : 'course';
      if (!confirm('Remove "' + name + '" from roadmap path?')) return;
      currentRoadmapData[cat].paths[pIdx].courses.splice(cIdx, 1);
      renderRoadmapOrder();
      showToast('Removed from path. Click "Save Path" or "Save All Paths" to persist.');
    }

    function addNewRoadmapPath() {
      const cat = document.getElementById('ro-category-select').value;
      const title = prompt('Enter title for the new roadmap section (e.g. "Distributed Systems"):');
      if (!title || !title.trim()) return;
      const cleanTitle = title.trim();
      const defaultId = cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const id = prompt('Enter ID / slug for this section:', defaultId) || defaultId;
      if (!currentRoadmapData[cat]) currentRoadmapData[cat] = { paths: [], edges: [] };
      if (!currentRoadmapData[cat].paths) currentRoadmapData[cat].paths = [];
      currentRoadmapData[cat].paths.push({
        id: id.trim().toLowerCase(),
        title: cleanTitle,
        courses: []
      });
      renderRoadmapOrder();
      showToast('Added section "' + cleanTitle + '". Click "Save All Paths" to persist.');
    }

    function renameRoadmapPath(cat, pIdx) {
      const pathObj = currentRoadmapData[cat].paths[pIdx];
      const newTitle = prompt('Rename section title:', pathObj.title);
      if (newTitle && newTitle.trim()) {
        pathObj.title = newTitle.trim();
        renderRoadmapOrder();
        showToast('Updated section title. Click "Save All Paths" to persist.');
      }
    }

    function removeRoadmapPath(cat, pIdx) {
      const pathObj = currentRoadmapData[cat].paths[pIdx];
      if (pathObj.courses.length > 0) {
        if (!confirm('This section contains ' + pathObj.courses.length + ' course(s). Are you sure you want to remove it? Any assigned courses will be detached from this path.')) {
          return;
        }
      } else {
        if (!confirm('Remove empty section "' + pathObj.title + '"?')) return;
      }
      currentRoadmapData[cat].paths.splice(pIdx, 1);
      renderRoadmapOrder();
      showToast('Removed section. Click "Save All Paths" to persist.');
    }

    async function handleAddCourseToPath(cat, pIdx) {
      const select = document.getElementById('ro-add-select-' + pIdx);
      if (!select) return;
      const courseId = select.value;
      if (!courseId) return;

      const s = allSeries.find(item => item.id === courseId);
      currentRoadmapData[cat].paths[pIdx].courses.push({
        id: courseId,
        title: s ? s.title : courseId,
        category: cat,
        weight: s ? s.weight : 100,
        status: s ? (s.status || '') : ''
      });
      renderRoadmapOrder();
      showToast('Added "' + (s ? s.title : courseId) + '" to path. Click "Save Path" to persist.');
    }

    async function savePathOrder(cat, pIdx) {
      hideToast();
      const courseIds = currentRoadmapData[cat].paths[pIdx].courses.map(c => typeof c === 'string' ? c : c.id);
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

    async function saveAllCurrentRoadmapPaths() {
      const cat = document.getElementById('ro-category-select').value;
      hideToast();
      try {
        const res = await fetch('/api/roadmap/save-all-paths', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            category: cat,
            paths: currentRoadmapData[cat].paths
          })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        showToast('✅ ' + data.message);
      } catch (err) {
        showToast('❌ ' + err.message, true);
      }
    }

    async function saveAndSyncWeights() {
      const cat = document.getElementById('ro-category-select').value;
      hideToast();
      try {
        const saveRes = await fetch('/api/roadmap/save-all-paths', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            category: cat,
            paths: currentRoadmapData[cat].paths
          })
        });
        const saveData = await saveRes.json();
        if (!saveRes.ok) throw new Error(saveData.error);

        const syncRes = await fetch('/api/sync-weights', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category: cat })
        });
        const syncData = await syncRes.json();
        if (!syncRes.ok) throw new Error(syncData.error);

        showToast('⚡ Saved paths and synced weights for ' + syncData.count + ' courses.');
        await refreshStatus();
        await loadRoadmapData();
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
            <button class="btn-secondary" style="font-size: 0.75rem; padding: 0.3rem 0.6rem;" onclick="openAttachArticleModal('\${a.slug}', '\${a.title.replace(/'/g, "\\\\'")}', '\${a.series || ''}')">📎 \${a.series ? 'Course' : 'Attach Course'}</button>
            <button class="btn-secondary" style="font-size: 0.75rem; padding: 0.3rem 0.6rem;" onclick="handleToggleDraft('\${a.slug}')">\${a.draft ? '🔴 Draft' : '🟢 Live'}</button>
            <button class="btn-secondary" style="font-size: 0.75rem; padding: 0.3rem 0.6rem;" onclick="openArticleEditor('\${a.slug}')">✏️ Edit Markdown</button>
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

    /**
     * Markdown Article Editor
     */
    async function openArticleEditor(slug) {
      hideToast();
      const modal = document.getElementById('article-editor-modal');
      modal.style.display = 'flex';
      document.getElementById('ed-modal-title').textContent = 'Loading article...';

      try {
        const res = await fetch('/api/article?slug=' + encodeURIComponent(slug));
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        currentArticleData = data;
        document.getElementById('ed-modal-title').textContent = data.frontmatter.title || data.slug;
        document.getElementById('ed-modal-badge').textContent = data.isMdx ? 'MDX Component' : 'Markdown (.md)';

        document.getElementById('ed-title').value = data.frontmatter.title || '';
        document.getElementById('ed-slug').value = data.slug;
        document.getElementById('ed-old-slug').value = data.slug;
        document.getElementById('ed-subtitle').value = data.frontmatter.subtitle || '';
        document.getElementById('ed-desc').value = data.frontmatter.description || '';
        document.getElementById('ed-series').value = data.frontmatter.series || '';
        document.getElementById('ed-draft').checked = Boolean(data.frontmatter.draft);
        document.getElementById('ed-featured').checked = Boolean(data.frontmatter.featured);
        document.getElementById('ed-content').value = data.content || '';

        setEditorMode('split');
        updateEditorPreview();
      } catch (err) {
        alert('Failed to load article: ' + err.message);
        closeArticleEditor();
      }
    }

    function closeArticleEditor() {
      document.getElementById('article-editor-modal').style.display = 'none';
      currentArticleData = null;
    }

    function setEditorMode(mode) {
      const layout = document.getElementById('editor-layout');
      layout.className = 'editor-layout mode-' + mode;
    }

    function updateEditorPreview() {
      const content = document.getElementById('ed-content').value;
      const preview = document.getElementById('editor-preview');

      // Update Word / Reading Time stats
      const words = (content.trim().match(/\\S+/g) || []).length;
      const readTime = Math.ceil(words / 200);
      document.getElementById('ed-stats').textContent = words + ' words • ~' + readTime + ' min read';

      if (window.marked && typeof window.marked.parse === 'function') {
        preview.innerHTML = window.marked.parse(content);
      } else {
        preview.innerText = content;
      }
    }

    function handleEditorTabKey(e) {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;
        const val = e.target.value;
        e.target.value = val.substring(0, start) + '  ' + val.substring(end);
        e.target.selectionStart = e.target.selectionEnd = start + 2;
        updateEditorPreview();
      }
    }

    function insertFormat(prefix, suffix) {
      const textarea = document.getElementById('ed-content');
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const selected = text.substring(start, end);

      const replacement = prefix + selected + suffix;
      textarea.value = text.substring(0, start) + replacement + text.substring(end);
      textarea.selectionStart = start + prefix.length;
      textarea.selectionEnd = start + prefix.length + selected.length;
      textarea.focus();
      updateEditorPreview();
    }

    function handleEditorSeriesChange() {
      const seriesVal = document.getElementById('ed-series').value;
      if (seriesVal) {
        const s = allSeries.find(item => item.id === seriesVal);
        if (s) {
          showToast('Synchronized category to course track: ' + s.category);
        }
      }
    }

    async function handleSaveCurrentArticle() {
      hideToast();
      const slug = document.getElementById('ed-slug').value.trim();
      const oldSlug = document.getElementById('ed-old-slug').value.trim();
      if (!slug) return alert('Slug is required.');

      const seriesVal = document.getElementById('ed-series').value || null;
      let categories = ['Development'];
      if (seriesVal) {
        const s = allSeries.find(item => item.id === seriesVal);
        if (s && s.category) categories = [s.category];
      } else if (currentArticleData && currentArticleData.frontmatter.categories) {
        categories = currentArticleData.frontmatter.categories;
      }

      const payload = {
        slug,
        oldSlug,
        isMdx: currentArticleData ? currentArticleData.isMdx : false,
        frontmatter: {
          title: document.getElementById('ed-title').value,
          subtitle: document.getElementById('ed-subtitle').value,
          description: document.getElementById('ed-desc').value,
          author: currentArticleData ? currentArticleData.frontmatter.author : 'Arjit Sharma',
          series: seriesVal,
          categories,
          draft: document.getElementById('ed-draft').checked,
          featured: document.getElementById('ed-featured').checked,
        },
        content: document.getElementById('ed-content').value
      };

      try {
        const res = await fetch('/api/article/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        showToast('✅ Saved article "' + slug + '".');
        document.getElementById('ed-old-slug').value = slug;
        refreshStatus();
        if (document.getElementById('panel-syllabus').classList.contains('active')) {
          loadCourseSyllabus();
        }
        if (document.getElementById('panel-explorer').classList.contains('active')) {
          loadArticlesExplorer();
        }
      } catch (err) {
        alert('Failed to save article: ' + err.message);
      }
    }

    async function handleDeleteCurrentArticle() {
      const slug = document.getElementById('ed-old-slug').value.trim();
      if (!confirm('Are you sure you want to permanently delete article "' + slug + '"?')) return;

      try {
        const res = await fetch('/api/article/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        closeArticleEditor();
        showToast('🗑️ Deleted article "' + slug + '".');
        refreshStatus();
        if (document.getElementById('panel-syllabus').classList.contains('active')) {
          loadCourseSyllabus();
        }
        if (document.getElementById('panel-explorer').classList.contains('active')) {
          loadArticlesExplorer();
        }
      } catch (err) {
        alert('Failed to delete: ' + err.message);
      }
    }

    /**
     * 7. Interview Bytes
     */
    async function loadInterviewTopics() {
      try {
        const res = await fetch('/api/interview-questions');
        allInterviewTopics = await res.json();

        const select = document.getElementById('iq-topic-select');
        select.innerHTML = '<option value="all">All Topics</option>';
        allInterviewTopics.forEach(t => {
          const opt = document.createElement('option');
          opt.value = t.topic;
          opt.textContent = t.topic + ' (' + t.questionCount + ')';
          select.appendChild(opt);
        });

        renderInterviewQuestions();
      } catch (err) {
        showToast('❌ Failed to load interview topics: ' + err.message, true);
      }
    }

    function renderInterviewQuestions() {
      const topicFilter = document.getElementById('iq-topic-select').value;
      const query = document.getElementById('iq-search').value.toLowerCase().trim();
      const container = document.getElementById('iq-list-container');
      container.innerHTML = '';

      let questionsList = [];
      allInterviewTopics.forEach(t => {
        if (topicFilter !== 'all' && t.topic !== topicFilter) return;
        (t.questions || []).forEach(q => {
          questionsList.push({ ...q, topic: t.topic });
        });
      });

      if (query) {
        questionsList = questionsList.filter(q => {
          const matchQ = (q.question || '').toLowerCase().includes(query);
          const matchA = Array.isArray(q.answer) ? q.answer.join(' ').toLowerCase().includes(query) : false;
          const matchTags = Array.isArray(q.tags) ? q.tags.join(' ').toLowerCase().includes(query) : false;
          return matchQ || matchA || matchTags;
        });
      }

      if (questionsList.length === 0) {
        container.innerHTML = '<p class="hint">No interview questions matched your filter.</p>';
        return;
      }

      questionsList.forEach(q => {
        const card = document.createElement('div');
        card.className = 'iq-card';
        card.innerHTML = \`
          <div class="iq-header">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
                <span class="tag-badge tag-Development">\${q.topic}</span>
                <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--accent);">#\${q.id}</span>
              </div>
              <div class="iq-question-text">\${q.question}</div>
            </div>
            <div style="display: flex; gap: 0.4rem;">
              <button class="btn-secondary" style="font-size: 0.78rem;" onclick="openEditInterviewModal('\${q.topic}', '\${q.id}')">✏️ Edit</button>
              <button class="icon-btn" style="color: var(--error);" onclick="handleDeleteInterviewQuestion('\${q.topic}', '\${q.id}')">✕</button>
            </div>
          </div>

          <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 0.6rem;">
            \${(q.tags || []).map(t => \`<span style="background: rgba(148,163,184,0.1); border: 1px solid var(--border); font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 4px; color: var(--text-muted);">#\${t}</span>\`).join('')}
          </div>

          <div class="iq-answers">
            \${(q.answer || []).map(a => \`
              <div class="iq-answer-bullet">
                <span>•</span>
                <div>\${a}</div>
              </div>
            \`).join('')}
          </div>

          \${q.code ? \`<div class="iq-code-box">\${q.code}</div>\` : ''}
        \`;
        container.appendChild(card);
      });
    }

    function openNewInterviewModal() {
      const topicSelect = document.getElementById('iq-topic-select');
      const activeTopic = topicSelect.value !== 'all' ? topicSelect.value : (allInterviewTopics[0] ? allInterviewTopics[0].topic : 'general');
      document.getElementById('iq-modal-title').textContent = '➕ Add New Interview Question';
      document.getElementById('iq-field-topic').value = activeTopic;
      document.getElementById('iq-field-id').value = '';
      document.getElementById('iq-field-is-new').value = 'true';
      document.getElementById('iq-field-question').value = '';
      document.getElementById('iq-field-tags').value = activeTopic;
      document.getElementById('iq-field-answer').value = '';
      document.getElementById('iq-field-code').value = '';
      document.getElementById('interview-modal').style.display = 'flex';
    }

    function openEditInterviewModal(topic, qId) {
      const tObj = allInterviewTopics.find(t => t.topic === topic);
      if (!tObj) return;
      const q = (tObj.questions || []).find(item => String(item.id) === String(qId));
      if (!q) return;

      document.getElementById('iq-modal-title').textContent = '✏️ Edit Question #' + qId;
      document.getElementById('iq-field-topic').value = topic;
      document.getElementById('iq-field-id').value = qId;
      document.getElementById('iq-field-is-new').value = 'false';
      document.getElementById('iq-field-question').value = q.question;
      document.getElementById('iq-field-tags').value = (q.tags || []).join(', ');
      document.getElementById('iq-field-answer').value = (q.answer || []).join('\\n');
      document.getElementById('iq-field-code').value = q.code || '';
      document.getElementById('interview-modal').style.display = 'flex';
    }

    function closeInterviewModal() {
      document.getElementById('interview-modal').style.display = 'none';
    }

    async function handleSaveInterviewQuestion(e) {
      e.preventDefault();
      hideToast();
      const topic = document.getElementById('iq-field-topic').value;
      const id = document.getElementById('iq-field-id').value;
      const isNew = document.getElementById('iq-field-is-new').value === 'true';

      const questionData = {
        id,
        question: document.getElementById('iq-field-question').value,
        tags: document.getElementById('iq-field-tags').value,
        answer: document.getElementById('iq-field-answer').value,
        code: document.getElementById('iq-field-code').value,
      };

      try {
        const res = await fetch('/api/interview-questions/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic, questionData, isNew })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        closeInterviewModal();
        showToast('✅ Saved interview question to ' + topic + '.yaml');
        refreshStatus();
        loadInterviewTopics();
      } catch (err) {
        showToast('❌ ' + err.message, true);
      }
    }

    async function handleDeleteInterviewQuestion(topic, questionId) {
      if (!confirm('Are you sure you want to delete question #' + questionId + ' from ' + topic + '.yaml?')) return;
      hideToast();
      try {
        const res = await fetch('/api/interview-questions/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic, questionId })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        showToast('🗑️ Deleted question #' + questionId);
        refreshStatus();
        loadInterviewTopics();
      } catch (err) {
        showToast('❌ ' + err.message, true);
      }
    }

    function openNewTopicModal() {
      document.getElementById('topic-new-name').value = '';
      document.getElementById('interview-topic-modal').style.display = 'flex';
    }

    function closeNewTopicModal() {
      document.getElementById('interview-topic-modal').style.display = 'none';
    }

    async function handleCreateTopicFile(e) {
      e.preventDefault();
      hideToast();
      const topic = document.getElementById('topic-new-name').value.trim();
      if (!topic) return;

      try {
        const res = await fetch('/api/interview-questions/create-topic', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        closeNewTopicModal();
        showToast('✅ Created topic file "' + topic + '.yaml"');
        loadInterviewTopics();
      } catch (err) {
        showToast('❌ ' + err.message, true);
      }
    }

    /**
     * 8. Shorts Studio
     */
    async function loadShortsStudio() {
      try {
        const res = await fetch('/api/shorts');
        allShorts = await res.json();

        const seriesSet = new Set(allShorts.map(s => s.series));
        const select = document.getElementById('shorts-series-select');
        select.innerHTML = '<option value="all">All Shorts Playlists</option>';
        seriesSet.forEach(s => {
          const opt = document.createElement('option');
          opt.value = s;
          opt.textContent = s;
          select.appendChild(opt);
        });

        renderShortsStudio();
      } catch (err) {
        showToast('❌ Failed to load shorts: ' + err.message, true);
      }
    }

    function renderShortsStudio() {
      const seriesFilter = document.getElementById('shorts-series-select').value;
      const query = document.getElementById('shorts-search').value.toLowerCase().trim();
      const container = document.getElementById('shorts-grid-container');
      container.innerHTML = '';

      const filtered = allShorts.filter(s => {
        if (seriesFilter !== 'all' && s.series !== seriesFilter) return false;
        if (query) {
          const matchTitle = (s.title || '').toLowerCase().includes(query);
          const matchSeries = (s.series || '').toLowerCase().includes(query);
          if (!matchTitle && !matchSeries) return false;
        }
        return true;
      });

      if (filtered.length === 0) {
        container.innerHTML = '<p class="hint">No shorts matched your filters.</p>';
        return;
      }

      filtered.forEach(s => {
        const card = document.createElement('div');
        card.className = 'short-card';
        card.innerHTML = \`
          <div class="short-thumb-box">
            <img class="short-thumb-img" src="https://img.youtube.com/vi/\${s.youtubeId}/mqdefault.jpg" alt="\${s.title}" onerror="this.src='https://placehold.co/320x180/090d16/38bdf8?text=Video+Short'">
            <div class="short-play-badge">▶ SHORT #\${s.order}</div>
          </div>
          <div class="short-card-body">
            <div>
              <div style="font-weight: 800; font-size: 1rem; color: #fff; margin-bottom: 0.35rem;">\${s.title}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted); font-family: 'JetBrains Mono', monospace;">
                \${s.seriesName} [\${s.series}]
              </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
              <a href="https://youtube.com/shorts/\${s.youtubeId}" target="_blank" class="btn-secondary" style="font-size: 0.75rem; padding: 0.3rem 0.6rem; text-decoration: none;">↗ Watch</a>
              <div style="display: flex; gap: 0.3rem;">
                <button class="btn-secondary" style="font-size: 0.75rem; padding: 0.3rem 0.6rem;" onclick="openEditShortModal('\${s.series}', '\${s.slug}')">✏️ Edit</button>
                <button class="icon-btn" style="color: var(--error);" onclick="handleDeleteShort('\${s.series}', '\${s.slug}')">✕</button>
              </div>
            </div>
          </div>
        \`;
        container.appendChild(card);
      });
    }

    function openNewShortModal() {
      document.getElementById('short-modal-title').textContent = '➕ Add Video Short';
      document.getElementById('short-field-original-slug').value = '';
      document.getElementById('short-field-title').value = '';
      document.getElementById('short-field-slug').value = '';
      document.getElementById('short-field-order').value = (allShorts.length + 1);
      document.getElementById('short-field-series').value = 'oci-shorts';
      document.getElementById('short-field-series-name').value = 'Oracle Cloud';
      document.getElementById('short-field-ytid').value = '';
      document.getElementById('short-yt-preview').style.display = 'none';
      document.getElementById('short-modal').style.display = 'flex';
    }

    function openEditShortModal(series, slug) {
      const s = allShorts.find(item => item.series === series && item.slug === slug);
      if (!s) return;

      document.getElementById('short-modal-title').textContent = '✏️ Edit Short: ' + s.title;
      document.getElementById('short-field-original-slug').value = s.slug;
      document.getElementById('short-field-title').value = s.title;
      document.getElementById('short-field-slug').value = s.slug;
      document.getElementById('short-field-order').value = s.order;
      document.getElementById('short-field-series').value = s.series;
      document.getElementById('short-field-series-name').value = s.seriesName;
      document.getElementById('short-field-ytid').value = s.youtubeId;

      previewShortYoutubeThumbnail();
      document.getElementById('short-modal').style.display = 'flex';
    }

    function closeShortModal() {
      document.getElementById('short-modal').style.display = 'none';
    }

    function previewShortYoutubeThumbnail() {
      const ytid = document.getElementById('short-field-ytid').value.trim();
      const prev = document.getElementById('short-yt-preview');
      const img = document.getElementById('short-yt-thumb');
      if (ytid.length >= 8) {
        img.src = 'https://img.youtube.com/vi/' + ytid + '/mqdefault.jpg';
        prev.style.display = 'block';
      } else {
        prev.style.display = 'none';
      }
    }

    async function handleSaveShort(e) {
      e.preventDefault();
      hideToast();

      const payload = {
        originalSlug: document.getElementById('short-field-original-slug').value,
        title: document.getElementById('short-field-title').value,
        slug: document.getElementById('short-field-slug').value,
        order: Number(document.getElementById('short-field-order').value),
        series: document.getElementById('short-field-series').value,
        seriesName: document.getElementById('short-field-series-name').value,
        youtubeId: document.getElementById('short-field-ytid').value,
      };

      try {
        const res = await fetch('/api/shorts/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        closeShortModal();
        showToast('✅ Saved short video "' + payload.title + '"');
        refreshStatus();
        loadShortsStudio();
      } catch (err) {
        showToast('❌ ' + err.message, true);
      }
    }

    async function handleDeleteShort(series, slug) {
      if (!confirm('Are you sure you want to delete short video "' + slug + '"?')) return;
      hideToast();
      try {
        const res = await fetch('/api/shorts/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ series, slug })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        showToast('🗑️ Deleted short video "' + slug + '"');
        refreshStatus();
        loadShortsStudio();
      } catch (err) {
        showToast('❌ ' + err.message, true);
      }
    }

    /**
     * 9. Image Studio & Cloudinary Helpers
     */
    let allConvertedImages = [];
    let cloudinaryUploadedMap = {};

    function loadCloudinarySettings() {
      try {
        const saved = JSON.parse(localStorage.getItem('csprimer_cloudinary_settings') || '{}');
        if (saved.cloudName) document.getElementById('cld-cloud-name').value = saved.cloudName;
        if (saved.folder) document.getElementById('cld-folder').value = saved.folder;
        if (saved.uploadPreset) document.getElementById('cld-upload-preset').value = saved.uploadPreset;
        if (saved.apiKey) document.getElementById('cld-api-key').value = saved.apiKey;
        if (saved.apiSecret) document.getElementById('cld-api-secret').value = saved.apiSecret;
      } catch {}
    }

    function saveCloudinarySettings() {
      const settings = {
        cloudName: document.getElementById('cld-cloud-name').value.trim(),
        folder: document.getElementById('cld-folder').value.trim(),
        uploadPreset: document.getElementById('cld-upload-preset').value.trim(),
        apiKey: document.getElementById('cld-api-key').value.trim(),
        apiSecret: document.getElementById('cld-api-secret').value.trim()
      };
      localStorage.setItem('csprimer_cloudinary_settings', JSON.stringify(settings));
      showToast('✅ Cloudinary settings saved!');
    }

    function getCloudinaryPayload() {
      return {
        cloudName: document.getElementById('cld-cloud-name').value.trim() || 'dwa6rcttw',
        folder: document.getElementById('cld-folder').value.trim(),
        uploadPreset: document.getElementById('cld-upload-preset').value.trim(),
        apiKey: document.getElementById('cld-api-key').value.trim(),
        apiSecret: document.getElementById('cld-api-secret').value.trim()
      };
    }

    async function loadImagesStudio() {
      loadCloudinarySettings();
      try {
        const destFolder = document.getElementById('img-dest-folder').value.trim();
        const url = destFolder ? '/api/images?folder=' + encodeURIComponent(destFolder) : '/api/images';
        const res = await fetch(url);
        const data = await res.json();
        allConvertedImages = data.images || [];
        renderConvertedImages(allConvertedImages);
        refreshStatus();
      } catch (err) {
        showToast('❌ Failed to load images: ' + err.message, true);
      }
    }

    function renderConvertedImages(imagesToRender) {
      const container = document.getElementById('converted-images-container');
      const countLabel = document.getElementById('gallery-count-label');
      countLabel.textContent = imagesToRender.length + ' ' + (imagesToRender.length === 1 ? 'image' : 'images');
      container.innerHTML = '';

      if (imagesToRender.length === 0) {
        container.innerHTML = '<p class="hint" style="grid-column: 1 / -1; padding: 2rem 0; text-align: center;">No converted WebP images found yet. Use the Folder Converter or Browser Dropzone above to convert images.</p>';
        return;
      }

      imagesToRender.forEach(img => {
        const card = document.createElement('div');
        card.className = 'image-card';
        const cldData = cloudinaryUploadedMap[img.filename];

        card.innerHTML = \`
          <div class="image-card-preview">
            <img src="\${img.url}?t=\${Date.now()}" alt="\${img.filename}" loading="lazy" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100\\' height=\\'100\\'><text x=\\'50%\\' y=\\'50%\\' fill=\\'%23666\\' text-anchor=\\'middle\\'>WebP</text></svg>'">
            \${cldData ? '<span class="badge-local" style="position: absolute; top: 8px; right: 8px; background: rgba(16, 185, 129, 0.9); color: #fff;">☁️ In Cloudinary</span>' : ''}
          </div>
          <div class="image-card-body">
            <div>
              <div class="image-card-name" title="\${img.filename}">\${img.filename}</div>
              <div class="image-card-meta">
                <span>📦 \${img.sizeFormatted}</span>
                <span>🕒 \${new Date(img.mtime).toLocaleDateString()}</span>
              </div>
            </div>

            <div>
              \${cldData ? \`
                <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 8px; padding: 0.5rem; margin-bottom: 0.6rem; font-size: 0.76rem; word-break: break-all;">
                  <a href="\${cldData.secure_url}" target="_blank" style="color: #34d399; text-decoration: none;">🔗 Open Cloudinary URL</a>
                </div>
              \` : ''}

              <div class="image-card-actions">
                \${cldData ? \`
                  <button class="btn-secondary" onclick="copyToClipboard('\${cldData.markdownTag}')">📋 Copy MD</button>
                  <button class="btn-secondary" onclick="copyToClipboard('\${cldData.secure_url}')">🔗 Copy URL</button>
                \` : \`
                  <button class="btn-secondary" onclick="uploadSingleToCloudinary('\${img.filename}')">☁️ Upload</button>
                  <button class="btn-secondary" onclick="copyToClipboard('\${img.filename}')">📋 Name</button>
                \`}
                <button class="btn-danger" style="flex: 0 0 32px; padding: 0.4rem;" title="Delete image" onclick="handleDeleteImage('\${img.filename}')">✕</button>
              </div>
            </div>
          </div>
        \`;
        container.appendChild(card);
      });
    }

    function filterGallery() {
      const query = document.getElementById('gallery-search').value.toLowerCase().trim();
      if (!query) {
        renderConvertedImages(allConvertedImages);
        return;
      }
      const filtered = allConvertedImages.filter(img => img.filename.toLowerCase().includes(query));
      renderConvertedImages(filtered);
    }

    async function scanInputFolder() {
      const inputFolder = document.getElementById('img-source-folder').value.trim();
      const statusBox = document.getElementById('scan-results-box');
      if (!inputFolder) {
        alert('Please enter a source folder path.');
        return;
      }
      statusBox.innerHTML = '⏳ Scanning folder...';
      try {
        const res = await fetch('/api/images/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ inputFolder })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        if (data.count === 0) {
          statusBox.innerHTML = '⚠️ No eligible PNG/JPG images found in that folder.';
        } else {
          statusBox.innerHTML = '✅ Found <strong>' + data.count + ' images</strong> in source folder. Click "Convert All to WebP" to convert.';
        }
      } catch (err) {
        statusBox.innerHTML = '❌ Scan failed: ' + err.message;
      }
    }

    async function convertInputFolder() {
      const inputFolder = document.getElementById('img-source-folder').value.trim();
      const outputFolder = document.getElementById('img-dest-folder').value.trim();
      const quality = parseInt(document.getElementById('img-quality').value, 10);
      const lossless = document.getElementById('img-lossless').checked;
      const statusBox = document.getElementById('scan-results-box');

      if (!inputFolder) {
        alert('Please enter a source images folder.');
        return;
      }

      statusBox.innerHTML = '⏳ Converting images to WebP...';
      try {
        const res = await fetch('/api/images/convert-folder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ inputFolder, outputFolder: outputFolder || undefined, quality, lossless })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        statusBox.innerHTML = '🎉 Converted <strong>' + data.convertedCount + ' images</strong> to WebP! Reduced from ' + data.totalOriginalFormatted + ' to ' + data.totalWebpFormatted + ' (<strong>' + data.totalSavingsPercent + '% saved</strong>).';
        showToast('🎉 Converted ' + data.convertedCount + ' images to WebP! (' + data.totalSavingsPercent + '% savings)');
        loadImagesStudio();
      } catch (err) {
        statusBox.innerHTML = '❌ Conversion failed: ' + err.message;
        showToast('❌ ' + err.message, true);
      }
    }

    function handleDragOver(e) {
      e.preventDefault();
      e.stopPropagation();
      document.getElementById('imageDropzone').classList.add('dragover');
    }

    function handleDragLeave(e) {
      e.preventDefault();
      e.stopPropagation();
      document.getElementById('imageDropzone').classList.remove('dragover');
    }

    async function handleDropFiles(e) {
      e.preventDefault();
      e.stopPropagation();
      document.getElementById('imageDropzone').classList.remove('dragover');
      const files = Array.from(e.dataTransfer.files).filter(f => /\\.(png|jpe?g|bmp|tiff|webp)$/i.test(f.name));
      if (files.length === 0) {
        alert('No image files detected in drop.');
        return;
      }
      await processUploadedFiles(files);
    }

    async function handleFilePickerSelect(e) {
      const files = Array.from(e.target.files);
      if (files.length === 0) return;
      await processUploadedFiles(files);
      e.target.value = '';
    }

    async function processUploadedFiles(files) {
      const statusBox = document.getElementById('drop-status-box');
      const quality = parseInt(document.getElementById('img-quality').value, 10);
      const lossless = document.getElementById('img-lossless').checked;
      const outputFolder = document.getElementById('img-dest-folder').value.trim();

      statusBox.innerHTML = '⏳ Converting ' + files.length + ' image(s)...';
      let convertedCount = 0;

      for (const file of files) {
        try {
          const base64 = await readFileAsBase64(file);
          const res = await fetch('/api/images/convert-upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              filename: file.name,
              dataBase64: base64,
              outputFolder: outputFolder || undefined,
              quality,
              lossless
            })
          });
          const data = await res.json();
          if (res.ok) convertedCount++;
        } catch (err) {
          console.error('Failed to convert dropped file:', file.name, err);
        }
      }

      statusBox.innerHTML = '✅ Successfully converted and saved <strong>' + convertedCount + '</strong> WebP file(s).';
      showToast('✅ Converted ' + convertedCount + ' WebP files!');
      loadImagesStudio();
    }

    function readFileAsBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    async function openExplorerFolder() {
      const destFolder = document.getElementById('img-dest-folder').value.trim();
      try {
        await fetch('/api/images/open-folder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ folderPath: destFolder || undefined })
        });
        showToast('📂 Opened converted images folder in File Explorer.');
      } catch (err) {
        showToast('❌ ' + err.message, true);
      }
    }

    async function handleDeleteImage(filename) {
      if (!confirm('Are you sure you want to delete "' + filename + '"?')) return;
      const destFolder = document.getElementById('img-dest-folder').value.trim();
      try {
        const res = await fetch('/api/images/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename, folderPath: destFolder || undefined })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        delete cloudinaryUploadedMap[filename];
        showToast('🗑️ Deleted "' + filename + '"');
        loadImagesStudio();
      } catch (err) {
        showToast('❌ ' + err.message, true);
      }
    }

    async function uploadSingleToCloudinary(filename) {
      const cldConfig = getCloudinaryPayload();
      const destFolder = document.getElementById('img-dest-folder').value.trim();
      showToast('☁️ Uploading "' + filename + '" to Cloudinary...');

      try {
        const res = await fetch('/api/images/upload-cloudinary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename,
            folderPath: destFolder || undefined,
            ...cldConfig
          })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        cloudinaryUploadedMap[filename] = data;
        showToast('🎉 Uploaded to Cloudinary! Click "Copy MD" or "Copy URL".');
        renderConvertedImages(allConvertedImages);
      } catch (err) {
        showToast('❌ Cloudinary upload failed: ' + err.message, true);
      }
    }

    async function handleBulkUploadCloudinary() {
      if (allConvertedImages.length === 0) {
        alert('No converted WebP images available to upload. Convert some images first!');
        return;
      }
      const cldConfig = getCloudinaryPayload();
      const destFolder = document.getElementById('img-dest-folder').value.trim();
      const filenames = allConvertedImages.map(img => img.filename);

      if (!confirm('Upload all ' + filenames.length + ' images to Cloudinary (' + cldConfig.cloudName + ')?')) return;

      const pBar = document.getElementById('cld-progress-bar');
      const pFill = document.getElementById('cld-progress-fill');
      const statusEl = document.getElementById('cld-upload-status');

      pBar.style.display = 'block';
      pFill.style.width = '5%';
      statusEl.textContent = 'Uploading 0 / ' + filenames.length + '...';

      let succeeded = 0;
      let failed = 0;

      for (let i = 0; i < filenames.length; i++) {
        const fn = filenames[i];
        try {
          const res = await fetch('/api/images/upload-cloudinary', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              filename: fn,
              folderPath: destFolder || undefined,
              ...cldConfig
            })
          });
          const data = await res.json();
          if (res.ok && data.success) {
            cloudinaryUploadedMap[fn] = data;
            succeeded++;
          } else {
            failed++;
          }
        } catch {
          failed++;
        }
        const pct = Math.round(((i + 1) / filenames.length) * 100);
        pFill.style.width = pct + '%';
        statusEl.textContent = 'Uploading ' + (i + 1) + ' / ' + filenames.length + '... (' + succeeded + ' succeeded, ' + failed + ' failed)';
      }

      showToast('☁️ Bulk upload complete: ' + succeeded + ' succeeded, ' + failed + ' failed.');
      renderConvertedImages(allConvertedImages);
      setTimeout(() => { pBar.style.display = 'none'; }, 2000);
    }

    function copyToClipboard(text) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          showToast('📋 Copied to clipboard:\\n' + text);
        });
      } else {
        const t = document.createElement('textarea');
        t.value = text;
        document.body.appendChild(t);
        t.select();
        document.execCommand('copy');
        document.body.removeChild(t);
        showToast('📋 Copied:\\n' + text);
      }
    }

    function openMediaPickerForEditor() {
      if (allConvertedImages.length === 0) {
        insertFormat('![alt](https://res.cloudinary.com/dwa6rcttw/image/upload/', ')');
        return;
      }
      const options = allConvertedImages.slice(0, 8).map((img, i) => {
        const cld = cloudinaryUploadedMap[img.filename];
        return (i + 1) + ': ' + img.filename + ' ' + (cld ? '(Cloudinary URL)' : '(WebP)');
      }).join('\\n');

      const choice = prompt('Select image number to insert into article:\\n' + options + '\\nOr press Cancel for generic tag:');
      if (choice && !isNaN(parseInt(choice, 10))) {
        const selected = allConvertedImages[parseInt(choice, 10) - 1];
        if (selected) {
          const cld = cloudinaryUploadedMap[selected.filename];
          const url = cld ? cld.secure_url : '/_astro/' + selected.filename;
          insertFormat('![' + selected.filename + '](' + url + ')', '');
          return;
        }
      }
      insertFormat('![alt](https://res.cloudinary.com/dwa6rcttw/image/upload/', ')');
    }

    // Global modal escape and backdrop click handlers
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop').forEach(modal => {
          modal.style.display = 'none';
        });
      }
    });

    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
    });

    refreshStatus();
  </script>
  <div id="toast" onclick="hideToast()" title="Click to dismiss"></div>
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

export async function handleRequest(req, res) {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (req.method === 'GET') {
    if (url.pathname === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(HTML_DASHBOARD);
    }

    if (url.pathname === '/vendor/marked.min.js') {
      const markedPath = path.join(ROOT_DIR, 'node_modules', 'marked', 'marked.min.js');
      if (fs.existsSync(markedPath)) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        return res.end(fs.readFileSync(markedPath, 'utf8'));
      }
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Not found');
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

    if (url.pathname === '/api/article') {
      const slug = url.searchParams.get('slug');
      if (!slug) return sendJSON(res, 400, { error: 'Slug parameter is required.' });
      try {
        const details = getArticleDetails(slug);
        return sendJSON(res, 200, details);
      } catch (err) {
        return sendJSON(res, 404, { error: err.message });
      }
    }

    if (url.pathname === '/api/roadmap') {
      const roadmap = getRoadmapConfig();
      return sendJSON(res, 200, roadmap);
    }

    if (url.pathname === '/api/interview-questions') {
      const list = listInterviewTopics();
      return sendJSON(res, 200, list);
    }

    if (url.pathname === '/api/shorts') {
      const list = listAllShorts();
      return sendJSON(res, 200, list);
    }

    if (url.pathname === '/api/images') {
      const folder = url.searchParams.get('folder') || CONVERTED_IMAGES_DIR;
      const list = listConvertedImages(folder);
      return sendJSON(res, 200, list);
    }

    if (url.pathname.startsWith('/converted-images/')) {
      const filename = decodeURIComponent(url.pathname.replace('/converted-images/', ''));
      const safeName = path.basename(filename);
      const filePath = path.join(CONVERTED_IMAGES_DIR, safeName);
      if (fs.existsSync(filePath)) {
        const ext = path.extname(safeName).toLowerCase();
        const mimeTypes = {
          '.webp': 'image/webp',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.gif': 'image/gif',
          '.svg': 'image/svg+xml'
        };
        res.writeHead(200, {
          'Content-Type': mimeTypes[ext] || 'application/octet-stream',
          'Cache-Control': 'no-cache'
        });
        return fs.createReadStream(filePath).pipe(res);
      }
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Image not found');
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

      if (url.pathname === '/api/roadmap/add-course') {
        const result = addCourseToPath(payload);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/reorder-roadmap') {
        const result = saveRoadmapOrder(payload);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/roadmap/save-all-paths') {
        const result = saveAllRoadmapPaths(payload);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/sync-weights') {
        const result = syncSeriesWeights(payload.category);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/save-syllabus') {
        const result = saveSeriesNavbar(payload.seriesId, payload.navbar, payload.resources);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/save-resources') {
        const result = saveSeriesResources(payload.seriesId, payload.resources);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/update-series-meta') {
        const result = updateSeriesMetadata(payload.seriesId, payload.metadata);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/series/rename') {
        const result = renameSeries(payload);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/series/attach-article') {
        const result = attachArticleToSeries(payload);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/series/detach-article') {
        const result = detachArticleFromSeries(payload);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/series/delete') {
        const result = deleteSeries(payload);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/toggle-draft') {
        const result = toggleArticleDraft(payload.slug);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/article/save') {
        const result = saveArticleContent(payload);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/article/delete') {
        const result = deleteArticle(payload);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/interview-questions/save') {
        const result = saveInterviewQuestion(payload);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/interview-questions/delete') {
        const result = deleteInterviewQuestion(payload);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/interview-questions/create-topic') {
        const result = createInterviewTopic(payload);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/shorts/save') {
        const result = saveShort(payload);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/shorts/delete') {
        const result = deleteShort(payload);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/images/scan') {
        const result = scanSourceFolder(payload.inputFolder);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/images/convert-folder') {
        const result = await convertFolderImages(payload);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/images/convert-upload') {
        const result = await convertUploadedImage(payload);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/images/delete') {
        const result = deleteConvertedImage(payload);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/images/upload-cloudinary') {
        const result = await uploadToCloudinary(payload);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/images/bulk-upload-cloudinary') {
        const result = await bulkUploadToCloudinary(payload);
        return sendJSON(res, 200, result);
      }

      if (url.pathname === '/api/images/open-folder') {
        const result = openFolderInExplorer(payload?.folderPath || CONVERTED_IMAGES_DIR);
        return sendJSON(res, 200, result);
      }
    } catch (err) {
      return sendJSON(res, 400, { error: err.message });
    }
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
}

export const server = http.createServer(handleRequest);

export function startServer(port = DEFAULT_PORT, maxAttempts = 10) {
  const srv = http.createServer(handleRequest);
  srv.once('error', (err) => {
    if ((err.code === 'EADDRINUSE' || err.code === 'EACCES') && maxAttempts > 0) {
      console.warn(`⚠️ Port ${port} is unavailable (${err.code}). Trying port ${port + 1}...`);
      startServer(port + 1, maxAttempts - 1);
    } else {
      console.error(`❌ Could not start studio server:`, err.message);
    }
  });

  srv.listen(port, () => {
    console.log(`\n======================================================`);
    console.log(`⚡ CSPrimer Content Studio is LIVE and READY!`);
    console.log(`👉 Open in browser: http://localhost:${port}`);
    console.log(`======================================================\n`);
    console.log(`Press Ctrl+C to stop.\n`);
  });
  return srv;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));

if (isMain) {
  startServer(DEFAULT_PORT);
}
