"use strict";
const common_vendor = require("../common/vendor.js");
const likeStore = common_vendor.defineStore("like", () => {
  const storedData = common_vendor.index.getStorageSync("likeList");
  const likeList = common_vendor.ref(storedData ? JSON.parse(storedData) : []);
  const addLikeList = (tempLikeItem) => {
    likeList.value = [...likeList.value, tempLikeItem];
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
  return { likeList, addLikeList, removeLikeList, updataLikeList };
});
exports.likeStore = likeStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/like.js.map
