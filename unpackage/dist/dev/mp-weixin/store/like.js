"use strict";
const common_vendor = require("../common/vendor.js");
const likeStore = common_vendor.defineStore("like", () => {
  const storedData1 = common_vendor.index.getStorageSync("likeList");
  const storedData2 = common_vendor.index.getStorageSync("downloadTitleList");
  const likeList = common_vendor.ref(storedData1 ? JSON.parse(storedData1) : []);
  const downloadTitleList = common_vendor.ref(storedData2 ? JSON.parse(storedData2) : []);
  const addLikeList = (tempLikeItem) => {
    likeList.value = [...likeList.value, tempLikeItem];
  };
  const addDownloadTitleList = (title) => {
    downloadTitleList.value = [...downloadTitleList.value, title];
  };
  const removeLikeList = () => {
    likeList.value = likeList.value.slice(0, -1);
  };
  const updataLikeList = (list) => {
    likeList.value = list;
  };
  common_vendor.watch(
    () => likeList.value,
    (newVal) => {
      common_vendor.index.setStorageSync("likeList", JSON.stringify(newVal));
    },
    { deep: true }
  );
  common_vendor.watch(
    () => downloadTitleList.value,
    (newVal) => {
      common_vendor.index.setStorageSync("downloadTitleList", JSON.stringify(newVal));
    },
    { deep: true }
  );
  return { likeList, addLikeList, removeLikeList, updataLikeList, downloadTitleList, addDownloadTitleList };
});
exports.likeStore = likeStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/like.js.map
