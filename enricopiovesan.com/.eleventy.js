const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const markdownIt = require("markdown-it");

function slugify(str) {
  return str.toLowerCase().replace(/<[^>]+>/g, "").trim()
    .replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/^-+|-+$/g, "");
}

module.exports = function (eleventyConfig) {
  // Markdown with HTML enabled + auto-id on headings
  const md = markdownIt({ html: true });
  const defaultHeadingRenderer = md.renderer.rules.heading_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };
  md.renderer.rules.heading_open = function(tokens, idx, options, env, self) {
    const token = tokens[idx];
    if (token.tag === "h2" || token.tag === "h3") {
      const inline = tokens[idx + 1];
      const text = inline ? inline.content : "";
      const id = slugify(text);
      token.attrSet("id", id);
    }
    return defaultHeadingRenderer(tokens, idx, options, env, self);
  };
  eleventyConfig.setLibrary("md", md);

  // Copy assets and public folder
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addPassthroughCopy({ "../whitepapers/*.pdf": "whitepapers" });
  eleventyConfig.addPassthroughCopy({ "public/404.html": "404.html" });
  eleventyConfig.addPassthroughCopy({ "public/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "public/llms.txt": "llms.txt" });
  eleventyConfig.addPassthroughCopy({ "public/CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy("src/components");

  // Plugins
  const pathPrefix = process.env.ELEVENTY_PATH_PREFIX || "/";
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin, { baseHref: pathPrefix });

  // Global data: expose pathPrefix to all templates
  eleventyConfig.addGlobalData("pathPrefix", pathPrefix);

  // Sitemap: add collection of all pages
  eleventyConfig.addCollection("allPages", function (collectionApi) {
    return collectionApi.getAll();
  });

  // Filter: extract h2 headings from HTML content for TOC
  eleventyConfig.addFilter("extractToc", (content) => {
    const matches = [...(content || "").matchAll(/<h2[^>]*(?:id="([^"]*)")?[^>]*>(.*?)<\/h2>/gi)];
    return matches.map(m => {
      const label = m[2].replace(/<[^>]+>/g, "").trim();
      const id = m[1] || slugify(label);
      return { id, label };
    }).filter(item => item.label);
  });

  // Filter: current year for footer
  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  // Filter: ISO date string (YYYY-MM-DD)
  eleventyConfig.addFilter("isoDate", (date) => {
    const d = date instanceof Date ? date : new Date(date);
    return d.toISOString().split("T")[0];
  });

  return {
    dir: {
      input: "content",
      includes: "../src/layouts",
      output: "../docs",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
};
