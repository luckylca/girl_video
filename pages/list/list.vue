<template>
	<view class="layout">
		<view class="videoList">
			<view class="ListItem" v-for="item in likeList" @click="enterVideo(item.id)" :key="item.id">
				<span>{{item.title}}</span>
			</view>
<!-- 			<view class="ListItem" :style="{ transform: 'translateX(' + (offsetmap[index] || 0) + 'px)' }" :class="{'change':ischange}" v-for="(item,index) in likeList" @touchstart="(e)=>ontouchstart(e,item.id)" @touchmove="(e)=>ontouchmove(e,item.id)" @touchend="(e)=>ontouchend(e,item.id)" :key="item.id">
				<span>{{item.title}}</span>
			</view> -->
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
import { likeStore } from '../../store/like';
import { ref } from "vue";
const Store = likeStore()
const likeList = ref([])
const isHover = ref(false)
const videoIndex = ref(0)
const isVideoPlay = ref(false)
const videoUrl = ref("")
const ischange = ref(false)
const offsetmap = ref([])
let currentId = -1
let touchStartPosition =0
let touchMovingPosition = 0
likeList.value = Store.likeList
// offsetmap.value = Array.from({ length: likeList.value.length }, (_, index) => ({
//   index,
//   offset: 0
// }));
// console.log(offsetmap.value);
const enterVideo = (id) =>{
	isVideoPlay.value = true
	videoUrl.value = likeList.value[id].url
	isHover.value = true
}

// function ontouchstart(e,index)
// {	
// 	touchStartPosition = e.touches[0].screenX
// 	currentId=index
// 	console.log(e.touches[0].screenX);
// }

// function ontouchmove(e,index)
// {	
// 	if(index!=currentId)return
// 	touchMovingPosition = e.changedTouches[0].screenX
// 	const detTouch = touchStartPosition-touchMovingPosition
// 	if(detTouch>0)
// 	{offsetmap.value[index].offset = detTouch}
// 	console.log(e.changedTouches[0].screenX);
// }

// function ontouchend(e,index)
// {	
// 	  const threshold = -100
// 	  if (offsetmap.value[index].offset < threshold) {
// 	    // 完全滑出屏幕
// 	    offsetmap.value[index].offset = -200
// 	  } else {
// 	    // 回弹
// 	    offsetmap.value[index].offset = 0
// 	  }

// 	  currentId = -1
// 	console.log(e.changedTouches[0].screenX);
// }

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
.change{
	transform: translateX(1);
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
