const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "/HJH_Portfolio/" : "/",
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
});
