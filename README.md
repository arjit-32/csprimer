# Computer Science Primer (CSPrimer)

CSPrimer is a comprehensive, open-source educational platform designed to help developers master foundational computer science subjects and real-world full-stack development skills.

Built with extreme performance and excellent user experience (UX) in mind, CSPrimer leverages a highly optimized modern web stack. It delivers a blazing-fast static site featuring interactive MDX articles, an embedded persistence-aware code editor, and an extensive, lightning-fast repository of interview questions.

## 🚀 Tech Stack

- **Framework:** [Astro](https://astro.build/) (v4) - Powers the ultra-fast static site generation (SSG). We enforce a "zero-JS by default" philosophy for content pages.
- **Content:** MDX (Markdown + Astro/JSX) - Allows embedding native `.astro` components directly within markdown articles.
- **Interactivity:** Vanilla JS & Astro View Transitions - Used for complex interactive elements (like tabs and accordions) to completely eliminate React hydration overhead on standard content pages.
- **Code Editor:** [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Dynamically imported and globally cached across View Transitions to ensure instant loading during DSA practice without network delay.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & SCSS - For utility-first, highly optimized, and responsive styling with minimal CSS footprints.
- **Assets:** Astro Native Image Optimization (`astro:assets`) - Automatic conversion to modern formats (WebP) to ensure exceptional Core Web Vitals (LCP, CLS).

## 📁 Architecture & Directory Structure

The project strictly follows a domain-driven architectural pattern to ensure scalability, performance, and maintainability:

```text
src/
├── assets/              # Static assets (images) optimized via Astro's image pipeline
├── components/          # All reusable UI and logic components
│   ├── features/        # Complex, domain-specific modules
│   │   ├── blog/        # Components for rendering blog/article lists
│   │   ├── dialogs/     # Interactive dialogs (e.g., QuestionDialog)
│   │   └── editor/      # In-browser IDE components (e.g., TryCode.astro)
│   ├── layout/          # Global layout partials (Header, Footer, Cta)
│   ├── mdx/             # Native .astro shortcodes designed for .mdx files (Tabs, Accordion, Youtube)
│   └── ui/              # Generic, reusable UI elements
│
├── content/             # The core database (Content Collections)
│   ├── articles/        # MDX files containing course and tutorial content
│   ├── interview-questions/ # YAML data collections of interview questions
│   └── ...              # Other collections (series, pages, shorts)
│
├── layouts/             # High-level page wrappers
│   ├── Base.astro       # The global HTML shell and SEO wrapper
│   └── BlogSingle.astro # The layout template for individual MDX articles
│
├── pages/               # Astro file-based routing
│   ├── api/             # API endpoints (e.g., questions.json.ts for dynamic client fetching)
│   ├── articles/        # Article listing and dynamic routing
│   └── index.astro      # The homepage
│
├── problems/            # TypeScript files defining code challenges and test cases
└── styles/              # Global SCSS and Tailwind directives
```

## ✨ Key Features & Performance Optimizations

1. **Zero-Hydration Content Ecosystem:** 
   Articles are written in MDX using native `.astro` components (like `<Tabs>`, `<Accordion>`, and `<Youtube>`). By relying on Vanilla JS and Web Components (`lite-youtube-embed`) instead of React wrappers, the site achieves a near-zero initial JS payload, resulting in instantaneous page loads.
2. **Persistent In-Browser Code Editor:**
   The `TryCode` feature dynamically imports the Monaco editor *only* when a user clicks "Practice". Thanks to Astro View Transitions, the editor instance is cached on the global `window` object, meaning subsequent code challenges across different articles load instantly without re-fetching core libraries.
3. **High-Performance Interview Questions:**
   A massive bank of interview questions managed in YAML format is exposed via an optimized static API (`/api/questions.json`). The API pre-resolves and optimizes all associated images, ensuring the site remains lightning fast regardless of how many questions are added.
4. **Blazing Fast UX:**
   Carefully curated dependencies, aggressive code splitting, and strict avoidance of thread-blocking scripts ensure excellent Core Web Vitals (LCP, INP, CLS).

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation
Clone the repository and install dependencies:
```bash
npm install
```

### Local Development
Start the Astro development server. It includes hot-module replacement (HMR).
```bash
npm run dev
```

### Building for Production
Create an optimized, minified static build of the entire site:
```bash
npm run build
```
The output will be generated in the `dist/` directory, ready to be deployed to any static host (GitHub Pages, Vercel, Netlify, AWS S3).

## 📄 License
This project is licensed under the MIT License.
