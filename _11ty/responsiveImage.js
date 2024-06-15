"use strict";

const { cpus } = require("os");
const { join, extname, basename } = require("path");
const { access } = require("fs").promises;
const Image = require("@11ty/eleventy-img");

Image.concurrency = cpus().length;

module.exports = function responsiveImage(config) {
  // Add responsive image helper
  config.addNunjucksAsyncShortcode(
    "responsiveImage",
    async function (src, alt, options = {}) {
      if (typeof alt === "undefined") {
        throw new Error(`Missing \`alt\` on responsiveImage from: ${src}`);
      }

      const inputImage = join(__dirname, "..", src);
      // makes sure that the input picture exists
      await access(inputImage);

      options.formats = ["png", "webp"];
      options.outputDir = join(__dirname, "..", "_site", "img");
      // options.widths = [null, 64];
      options.filenameFormat = function (id, src, width, format, options) {
        const ext = extname(src);
        const name = basename(src, ext);

        if (width) {
          return `${name}-${id}-${width}.${format}`;
        }

        return `${name}-${id}.${format}`;
      };

      const stats = await Image(inputImage, options);

      const lowestSrc = stats.png[0];

      const html = `
      <img class="w-14 mb-8" src="${lowestSrc.url}" alt="${alt}" />`;
      return html;
    }
  );
};
