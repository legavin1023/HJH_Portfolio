const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  devServer: {
    host: "0.0.0.0", // 네트워크에서 접근 가능하도록 설정
    port: 8080, // 원하는 포트 번호
    allowedHosts: "all", // 모든 호스트에서 접근 허용
  },
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
