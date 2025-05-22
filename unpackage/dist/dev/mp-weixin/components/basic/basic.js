"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_like = require("../../store/like.js");
const _sfc_main = {
  __name: "basic",
  setup(__props) {
    const url = common_vendor.ref("https://alimov2.a.kwimgs.com/upic/2023/03/14/07/BMjAyMzAzMTQwNzMyMDRfMzEyNDcxOTkyNF85ODE2OTI5OTUxM18xXzM=_b_B48c337e8ee1a614653d500c9c3c6cf2c.mp4?clientCacheKey=3xhiww7s3qui8ng_b.mp4&tt=b&di=b72e16c7&bp=13414\n");
    let index = 0;
    const urls = [
      "http://api.yujn.cn/api/zzxjj.php?type=json",
      "http://api.yujn.cn/api/xjj.php?type=json",
      "https://api.yujn.cn/api/nvda.php?type=json",
      "http://api.yujn.cn/api/heisis.php?type=json",
      "https://api.yujn.cn/api/manzhan.php?type=json",
      "http://api.yujn.cn/api/baisis.php?type=json",
      "http://api.yujn.cn/api/wmsc.php?type=json",
      "http://api.yujn.cn/api/shejie.php?type=json",
      "http://api.yujn.cn/api/diaodai.php?type=json",
      "http://api.yujn.cn/api/jpmt.php?type=json",
      "http://api.yujn.cn/api/hanfu.php?type=json",
      "http://api.yujn.cn/api/qingchun.php?type=json",
      "http://api.yujn.cn/api/luoli.php?type=json"
    ];
    const isautoplay = common_vendor.ref(false);
    common_vendor.ref(null);
    const isAni = common_vendor.ref(false);
    const islike = common_vendor.ref(false);
    const likeList = common_vendor.ref([]);
    const tempLikeItem = {
      id: 0,
      url: ""
    };
    const Store = store_like.likeStore();
    function like() {
      islike.value = !islike.value;
      if (islike.value) {
        tempLikeItem.id = likeList.value.length;
        tempLikeItem.url = url.value;
        Store.addLikeList(tempLikeItem);
      } else {
        Store.removeLikeList();
      }
      common_vendor.index.__f__("log", "at components/basic/basic.vue:67", Store.likeList);
    }
    function getStorageSync(key) {
      return new Promise((resolve, reject) => {
        common_vendor.index.getStorage({
          key,
          success(res) {
            resolve(res.data);
          },
          fail(err) {
            reject(err);
          }
        });
      });
    }
    async function get_video() {
      isAni.value = true;
      islike.value = false;
      isautoplay.value = await getStorageSync("autoplay");
      index = await getStorageSync("line");
      common_vendor.index.showNavigationBarLoading();
      common_vendor.index.request({
        url: urls[index]
      }).then((res) => {
        url.value = res.data.data;
        common_vendor.index.__f__("log", "at components/basic/basic.vue:94", urls[index]);
      }).finally(() => {
        common_vendor.index.hideNavigationBarLoading();
        common_vendor.index.hideLoading();
      });
      setTimeout(() => {
        isAni.value = false;
      }, 300);
    }
    function end() {
      if (isautoplay.value === true) {
        get_video();
      } else if (isautoplay.value === false)
        ;
    }
    common_vendor.onMounted(() => {
      likeList.value = common_vendor.index.getStorageSync("like");
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: url.value,
        b: common_vendor.o(end),
        c: !islike.value
      }, !islike.value ? {
        d: common_assets._imports_0,
        e: common_vendor.o(like)
      } : {
        f: common_assets._imports_1,
        g: common_vendor.o(like)
      }, {
        h: isAni.value ? 1 : "",
        i: common_vendor.o(get_video),
        j: common_assets._imports_2
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-63ee2589"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/basic/basic.js.map
