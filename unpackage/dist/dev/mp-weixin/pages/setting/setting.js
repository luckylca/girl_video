"use strict";
const common_vendor = require("../../common/vendor.js");
const store_like = require("../../store/like.js");
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
    common_vendor.ref("L");
    const date = common_vendor.ref([{ "value": 0, "text": "小姐姐1" }, { "value": 1, "text": "小姐姐2" }, { "value": 2, "text": "女大学生" }, { "value": 3, "text": "黑丝" }, { "value": 4, "text": "cos" }, { "value": 5, "text": "白丝" }, { "value": 6, "text": "身材" }, { "value": 7, "text": "蛇姐" }, { "value": 8, "text": "吊带" }, { "value": 9, "text": "玉足" }, { "value": 10, "text": "汉服" }, { "value": 11, "text": "清纯" }, { "value": 12, "text": "萝莉" }]);
    const userSrc = common_vendor.ref("https://tse4-mm.cn.bing.net/th/id/OIP-C.Nj6o69waOC3JTbebyCu-hgHaEc?cb=iwp2&rs=1&pid=ImgDetMain");
    const loginSrc = common_vendor.ref("https://tse4-mm.cn.bing.net/th/id/OIP-C.Nj6o69waOC3JTbebyCu-hgHaEc?cb=iwp2&rs=1&pid=ImgDetMain");
    const Store = store_like.likeStore();
    const isShow = common_vendor.ref(false);
    const account = common_vendor.ref("");
    const password = common_vendor.ref("");
    const name = common_vendor.ref("");
    function change() {
      common_vendor.index.__f__("log", "at pages/setting/setting.vue:77", value.value);
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
    function likeListOpen() {
      common_vendor.index.navigateTo({
        url: "../list/list"
      });
    }
    function downloadListOpen() {
      common_vendor.index.navigateTo({
        url: "../downloadList/downloadList"
      });
    }
    function loginDisplayOpen() {
      isShow.value = true;
    }
    function loginDisplayDown() {
      isShow.value = false;
    }
    function upLikeList(likeList, account2) {
      common_vendor.index.request({
        url: "http://60.204.248.38:1315/api/updateLikeList",
        data: { List: likeList, account: account2 },
        method: "POST"
      });
    }
    async function login() {
      if (account.value == "" || password.value == "") {
        common_vendor.index.showToast({ title: "请输入账号和密码", icon: "none", duration: 2e3 });
        return;
      }
      if (Object.keys(Store.userData).length > 0) {
        await upLikeList(Store.likeList, Store.userData.account);
        Store.updataUserData({});
      }
      const data = await common_vendor.index.request({
        url: "http://60.204.248.38:1315/api/login",
        data: { account: account.value, password: password.value },
        method: "POST"
      });
      common_vendor.index.__f__("log", "at pages/setting/setting.vue:137", data);
      if (data.data.code == 500) {
        common_vendor.index.showToast({
          title: "登录成功",
          icon: "none",
          duration: 2e3
        });
        isShow.value = false;
        name.value = data.data.name;
        userSrc.value = "http://q.qlogo.cn/headimg_dl?dst_uin=" + data.data.account + "&spec=640&img_type=jpg";
        let userData = {
          name: name.value,
          account: data.data.account,
          password: data.data.password,
          src: userSrc.value
        };
        common_vendor.index.__f__("log", "at pages/setting/setting.vue:152", data.data);
        Store.updataUserData(userData);
        Store.updataLikeList(data.data.list);
      }
      if (data.data.code == 302) {
        common_vendor.index.showToast({
          title: "账号或者密码错误",
          icon: "none",
          duration: 2e3
        });
      }
      if (data.data.code == 501) {
        common_vendor.index.showToast({
          title: "已为你注册账号",
          icon: "none",
          duration: 2e3
        });
        name.value = data.name;
        isShow.value = false;
        Store.updataLikeList(data.list);
      }
    }
    function onKeyInput(e) {
      getQQSrc(e.detail.value);
    }
    function getQQSrc(qq) {
      let url = "http://q.qlogo.cn/headimg_dl?dst_uin=" + qq + "&spec=640&img_type=jpg";
      loginSrc.value = url;
    }
    function onSwitchChange() {
      isChecked.value = !isChecked.value;
      common_vendor.index.setStorage({
        key: "autoplay",
        data: isChecked.value
      });
      common_vendor.index.__f__("log", "at pages/setting/setting.vue:191", isChecked.value);
    }
    function openDrawer() {
      showRight.value.open();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isShow.value
      }, isShow.value ? {
        b: common_vendor.o(loginDisplayDown),
        c: loginSrc.value,
        d: common_vendor.o([($event) => account.value = $event.detail.value, onKeyInput]),
        e: account.value,
        f: password.value,
        g: common_vendor.o(($event) => password.value = $event.detail.value),
        h: common_vendor.o(login)
      } : {}, {
        i: isShow.value,
        j: common_vendor.o(loginDisplayDown),
        k: userSrc.value,
        l: name.value
      }, name.value ? {
        m: common_vendor.t(name.value)
      } : {}, {
        n: common_vendor.o(loginDisplayOpen),
        o: isChecked.value,
        p: common_vendor.o(($event) => onSwitchChange(_ctx.e)),
        q: common_vendor.o(openDrawer),
        r: common_vendor.o(likeListOpen),
        s: common_vendor.o(downloadListOpen),
        t: common_vendor.o(info),
        v: common_vendor.o(change),
        w: common_vendor.o(($event) => value.value = $event),
        x: common_vendor.p({
          mode: "list",
          localdata: date.value,
          multiple: false,
          modelValue: value.value
        }),
        y: common_vendor.sr(showRight, "018cdf56-0", {
          "k": "showRight"
        }),
        z: common_vendor.p({
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
