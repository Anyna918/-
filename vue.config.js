const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  lintOnSave: false, // 禁用Eslint
  transpileDependencies: true,
  devServer: {
    client: {
      overlay: false // 关闭编译时的错误/警告全屏覆盖
    },
  },
});

