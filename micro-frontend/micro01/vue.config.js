const { defineConfig } = require("@vue/cli-service");
const pkgName = "micro01";
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8888,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: (config) => {
    const pkgName = "micro01";
    config.output.libraryTarget = "umd";
    config.output.library = `${pkgName}-[name]`;
    config.output.chunkLoadingGlobal = `webpackJsonp_${pkgName}`;
  },
});

