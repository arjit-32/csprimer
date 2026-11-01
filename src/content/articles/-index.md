---
title: Articles
subtitle: Editorial Guide
author: Arjit Sharma
date: 2024-10-02T05:00:00Z
categories: ["DSA", "Development", "Core-CS", "System-Design"]
image: /images/og-image.jpg
featured: false
draft: false
---

## Adding a New Article

### 1. Create Article File
- Location: `src/content/articles/your-slug.md` (or `.mdx`)
- Required frontmatter:
  ```yaml
  title: Article Title
  series: course-id  # Link to course (optional for standalone)
  draft: false       # true = hidden
  year: 2025
  author: Name
  ```

### TryCode usage rules
- `TryCode` is reserved for JavaScript/TypeScript frontend interview practice only.
- Do not use it for DSA articles, algorithmic problem walkthroughs, or Java/C++ solutions.
- The runner must load a file from `src/problems/frontend/*.ts`.
- For DSA articles, keep the content as normal markdown/MDX with code blocks and prose.
- For frontend interview practice, create a standalone article and a matching problem under `src/problems/frontend/`.

Example:
```mdx
<TryCode problemId="array-unique" />
```

This will resolve to `src/problems/frontend/array-unique.ts`.

### 2. Add to Course (if part of series)
- Location: `src/content/series/{course-id}.json`
- Add to `navbar` section:
  ```json
  {
    "type": "articles",
    "url": "your-slug",
    "title": "Article Title",
    "status": "completed"
  }
  ```
- **Order matters**: Position in JSON = order in sidebar & Previous/Next

---

## Article Types

Only 2 types supported:

| Type | URL | Target | UI |
|------|-----|--------|-----|
| `articles` | `/articles/{slug}` | Same tab | Document icon |
| `external` | Original URL | New tab | Link icon |

---

## Course and Article Status (Phases)

| Status | Visible | Clickable | UI Badge |
|--------|---------|-----------|----------|
| `in-progress` | ✅ Yes | ✅ Yes | 🔄 Blue |
| `re-visiting` | ✅ Yes | ✅ Yes | 🔁 Orange |
| `planned` | ✅ Yes | ❌ Locked | 🕐 Gray |

---

## Adding a New Course

### Files to Create/Modify:

1. **Create series JSON**: `src/content/series/{course-id}.json`
   ```json
   {
     "title": "Course Title",
     "subtitle": "Brief description",
     "description": "Full description",
     "category": "Core-CS",
     "image": "../../assets/images/thumbnails/image.png",
     "navbar": [
       {
         "subheading": "Section Name",
         "link": [
           { "type": "articles", "url": "slug", "title": "Title" }
         ]
       }
     ]
   }
   ```

2. **Link articles**: Add `series: course-id` to article frontmatter

---

## UI Behavior

- **Sidebar**: Shows all course lessons, expands to current article section automatically
- **Previous/Next**: Only includes unlocked `articles` type (skips `external`)
- **Order**: Determined by JSON navbar position (left-to-right, top-to-bottom)
- **Standalone articles**: No `series` field → article listing only, no sidebar
- **Lock**: `status: planned` or `draft` → visible but not clickable

## Frontend TryCode Pattern

Use this only for browser-oriented JavaScript interview work:

```mdx
---
title: "JavaScript Interview Practice: Remove Duplicates"
author: Arjit Sharma
categories: ["JavaScript", "Frontend", "Interview"]
draft: false
---

<TryCode problemId="array-unique" />
```

Then add the problem file:

```ts
// src/problems/frontend/array-unique.ts
const problem = {
  id: "array-unique",
  title: "Remove Duplicates While Preserving Order",
  starterCode: `function solution(nums) {\n  // Your code here\n}`,
  tests: [{ input: [[1, 2, 2, 3, 1, 4]], expected: [1, 2, 3, 4] }],
};

export default problem;
```

This keeps the interactive code runner focused on frontend/JS interview tasks rather than DSA exercises.
