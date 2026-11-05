import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import { defineConfig, passthroughImageService } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";

// https://astro.build/config
export default defineConfig({
  site: "https://www.csprimer.in",
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
      ],
    }),
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'one-dark-pro',
        wrap: true,
      },
    }),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
  },
  vite: {
    build: {
      cssCodeSplit: true,
      cssMinify: true,
      minify: 'esbuild',
      assetsInlineLimit: 4096,
    },
  },
});
