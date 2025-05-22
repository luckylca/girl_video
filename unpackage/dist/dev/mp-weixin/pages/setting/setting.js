"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_drawer2 = common_vendor.resolveComponent("uni-drawer");
  (_easycom_uni_data_checkbox2 + _easycom_uni_drawer2)();
}
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_drawer = () => "../../uni_modules/uni-drawer/components/uni-drawer/uni-drawer.js";
if (!Math) {
  (_easycom_uni_data_checkbox + _easycom_uni_drawer)();
}
const _sfc_main = {
  __name: "setting",
  setup(__props) {
    const isChecked = common_vendor.ref(false);
    const showRight = common_vendor.ref(null);
    const value = common_vendor.ref(0);
    const date = common_vendor.ref([{ "value": 0, "text": "小姐姐1" }, { "value": 1, "text": "小姐姐2" }, { "value": 2, "text": "女大学生" }, { "value": 3, "text": "黑丝" }, { "value": 4, "text": "cos" }, { "value": 5, "text": "白丝" }, { "value": 6, "text": "身材" }, { "value": 7, "text": "蛇姐" }, { "value": 8, "text": "吊带" }, { "value": 9, "text": "玉足" }, { "value": 10, "text": "汉服" }, { "value": 11, "text": "清纯" }, { "value": 12, "text": "萝莉" }]);
    const srcurl = common_vendor.ref("https://c-ssl.duitang.com/uploads/blog/202209/07/20220907194454_d5cfc.jpg");
    const account = common_vendor.ref("");
    function change() {
      common_vendor.index.__f__("log", "at pages/setting/setting.vue:48", value.value);
      common_vendor.index.setStorage({
        key: "line",
        data: value.value
      });
    }
    function info() {
      common_vendor.index.navigateTo({
        url: "../info/info"
      });
    }
    function onSwitchChange() {
      isChecked.value = !isChecked.value;
      common_vendor.index.setStorage({
        key: "autoplay",
        data: isChecked.value
      });
      common_vendor.index.__f__("log", "at pages/setting/setting.vue:72", isChecked.value);
    }
    function openDrawer() {
      showRight.value.open();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: srcurl.value,
        b: account.value
      }, account.value ? {
        c: common_vendor.t(account.value)
      } : {}, {
        d: isChecked.value,
        e: common_vendor.o(($event) => onSwitchChange(_ctx.e)),
        f: common_vendor.o(openDrawer),
        g: common_vendor.o(info),
        h: common_vendor.o(change),
        i: common_vendor.o(($event) => value.value = $event),
        j: common_vendor.p({
          mode: "list",
          localdata: date.value,
          multiple: false,
          modelValue: value.value
        }),
        k: common_vendor.sr(showRight, "018cdf56-0", {
          "k": "showRight"
        }),
        l: common_vendor.p({
          mode: "right",
          width: 150
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-018cdf56"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/setting/setting.js.map
