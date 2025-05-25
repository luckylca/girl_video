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
    likeList.value = Store.likeList;
    const enterVideo = (id) => {
      isVideoPlay.value = true;
      videoUrl.value = likeList.value[id].url;
      isHover.value = true;
    };
    const ended = () => {
      isVideoPlay.value = false;
      isHover.value = false;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(likeList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.o(($event) => enterVideo(item.id))
          };
        }),
        b: isHover.value,
        c: videoUrl.value,
        d: common_vendor.o((...args) => _ctx.end && _ctx.end(...args)),
        e: isVideoPlay.value,
        f: isHover.value,
        g: common_vendor.o(ended)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-98a9e0b2"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/list/list.js.map
