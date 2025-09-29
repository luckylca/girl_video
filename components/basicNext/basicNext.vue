<template>
	<div class="layout">
		<swiper :indicator-dots="false" :autoplay="false" :vertical="true" :acceleration="true" @change="changeSwiper" :circular="true" ref="swiperRef" :current="controlIndex">
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
import { onMounted, ref } from "vue";
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
		url:"https://69eaniauoro0kbeq7o5i5cim623i8t0knms2pji0asics822r1kfbve.sealaly.net:10443/xdispatchdef7e1d97f000001/v9-ncdn-e.douyinvod.com/6ad12857ea239e5f9d982fd6a836207b/68ba93db/video/tos/cn/tos-cn-ve-15/ooW7eQIDeACgA0GRBf6lUnRAPL7Qvcbb0EIgBE/?a=1128&br=2314&bsfreqt=fse_113_0_0_0&bsreqid=62b9d2de6ecfecd1a2ec76a8825fa1ea&bsxdisp=se&bt=2314&btag=c0000e00090000&cd=0%7C0%7C0%7C0&ch=0&cquery=100y&cr=0&cs=0&cv=1&dr=0&ds=4&dy_q=1757054387&er=0&feature_id=46a7bb47b4fd1280f3d3825bf2b29388&ft=Qimo7JEuffPdh2~kI1jNvAq-antLjrKDjdrCRkaOuQJ1vjVhWL6&l=20250905143947633A11CAB080817152FB&mime_type=video_mp4&nqck=0&qs=0&rc=NDhpaTZlM2Y1OWlkOjpmNEBpajhpeXg5cjVxMzMzNGkzM0BhYTI0MGNiXy8xYWEtYV40YSNkbjVwMmQ0aXBhLS1kLS9zcw%3D%3D&x_r_id=308264e2c163941e1693d12777036e0b",
		title:"",
	},
]);
const url = ref("")
let title = ref("")
let index = 0
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
const currentIndex = ref(0)
const lastIndex = ref(0)
function upOrDown(currentIndex,lastIndex)
{
	if(currentIndex==(lastIndex+1)%3) return 1
	if(currentIndex==(lastIndex+2)%3) return 0
}
function changeSwiper(res)
{
	currentIndex.value = res.detail.current
	get_video(2)
	if(currentIndex.value == 0 && lastIndex.value == 0)
	{
		if(upOrDown(currentIndex.value,lastIndex.value)==1)
			currentVideoIndex.value++
		else
		{
			uni.showToast({
					title:"已是最顶部"
				})
		}
			
	}
	else
	{
		
		if(upOrDown(currentIndex.value,lastIndex.value)==1)//down
		{
			currentVideoIndex.value++
		}
		else if(upOrDown(currentIndex.value,lastIndex.value)==0)//up
		{
			if(currentVideoIndex==0)
			{
				uni.showToast({
					title:"已是最顶部"
				})
			}
			else
				currentVideoIndex.value--
		}
		
		if(currentIndex.value==1)
		{
			videoIndex0.value = currentVideoIndex.value-1
			videoIndex1.value = currentVideoIndex.value
			videoIndex2.value = currentVideoIndex.value+1
		}
		else if(currentIndex.value==0)
		{
			videoIndex0.value = currentVideoIndex.value
			videoIndex1.value = currentVideoIndex.value+1
			videoIndex2.value = currentVideoIndex.value-1
		}
		else if(currentIndex.value==2)
		{
			videoIndex0.value = currentVideoIndex.value+1
			videoIndex1.value = currentVideoIndex.value-1
			videoIndex2.value = currentVideoIndex.value
		}
	}
	lastIndex.value = currentIndex.value
}
async function get_video(num){
	isLike.value = false
	isAutoPlay.value = await uni.getStorageSync('autoplay');
	index = await uni.getStorageSync('line');
	while(num--)
	{
		const res = await uni.request({
			url:urls[index],
		}).then(res=>{
			url.value=res.data.data
			console.log(url.value)
			title.value = res.data.title
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