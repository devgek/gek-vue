"use strict";

const webpack = require("webpack"),
  path = require("path");

let config = {
  mode: "development",
  entry: { gekvueentity: "./src/main.js" },

  output: {
    path: path.resolve(__dirname, "./dist"),

    filename: "gekvueentity-bundle.js",
  },
};

module.exports = config;
