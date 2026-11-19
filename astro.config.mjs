import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import { defineConfig, passthroughImageService } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import { visit } from "unist-util-visit";

function rehypeLazyImages() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "img") {
        node.properties = node.properties || {};
        node.properties.loading = node.properties.loading || "lazy";
        node.properties.decoding = node.properties.decoding || "async";
      }
    });
  };
}

// https://astro.build/config
export default defineConfig({
  site: "https://csprimer.org",
  trailingSlash: "never",
  prefetch: {
    defaultStrategy: "hover",
  },
  image: process.env.NODE_ENV === "development" ? { service: passthroughImageService() } : {},
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    AutoImport({
      imports: [
        "@/components/mdx/Button.astro",
        "@/components/mdx/Accordion.astro",
        "@/components/mdx/Notice.astro",
        "@/components/mdx/Video.astro",
        "@/components/mdx/Youtube.astro",
        "@/components/mdx/Badge.astro",
        "@/components/mdx/Changelog.astro",
        "@/components/mdx/Tab.astro",
        "@/components/mdx/Tabs.astro",
        "@/components/features/editor/TryCode.astro",
        "@/components/features/visualizer/AlgoVisualizer.astro",
        "@/visualizations/git/GitVisualizer.astro",
      ],
    }),
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'one-dark-pro',
        wrap: true,
      },
      rehypePlugins: [rehypeLazyImages],
    }),
    sitemap(),
  ],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true,
    },
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    rehypePlugins: [rehypeLazyImages],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    build: {
      cssCodeSplit: true,
      cssMinify: true,
      minify: 'esbuild',
      assetsInlineLimit: 4096,
      rollupOptions: {
        maxParallelFileOps: 20,
      },
    },
  },
});
