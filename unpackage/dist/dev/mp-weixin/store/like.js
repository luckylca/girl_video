"use strict";
const common_vendor = require("../common/vendor.js");
const likeStore = common_vendor.defineStore("like", () => {
  const likeList = common_vendor.ref([]);
  const addLikeList = (tempLikeItem) => {
    likeList.value = [...likeList.value, tempLikeItem];
  };
  const removeLikeList = () => {
    likeList.value.pop();
  };
  return { likeList, addLikeList, removeLikeList };
});
exports.likeStore = likeStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/like.js.map
