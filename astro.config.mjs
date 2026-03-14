import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import { defineConfig } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import config from "./src/config/config.json";


import partytown from "@astrojs/partytown";


// https://astro.build/config
export default defineConfig({
  site: "https://www.csprimer.in",
  trailingSlash: "never",
  image: {},
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    AutoImport({
      imports: [
        "@/shortcodes/Button",
        "@/shortcodes/Accordion",
        "@/shortcodes/Notice",
        "@/shortcodes/Video",
        "@/shortcodes/Youtube",
        "@/shortcodes/Blockquote",
        "@/shortcodes/Badge",
        "@/shortcodes/ContentBlock",
        "@/shortcodes/Changelog",
        "@/shortcodes/Tab",
        "@/shortcodes/Tabs",
      ],
    }),
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'one-dark-pro',
        wrap: true,
      },
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
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
    extendDefaultPlugins: true,
  },
  vite: {
    build: {
      cssCodeSplit: true,
      assetsInlineLimit: 4096,
    },
    ssr: {
      noExternal: ["@astrojs/partytown"],
    },
  },
});