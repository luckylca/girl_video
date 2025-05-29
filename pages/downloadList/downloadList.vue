<template>
	<view class="layout">
		<view class="videoList">
			<view class="ListItem" v-for="(item,index) in downloadList" @click="enterVideo(index)" :key="index">
				<span>{{downloadTitleList[index]}}</span>
			</view>
		</view>
		<!-- <uni-transition mode-class="fade" :show="isVideoPlay"> -->
			<view class="videoContiner" v-show="isVideoPlay">
				<video :src=videoUrl style="width: 100%;height: 100%;" autoplay="true" @ended="end"></video>
			</view>	
		<!-- </uni-transition>		 -->
	</view>
	<view class="black" v-show="isHover" @click="ended">
		
	</view>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { likeStore } from "../../store/like";
const Store = likeStore()
const isHover = ref(false)
const videoIndex = ref(0)
const isVideoPlay = ref(false)
const videoUrl = ref("")
const downloadList = ref([])
const downloadTitleList = ref([])
downloadTitleList.value = Store.downloadTitleList
uni.getSavedFileList({
	success(res) {
		downloadList.value = res.fileList
	}
})
const enterVideo = (id) =>{
	isVideoPlay.value = true
	videoUrl.value = downloadList.value[id].filePath
	isHover.value = true
}
const ended = ()=>{
	isVideoPlay.value = false
	isHover.value = false
}

</script>

<style scoped>
.layout{
	width: 100%;
	height: 100vh;
	position: relative;
	padding-top: 20rpx;
}


.videoContiner{
	width: 600rpx;
	height: 80vh;
	position: fixed;
	top:10vh;
	left:75rpx;
	z-index: 1000;

}
.videoList{

	
}
.ListItem{
	width: 600rpx;
	height: 180rpx;
	margin: 20rpx auto;
	padding: auto 0;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	border-radius: 12px; /* 圆润边角 */
	border: 1px solid rgba(0, 0, 0, 0.05); /* 极简细边框 */
	box-shadow: 
	0 4px 6px rgba(0, 0, 0, 0.05),   /* 主阴影 */
	0 1px 3px rgba(0, 0, 0, 0.1);    /* 次级阴影 */
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
