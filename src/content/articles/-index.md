---
title: "Projects & Articles"
meta_title: "Articles & Projects | CSPrimer"
description: "Practical engineering projects, system design architectures, and foundational computer science deep dives."
image: "/images/og-image.jpg"
categories: ["Development", "Core-CS", "System-Design", "DSA", "AI-Engineering"]
draft: false
---

# Articles Collection Schema & Type Reference

This file defines the static type contract, frontmatter schema, and allowed values for all content located in `src/content/articles/`.

For the complete step-by-step authoring guide and interactive component playground, refer to `/elements` (`src/content/pages/elements.mdx`).

---

## 1. Schema Definition

Articles are defined in `src/content/config.ts` using Astro's `defineCollection`. Every `.md` or `.mdx` file in this directory must conform to this schema.

### Field Specifications

| Field | Type | Required | Default | Allowed Values / Constraints | Description |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `title` | `string` | **Yes** | — | Any non-empty string | Article title shown in headings and cards |
| `subtitle` | `string` | No | `undefined` | Any string | Secondary subhead for lessons or deep dives |
| `meta_title` | `string` | No | `undefined` | String (≤ 60 chars recommended) | SEO `<title>` tag override |
| `description` | `string` | No | `undefined` | String (≤ 160 chars recommended) | Meta and OpenGraph description |
| `image` | `string` | No | `undefined` | Path relative to `/public` or `/src/assets` | Social share preview & card cover image |
| `author` | `string` | No | `undefined` | e.g., `"Arjit Sharma"` | Content creator name |
| `series` | `string` | No | `undefined` | Matches `{course-id}` in `src/content/series/` | Links article to a course syllabus. Omit for standalone articles |
| `categories` | `string[]` | No | `["others"]` | See Allowed Categories below | Classification tag for filtering and roadmaps |
| `draft` | `boolean` | No | `false` | `true`, `false` | If `true`, page is excluded from public builds |
| `year` | `number` | No | `undefined` | Valid 4-digit year (e.g. `2025`) | Publishing / revision year |
| `featured` | `boolean` | No | `false` | `true`, `false` | Highlighted in the top featured carousel |

---

## 2. Allowed Values & Enumerations

### Supported Categories

The `categories` array should only contain values recognized across the site filters, navigation, and roadmap parsers:

- `"Core-CS"`: Computer architecture, operating systems, databases, networking, compilers.
- `"DSA"`: Data structures, algorithms, complexity analysis, problem walkthroughs.
- `"Development"`: Frontend, backend, fullstack frameworks, APIs, tooling.
- `"System-Design"`: Distributed systems, microservices, cloud patterns, scalability.
- `"AI-Engineering"`: Machine learning, LLM integrations, embeddings, AI agents.
- `"others"`: Fallback category.

### Series Identifier (`series`)

- When set, the value **must match exactly** the filename of a course in `src/content/series/{course-id}.json` (without `.json`).
- If an article is standalone (a one-off tutorial or project), **omit the `series` field entirely**.

---

## 3. Frontmatter Templates

### Minimal Template (Standalone Article)

```yaml
---
title: "Building a Simple In-Memory Cache in TypeScript"
description: "Understand eviction policies by building an LRU cache from scratch."
categories: ["Development"]
draft: false
---
```

### Course Lesson Template

```yaml
---
title: "Understanding the TCP Three-Way Handshake"
subtitle: "How reliable connections are established under the hood"
author: "Arjit Sharma"
series: "cn"
categories: ["Core-CS"]
draft: false
---
```

### Complete Template (All Fields)

```yaml
---
title: "Deploying a Production-Grade Node.js Service on AWS EC2"
subtitle: "A complete walkthrough covering Nginx, PM2, and SSL certificates"
meta_title: "Deploy Node.js to AWS EC2 | Production Guide"
description: "Step-by-step tutorial on taking a raw Ubuntu EC2 instance to a live, secure Node.js API server."
image: "/images/og-image.jpg"
author: "Arjit Sharma"
series: "aws"
categories: ["Development", "System-Design"]
draft: false
year: 2025
featured: true
---
```

---

## 4. TypeScript Type Definition

```typescript
export interface ArticleFrontmatter {
  title: string;
  subtitle?: string;
  meta_title?: string;
  description?: string;
  image?: string;
  author?: string;
  series?: string;
  categories: ("Core-CS" | "DSA" | "Development" | "System-Design" | "AI-Engineering" | "others")[];
  draft?: boolean;
  year?: number;
  featured?: boolean;
}
```
