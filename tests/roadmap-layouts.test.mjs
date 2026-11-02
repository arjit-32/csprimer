import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const roadmapOrder = JSON.parse(
  readFileSync(new URL("../src/config/roadmapOrder.json", import.meta.url), "utf8")
);

const development = roadmapOrder["Development"];
const systemDesign = roadmapOrder["System-Design"];

assert.ok(development && typeof development === "object", "Development roadmap should be configured as an object with layout metadata");
assert.equal(development.layout, "branching");
assert.ok(Array.isArray(development.paths), "Development should define multiple branching paths");
assert.ok(Array.isArray(development.paths[0].courses), "Branch paths should contain course IDs");

assert.ok(systemDesign && typeof systemDesign === "object", "System Design roadmap should be configured as an object with layout metadata");
assert.equal(systemDesign.layout, "unstructured");
assert.ok(Array.isArray(systemDesign.courses), "System Design should define independent topic cards");

console.log("roadmap layout checks passed");
