"use strict";
const common_vendor = require("../../common/vendor.js");
const store_like = require("../../store/like.js");
const _sfc_main = {
  __name: "list",
  setup(__props) {
    const Store = store_like.likeStore();
    const likeList = common_vendor.ref([]);
    const isHover = common_vendor.ref(false);
    common_vendor.ref(0);
    const isVideoPlay = common_vendor.ref(false);
    const videoUrl = common_vendor.ref("");
    const ischange = common_vendor.ref(false);
    const offsetmap = common_vendor.ref([]);
    likeList.value = Store.likeList;
    offsetmap.value = Array.from({ length: likeList.value.length }, (_, index) => ({
      index,
      offset: 0
    }));
    function ontouchstart(e, index) {
      common_vendor.index.__f__("log", "at pages/list/list.vue:48", e.touches[0].screenX);
    }
    function ontouchmove(e, index) {
      common_vendor.index.__f__("log", "at pages/list/list.vue:53", e.changedTouches[0].screenX);
    }
    function ontouchend(e, index) {
      common_vendor.index.__f__("log", "at pages/list/list.vue:58", e.changedTouches[0].screenX);
    }
    const ended = () => {
      isVideoPlay.value = false;
      isHover.value = false;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(likeList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.o((e) => ontouchstart(e, item.id), item.id),
            c: common_vendor.o((e) => ontouchmove(e, item.id), item.id),
            d: common_vendor.o((e) => ontouchend(e, item.id), item.id),
            e: item.id
          };
        }),
        b: "translateX(" + _ctx.offset + "px)",
        c: ischange.value ? 1 : "",
        d: videoUrl.value,
        e: common_vendor.o((...args) => _ctx.end && _ctx.end(...args)),
        f: isVideoPlay.value,
        g: isHover.value,
        h: common_vendor.o(ended)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-98a9e0b2"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/list/list.js.map
