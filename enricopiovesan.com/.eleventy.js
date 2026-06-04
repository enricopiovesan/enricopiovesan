const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  // Markdown with HTML enabled
  eleventyConfig.setLibrary("md", markdownIt({ html: true }));

  // Copy assets and public folder
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addPassthroughCopy({ "../whitepapers": "whitepapers" });
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
