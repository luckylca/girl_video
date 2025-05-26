"use strict";
const common_vendor = require("../../common/vendor.js");
const store_like = require("../../store/like.js");
const _sfc_main = {
  __name: "downloadList",
  setup(__props) {
    const Store = store_like.likeStore();
    const isHover = common_vendor.ref(false);
    common_vendor.ref(0);
    const isVideoPlay = common_vendor.ref(false);
    const videoUrl = common_vendor.ref("");
    const downloadList = common_vendor.ref([]);
    const downloadTitleList = common_vendor.ref([]);
    downloadTitleList.value = Store.downloadTitleList;
    common_vendor.index.getSavedFileList({
      success(res) {
        downloadList.value = res.fileList;
      }
    });
    const enterVideo = (id) => {
      isVideoPlay.value = true;
      videoUrl.value = downloadList.value[id].filePath;
      isHover.value = true;
    };
    const ended = () => {
      isVideoPlay.value = false;
      isHover.value = false;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(downloadList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(downloadTitleList.value[index]),
            b: common_vendor.o(($event) => enterVideo(index), index),
            c: index
          };
        }),
        b: videoUrl.value,
        c: common_vendor.o((...args) => _ctx.end && _ctx.end(...args)),
        d: isVideoPlay.value,
        e: isHover.value,
        f: common_vendor.o(ended)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ac326b99"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/downloadList/downloadList.js.map
