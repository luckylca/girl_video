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
	</view>
	<view class="black" v-show="isVideoPlay" @click="closeVideo">
		
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
const pageNum = ref(1)
const videoUrl = ref("")
const isVideoPlay = ref(false)


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
	const res = await uni.request({
		url:"https://www.magicalapk.com/api4/user/parse",
		method:'POST',
		header:{
			"Token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJVSURfMEZFODRGQzU2RTM3Nzk5NDhFM0I2QTA5RERDRUVDMUIiLCJleHAiOjQ5MDYzNTg4ODN9.JGToyGy13i0yTbGCAlyHvc0DvW4au7eo1DdOnEZHVYk",
		},
		data:{
			"url": textareaContent.value,
			"page": pageNum.value
		},
	})
	if(res.data.data.video_url.length==0)	{
		uni,uni.showToast({
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
}
function setDouyinContent() {
	
}

onReachBottom(()=>{
	console.log("到底部");
	getDouyinContent()
})
function openVideo(e) {
	videoUrl.value = douyinContentVideoList.value[e]
	isVideoPlay.value = true
}
function closeVideo() {
	isVideoPlay.value = false
}
</script>

<style lang="scss" scoped>
.container {
	width: 100vw;
	border: 1px red solid;
	display: flex;
	flex-direction: column;
}
textarea {
	width: 650rpx;
	height: 200rpx;
	border: 1px black solid;
	margin: 50rpx;
	padding: 10rpx;
	box-sizing: border-box;
	border-radius: 20rpx;
}
button {
	width: 270rpx;
	height: 100rpx;
	margin-bottom: 50rpx;
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
