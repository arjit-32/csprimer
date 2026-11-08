import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

console.log("Running locked courses & banner counts verification tests...");

// 1. Verify build artifacts
assert.ok(existsSync("dist/courses/index.html"), "Courses page build output exists");
assert.ok(existsSync("dist/articles/index.html"), "Articles page build output exists");
assert.ok(existsSync("dist/roadmaps/index.html"), "Roadmaps page build output exists");

// 2. Check courses banner count
const coursesHtml = readFileSync("dist/courses/index.html", "utf8");
const courseBannerMatch = coursesHtml.match(/([0-9]+)\s*Courses/i);
assert.ok(courseBannerMatch, "Courses banner has course count");
const courseCount = parseInt(courseBannerMatch[1], 10);
assert.equal(courseCount, 23, "Courses banner should only count active/available courses (23), excluding the 22 planned ones");

// 3. Check articles banner count
const articlesHtml = readFileSync("dist/articles/index.html", "utf8");
const articlesBannerMatch = articlesHtml.match(/([0-9]+)\s*Projects & Deep Dives/i);
assert.ok(articlesBannerMatch, "Articles banner has projects count");
const projectsCount = parseInt(articlesBannerMatch[1], 10);
assert.equal(projectsCount, 2, "Articles banner should only count published standalone projects, excluding course series lessons and drafts");

// 4. Check roadmaps banner and locked items
const roadmapsHtml = readFileSync("dist/roadmaps/index.html", "utf8");

// Active topics in DSA track
const dsaTopicsMatch = roadmapsHtml.match(/interactive-DSA[\s\S]*?([0-9]+)\s*Topics/);
assert.ok(dsaTopicsMatch, "DSA track has topics count");
const dsaActiveTopics = parseInt(dsaTopicsMatch[1], 10);
assert.equal(dsaActiveTopics, 2, "DSA track banner should only count active topics (2), excluding 19 planned topics");

// Check locked nodes exist on roadmaps page
assert.ok(roadmapsHtml.includes("is-locked"), "Roadmaps HTML contains is-locked nodes");
assert.ok(roadmapsHtml.includes("drawer-course-locked-badge"), "CourseDrawer has locked badge markup");

// Verify that pagination pages in articles do not over-paginate by counting all series
assert.ok(!existsSync("dist/articles/page/5/index.html"), "Spurious pagination pages should not exist");

console.log("All locked courses and banner count verification tests passed successfully!");

