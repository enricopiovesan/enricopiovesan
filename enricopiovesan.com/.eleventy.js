const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  // Copy assets and public folder
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addPassthroughCopy("src/components");

  // Plugins
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

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
