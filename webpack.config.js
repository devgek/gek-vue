"use strict";

// eslint-disable-next-line no-undef
const { VueLoaderPlugin } = require("vue-loader");
// eslint-disable-next-line no-undef
const { VuetifyLoaderPlugin } = require("vuetify-loader");

// eslint-disable-next-line no-undef,no-unused-vars
const webpack = require("webpack"),
    // eslint-disable-next-line no-undef
  path = require("path");

let config;
config = {
  mode: "development",
  devtool: "source-map",
  entry: {gekvueentity: "./vue/main.js"},

  output: {
    // eslint-disable-next-line no-undef
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
            // Requires >= sass-loader@^8.0.0
            options: {
              // eslint-disable-next-line no-undef
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
      vue: 'vue/dist/vue.js',
      '@': path.resolve('vue')
    },
  },
};

// eslint-disable-next-line no-undef
module.exports = config;
