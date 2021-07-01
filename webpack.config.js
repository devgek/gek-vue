"use strict";

const webpack = require("webpack"),
  path = require("path");

let config = {
  mode: "development",
  entry: { gekvue: "./src/index.js" },

  output: {
    path: path.resolve(__dirname, "./dist"),

    filename: "gekvue-bundle.js",
  },
};

module.exports = config;
