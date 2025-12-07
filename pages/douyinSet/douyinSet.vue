<template>
	<view class="container">
		<textarea v-model="textareaContent" placeholder="请粘贴抖音视频链接"/>
		<div class="buttonBox">
			<button @click="getDouyinContent">识别</button>
			<button @click="setDouyinContent">添加到数据源</button>
		</div>
		<view class="contentContainer">
			<image v-for="(item,index) in douyinContentCoverList" :key="index" mode="widthFix" :src=item.value class="douyinCoverContent" @click="openVideo(index)"></image>
		</view>
		<view class="videoContiner" v-show="isVideoPlay">
			<video :src=videoUrl style="width: 100%;height: 100%;" autoplay="true" @ended="end"></video>
		</view>	
		<view class="getVideoDataName" v-show="isGetVideoDataName">
			<input type="text" placeholder="请输入数据源名字" v-model="videoDataName" class="videoDataNameSet"/>
			<button @click="addVideoData">添加</button>
		</view>
	</view>
	<view class="black" v-show="isBlackShow" @click="closeVideo">
		
	</view>

</template>

<script setup>
import { ref } from 'vue';
import { onReachBottom } from '@dcloudio/uni-app'  
import { videoListStore } from '../../store/videoList';

const useVideoListStore = videoListStore()

const douyinContentVideoList = ref([])
const douyinContentCoverList = ref([])
const textareaContent = ref("")
const videoDataName = ref("")
const pageNum = ref(1)
const videoUrl = ref("")
const isVideoPlay = ref(false)
const isBlackShow = ref(false)
const isGetVideoDataName = ref(false)

async function getDouyinContent() {
	console.log(textareaContent.value);
	if(textareaContent.value=="") {
		uni.showToast({
			title:"请输入网址",
			icon:'error'
		})
		return
	}
	uni.showLoading({
		title:"加载中"
	})
	try {
		const res = await uni.request({
			url:"https://www.magicalapk.com/api4/user/parse",
			method:'POST',
			header:{
				"Token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJVSURfMEZFODRGQzU2RTM3Nzk5NDhFM0I2QTA5RERDRUVDMUIiLCJleHAiOjQ5MDYzNTg4ODN9.JGToyGy13i0yTbGCAlyHvc0DvW4au7eo1DdOnEZHVYk",
			},
			timeout:5000,
			data:{
				"url": textareaContent.value,
				"page": pageNum.value
			},
		})
		if(res.data.data.video_url.length==0)	{
			uni.showToast({
				title: '视频采集完毕',
				icon:'error'
			});
			return
		}
		uni.hideLoading()
		if(douyinContentVideoList.value.length===0) {
			douyinContentVideoList.value = res.data.data.video_url
			douyinContentCoverList.value = res.data.data.covers
		}
		else {
			douyinContentVideoList.value.push(...res.data.data.video_url)
			douyinContentCoverList.value.push(...res.data.data.covers)
		}
		uni.showToast({
			title:"找到" + douyinContentVideoList.value.length + "个内容"
		})
		console.log(res.data.data);
		pageNum.value++
	} catch(e) {
		console.error(e);
		uni.hideLoading()
		uni.showToast({
			title: '接口加载错误，重新尝试或者关闭梯子',
			icon: 'none'
		});
	}
}
function setDouyinContent() {
	isGetVideoDataName.value = true
	isBlackShow.value = true
}

onReachBottom(()=>{
	console.log("到底部");
	getDouyinContent()
})
function addVideoData()	{
	let drawItem = {
		"value": useVideoListStore.drawContent.length,
		"text": videoDataName.value,
		"coverList": douyinContentCoverList.value,
		"videoList": douyinContentVideoList.value
	}
	useVideoListStore.addDrawContent(drawItem)
	uni.showToast({
		title:'添加成功',
		icon:'success'
	})
	isBlackShow.value = false
	isGetVideoDataName.value = false
}
function openVideo(e) {
	videoUrl.value = douyinContentVideoList.value[e]
	isVideoPlay.value = true
	isBlackShow.value = true
}
function closeVideo() {
	isVideoPlay.value = false
	isBlackShow.value = false
	isGetVideoDataName.value = false
}
</script>

