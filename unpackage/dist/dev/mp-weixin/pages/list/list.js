"use strict";
const store_like = require("../../store/like.js");
const common_vendor = require("../../common/vendor.js");
const Store = store_like.likeStore();
const likeList = common_vendor.ref([]);
likeList.value = Store.likeList;
const _sfc_main = {};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f(_ctx.likeList, (item, k0, i0) => {
      return {
        a: item.url,
        b: item.id
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/list/list.js.map
