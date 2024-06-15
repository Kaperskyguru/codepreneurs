"use strict";

const responsiveImage = require("./responsiveImage");

module.exports = function allPlugins(config) {
  config.setUseGitIgnore(false);
  config.addPlugin(responsiveImage);
};
