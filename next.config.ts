import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import shikiTheme from "./src/content/shiki-theme.json";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // GitHub Pages serves project sites under /<repo>/; the deploy workflow sets this. Empty locally.
  basePath: process.env.PAGES_BASE_PATH ?? "",
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    // Build-time syntax highlighting (shiki). shiki-theme.json's colors are
    // copied from this app's own palette in globals.css (:root and its dark
    // media query) — keep the two in sync if the palette ever changes.
    // defaultColor: false makes every token carry both --shiki-light and
    // --shiki-dark instead of one baked-in color; globals.css picks between
    // them with the same prefers-color-scheme query the rest of the theme uses.
    rehypePlugins: [
      [
        "rehype-pretty-code",
        { theme: shikiTheme, defaultColor: false, keepBackground: false },
      ],
    ],
  },
});

export default withMDX(nextConfig);
