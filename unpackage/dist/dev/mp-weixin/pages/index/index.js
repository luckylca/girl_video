"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  basic();
}
const basic = () => "../../components/basic/basic.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.onBeforeMount(() => {
      common_vendor.index.setStorage({
        key: "autoplay",
        data: false
      });
      common_vendor.index.setStorage({
        key: "line",
        data: 0
      });
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
