"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const uni_modules_piniaPluginUnistorage_index = require("./uni_modules/pinia-plugin-unistorage/index.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/setting/setting.js";
  "./pages/info/info.js";
  "./pages/list/list.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:4", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:7", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:10", "App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  const store = common_vendor.createPinia();
  store.use(uni_modules_piniaPluginUnistorage_index.createUnistorage());
  app.use(store);
  return {
    app,
    Pinia: common_vendor.Pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
