<template>
	<div class="layout">
		<swiper :indicator-dots="false" :autoplay="false" :duration="duration" :vertical="true" :acceleration="true" @change="changeSwiper" :circular="true" ref="swiperRef" :current="controlIndex">
			<swiper-item>
				<view class="videoPlayer">
					<video referrer-policy="no-referrer" :src=nowVideoList[videoIndex0].url style="height: 100%;width: 100vw;" ref="video0"></video>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="videoPlayer">
					<video referrer-policy="no-referrer" :src=nowVideoList[videoIndex1].url style="height: 100%; width: 100vw;" ref="video1"></video>
				</view>
			</swiper-item>			
			<swiper-item>
				<view class="videoPlayer">
					<video referrer-policy="no-referrer" :src=nowVideoList[videoIndex2].url style="height: 100%; width: 100vw;" ref="video2"></video>
				</view>
			</swiper-item>	
		</swiper>
	</div>
	<div class="toolbar">
	</div>
</template>

<script setup>
import { nextTick, onMounted, ref } from "vue";
const isLike = ref(false)
const isAutoPlay = ref(false)
const currentVideoIndex = ref(0)
const swiperRef = ref(null)
const videoIndex0 = ref(0)
const videoIndex1 = ref(1)
const videoIndex2 = ref(2)
const controlIndex = ref(0)
const video2 = ref(null)
const video1 = ref(null)
const video0 = ref(null)
const nowVideoList = ref([
	{
		url:"https:\/\/cdn.fs.ink\/mp4\/video_2023\/mxuMvEom6CuE2VOlN7j9.mp4",
		title:"",
	},
]);
const url = ref("")
let title = ref("")
let index = 0
const duration = ref(300)
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
    "http://api.yujn.cn/api/luoli.php?type=json",
	"https://api.dwo.cc/api/miss?type=json"
];
const nextIndex = ref(0)
const currentIndex = ref(0)
const isLock = ref(false)
function upOrDown(newIdx,oldIdx)
{
		const diff = (newIdx - oldIdx + 3) % 3
		if (diff === 1) return 1
		if (diff === 2) return 0
		return -1
}
function changeSwiper(res)
{
	nextIndex.value = res.detail.current
	if(isLock.value)
	{
		isLock.value=false
		currentIndex.value = nextIndex.value
		return
	}
	const dir = upOrDown(nextIndex.value,currentIndex.value)
	if(dir==0&&currentVideoIndex.value==0)
	{
		isLock.value = true
		controlIndex.value = 2
		duration.value = 0
		nextTick(()=>{
			controlIndex.value = 0
			duration.value = 300
		})
		uni.showToast({
				title:"已是最顶部"
			})
		return
	}
	get_video(1)
	if(dir==1)
		currentVideoIndex.value++
	else if(dir==0)
	{
		if(currentVideoIndex.value<0)	currentVideoIndex.value=0
		currentVideoIndex.value--
	}
	if(nextIndex.value==1)
	{
		videoIndex0.value = currentVideoIndex.value-1
		videoIndex1.value = currentVideoIndex.value
		videoIndex2.value = currentVideoIndex.value+1
	}
	else if(nextIndex.value==0)
	{
		videoIndex0.value = currentVideoIndex.value
		videoIndex1.value = currentVideoIndex.value+1
		videoIndex2.value = currentVideoIndex.value-1
	}
	else if(nextIndex.value==2)
	{
		videoIndex0.value = currentVideoIndex.value+1
		videoIndex1.value = currentVideoIndex.value-1
		videoIndex2.value = currentVideoIndex.value
	}
	currentIndex.value = nextIndex.value
}
async function get_video(num){
	isLike.value = false
	isAutoPlay.value = await uni.getStorageSync('autoplay');
	index = await uni.getStorageSync('line');
	index = 13;
	while(num--)
	{
		const res = await uni.request({
			url:urls[index],
		}).then(res=>{
			// url.value=res.data.data
			// console.log(url.value)
			// title.value = res.data.title
			url.value = res.data.link
			title.value = ""
		})
		const newItem = {
			url:url.value,
			title:title.value
		}
		nowVideoList.value.push(newItem)
		console.log(nowVideoList.value)
	}
}
onMounted(()=>{
	get_video(3)
})
</script>

<style>
.layout{
	width: 100vw;
	height: 100vh;
}
swiper{
	height: 100vh;
	width: 100vw;
}
.videoPlayer{
	height: 100%;
	width: 100%;
}
	
</style>