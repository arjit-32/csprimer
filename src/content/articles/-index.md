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
