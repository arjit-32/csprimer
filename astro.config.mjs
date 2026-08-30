import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import { defineConfig, passthroughImageService } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import config from "./src/config/config.json";
import partytown from "@astrojs/partytown";


// https://astro.build/config
export default defineConfig({
  site: "https://www.csprimer.in",
  trailingSlash: "never",
  prefetch: {
    defaultStrategy: "hover",
  },
  image: process.env.NODE_ENV === "development" ? { service: passthroughImageService() } : {},
  integrations: [
    react(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    AutoImport({
      imports: [
        "@/components/mdx/Button",
        "@/components/mdx/Accordion",
        "@/components/mdx/Notice",
        "@/components/mdx/Video",
        "@/components/mdx/Youtube",
        "@/components/mdx/Badge",
        "@/components/mdx/Changelog",
        "@/components/mdx/Tab",
        "@/components/mdx/Tabs",
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
      assetsInlineLimit: 4096,
    },

  },
}); 