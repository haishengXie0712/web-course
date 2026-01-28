const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 9999,
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

