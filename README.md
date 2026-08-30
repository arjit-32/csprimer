# Computer Science Primer (CSPrimer)

CSPrimer is a comprehensive, open-source educational platform designed to help developers master foundational computer science subjects and real-world full-stack development skills.

Built with performance and scalability in mind, CSPrimer leverages a modern web stack to deliver a blazing-fast, static site featuring interactive MDX articles, in-browser code evaluation, and an extensive repository of interview questions.

## 🚀 Tech Stack

- **Framework:** [Astro](https://astro.build/) (v4) - For ultra-fast static site generation (SSG).
- **UI Components:** [React](https://reactjs.org/) (v18) - Used for complex interactive islands (like the code editor and dynamic tabs).
- **Content:** MDX (Markdown + JSX) - Allows seamlessly embedding React components within markdown articles.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & SCSS - For utility-first, responsive, and scalable styling.
- **Language:** TypeScript - For type safety and better developer experience.

## 📁 Architecture & Directory Structure

The project strictly follows a domain-driven architectural pattern to ensure scalability and maintainability:

```text
src/
├── components/          # All reusable UI and logic components
│   ├── features/        # Complex, domain-specific modules
│   │   ├── blog/        # Components for rendering blog/article lists (Blogs, Categories)
│   │   ├── dialogs/     # Interactive dialogs (e.g., QuestionDialog)
│   │   └── editor/      # In-browser IDE components (e.g., TryCode.astro)
│   ├── layout/          # Global layout partials (Header, Footer, Cta)
│   ├── mdx/             # Shortcode components explicitly designed to be used inside .mdx files (Tabs, Accordions, Youtube)
│   └── ui/              # Generic, reusable UI elements (Buttons, Banners, Badges, Pagination)
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

## ✨ Key Features

1. **Scalable MDX Ecosystem:** 
   Articles are written in standard Markdown with the superpower of embedded React/Astro components (Shortcodes). Features like `<Tabs>` and `<Accordion>` are robust, SEO-friendly, and natively integrated.
2. **In-Browser Code Editor:**
   The `TryCode` feature dynamically imports specific problem files (`src/problems/`) on demand, preventing build bloat while allowing users to write and execute code directly in their browser using Monaco Editor.
3. **High-Performance Interview Questions:**
   A massive bank of interview questions managed in YAML format is exposed via an optimized static API (`/api/questions.json`). This ensures the site remains lightning fast without polluting the HTML payload, regardless of how many questions are added.

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
