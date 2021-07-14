"use strict";

const { VueLoaderPlugin } = require("vue-loader");
const { VuetifyLoaderPlugin } = require("vuetify-loader");

const webpack = require("webpack"),
  path = require("path");

let config = {
  mode: "development",
  devtool: "source-map",
  entry: { gekvueentity: "./vue/main.js" },

  output: {
    path: path.resolve(__dirname, "./dist"),

    filename: "gekvueentity-bundle.js",
  },
  module: {
    rules: [
      // ... other rules
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            // Requires sass-loader@^7.0.0
            options: {
              implementation: require("sass"),
              indentedSyntax: true, // optional
            },
            // Requires >= sass-loader@^8.0.0
            options: {
              implementation: require("sass"),
              sassOptions: {
                indentedSyntax: true, // optional
              },
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|eot|svg|png)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin(),
  ],
  resolve: {
    alias: {
        vue: 'vue/dist/vue.js'
    },
},
};

module.exports = config;
