const allPlugins = require("./_11ty/allPlugins");
const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(allPlugins);

  eleventyConfig.addPassthroughCopy({ "img/favicon.ico": "/" });

  // Image plugin
  eleventyConfig.addShortcode("image", async function (src, alt, sizes) {
    let metadata = await Image(src, {
      // widths: [300, 600],
      formats: ["png", "jpeg"],
    });

    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
      outputDir: "_site/assets/images",
    };

    // You bet we throw an error on a missing alt (alt="" works okay)

    return Image.generateHTML(metadata, imageAttributes);
  });

  return {
    markdownTemplateEngine: "njk",
  };
};
