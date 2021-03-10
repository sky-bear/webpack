const { merge } = require("webpack-merge");
const BaseConfig = require("./webpack.config.base.js");
const developmentConfig = require("./webpack.config.dev.js");
const productionConfig = require("./webpack.config.prod.js");

module.exports = (env) => {
  console.log(env);
  if (env === "dev") {
    return merge([BaseConfig, developmentConfig]);
  } else {
    return merge([BaseConfig, productionConfig]);
  }
};
