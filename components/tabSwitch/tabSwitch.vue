<template>
  <view class="tab-bar-wrap">
    
    <view class="tab-placeholder"></view>

    <view class="tab-bar">
      <view class="tab-item" @click="goToPage('/pages/index/index')">
        <text class="tab-text">首页</text>
      </view>

      <view class="tab-item" @click="goToPage('/pages/setting/setting')">
        <text class="tab-text">设置</text>
      </view>
    </view>

  </view>
</template>

<script setup>
  const goToPage = (url) => {
    uni.switchTab({ url }) 
  }
</script>

<style scoped>
/* 注意：nvue 中样式默认是 scoped 的
  不要使用标签选择器，全部用类名
*/

.tab-bar {
  /* 固定定位：nvue 和 vue 都支持 */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  
  /* 必须指定高度 */
  height: 100rpx; 
  
  /* nvue 默认是 column，横向排列必须显式写 row */
  flex-direction: row; 
  
  /* 必须有背景色，否则是透明的 */
  background-color: #ffffff;
  
  /* 顶部边框 (nvue 写法) */
  border-top-width: 1px;
  border-top-color: #eeeeee;
  border-top-style: solid;
  
  /* 对齐 */
  align-items: center;
  justify-content: space-around;
}

.tab-item {
  /* 让点击区域大一点 */
  height: 100rpx;
  flex: 1;
  align-items: center;
  justify-content: center;
}

.tab-text {
  font-size: 28rpx;
  color: #333333;
}

/* 占位符样式：仅仅是为了把页面内容顶上去 */
.tab-placeholder {
  height: 100rpx;
  width: 750rpx;
}
</style>