<style lang="scss" scoped>
.container {
	width: 100vw;
	display: flex;
	flex-direction: column;
}
/* --- 输入框 Textarea --- */
textarea {
  /* 尺寸与布局 */
  width: 650rpx;
  height: 200rpx;
  margin: 50rpx auto; /* 加上 auto 让它水平居中 */
  box-sizing: border-box;
  padding: 30rpx;
  
  /* 核心视觉 - 灰白风 */
  background-color: #f7f8fa; /* 极淡的冷灰底色，比纯白护眼 */
  color: #333333;           /* 深灰文字，不刺眼 */
  font-size: 28rpx;
  
  /* 边框与圆角 - 取消黑边框，用极细灰线 */
  border: 2rpx solid #e8e8e8; 
  border-radius: 24rpx;     /* 更现代的圆角 */
  
  /* 动效 */
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* 聚焦状态 - 模拟呼吸感 */
textarea:focus {
  background-color: #ffffff;    /* 聚焦变白 */
  border-color: #d1d1d1;        /* 边框稍微加深 */
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05); /* 极淡的投影 */
}

/* --- 按钮 Button --- */
button {
  /* 尺寸 */
  width: 270rpx;
  height: 90rpx;      /* 稍微调低一点点高度，更精致 */
  line-height: 90rpx; /* 文字垂直居中 */
  margin-bottom: 50rpx;
  
  /* 核心视觉 - 深灰主色 */
  background-color: #333333; /* 经典深灰，配合灰白背景非常高级 */
  color: #ffffff;
  font-size: 30rpx;
  font-weight: 500;
  letter-spacing: 2rpx;
  
  /* 形状 */
  border-radius: 100rpx; /* 胶囊形状 (Pill Shape) */
  
  /* 阴影 - 悬浮感 */
  box-shadow: 0 6rpx 16rpx rgba(51, 51, 51, 0.25);
  
  /* 动效 */
  transition: transform 0.1s ease, box-shadow 0.2s ease;
}

/* 去除 uniapp 自带边框干扰 */
button::after {
  border: none;
}

/* 点击反馈 */
button:active {
  transform: scale(0.96); /* 轻轻缩小 */
  background-color: #000000; /* 点击变纯黑 */
  box-shadow: 0 2rpx 8rpx rgba(51, 51, 51, 0.2);
}
.buttonBox {
	display: flex;
	padding-left: 50rpx;
	padding-right: 50rpx;
}
.contentContainer {
	width: 750rpx;
	flex: 1;
	overflow-y: auto;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	align-items: center;
}

.douyinCoverContent {
	width: 40%;
	margin: 20rpx;
}
.videoContiner{
	width: 600rpx;
	height: 80vh;
	position: fixed;
	top:10vh;
	left:75rpx;
	z-index: 1000;
}
.getVideoDataName {
	width: 600rpx;
	height: 30vh;
	position: fixed;
	top:30vh;
	left:75rpx;
	z-index: 1000;
	background-color: white;
}
.videoDataNameSet {
  /* --- 你的原始布局属性 (保留) --- */
  margin-top: 100rpx;
  margin-left: 40rpx;
  margin-right: 40rpx;
  margin-bottom: 50rpx;
  height: 100rpx;
  flex: 1;
  box-sizing: border-box;

  /* --- 新增/优化的视觉属性 --- */
  
  /* 1. 调整内边距 */
  /* 因为有圆角，左右内边距需要稍微大一点，否则文字会贴着圆弧 */
  padding-left: 32rpx;  
  padding-right: 32rpx; 

  /* 2. 核心配色 (与 Textarea 保持一致) */
  background-color: #f7f8fa; /* 极淡的冷灰底色 */
  border: 2rpx solid #e8e8e8; /* 极细灰线边框 */
  
  /* 3. 字体与排版 */
  color: #333333;
  font-size: 28rpx;
  /* 确保文字垂直居中 (UniApp input 有时需要显式设置) */
  line-height: 100rpx; 
  
  /* 4. 圆角 (保持 24rpx 与多行框一致，或者用 50rpx 变成全圆角胶囊形) */
  border-radius: 24rpx; 

  /* 5. 丝滑过渡 */
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* --- 聚焦状态 (高亮效果) --- */
.videoDataNameSet:focus {
  background-color: #ffffff;     /* 聚焦变白 */
  border-color: #d1d1d1;         /* 边框加深 */
  box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.05); /* 浮起阴影 */
}
.black{
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 999;
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
}
</style>
