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
        "@/components/mdx/Button.jsx",
        "@/components/mdx/Accordion.astro",
        "@/components/mdx/Notice.jsx",
        "@/components/mdx/Video.jsx",
        "@/components/mdx/Youtube.astro",
        "@/components/mdx/Badge.jsx",
        "@/components/mdx/Changelog.jsx",
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
      assetsInlineLimit: 4096,
    },

  },
}); 