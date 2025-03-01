<template>
	<view class="layout">
		<view class="video">
			<video ref="videoPlayer" :src="url" autoplay="true" enable-play-gesture="true" @ended="end"></video>
		</view>
		<view class="text" @click="get_video">
			下一个
		</view>
		
		
	</view>
</template>

<script setup>

import { ref, onBeforeMount,computed} from 'vue';
const url = ref("https://tucdn.wpon.cn/api-girl/videos/BMjAyMTExMjExODU3MTNfMjIzODExNjlfNjEyOTgzODEyOTNfMV8z_b_Bb5cdc95dd5dcdec391a5f7ec50ee928c.mp4")
let index = 0
const url2 = ref("")
const url1 = ref("https:")
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
const isautoplay = ref(false)
const videoPlayer = ref(null);

function getStorageSync(key) {
    return new Promise((resolve, reject) => {
        uni.getStorage({
            key: key,
            success(res) {
                resolve(res.data);
            },
            fail(err) {
                reject(err);
            }
        });
    });
}

async function get_video(){
	isautoplay.value = await getStorageSync('autoplay');
	index = await getStorageSync('line');

	uni.showNavigationBarLoading()
	uni.request({
		url:"https://tucdn.wpon.cn/api-girl/index.php?wpon=json"
	}).then(res=>{
		url2.value=res.data.mp4
		console.log(url2.value);
		url.value = computed(() => {
		  return `${url1.value}${url2.value}`;
		});
		console.log(url.value);
	}).finally(()=>{
		uni.hideNavigationBarLoading()
	})
	

}

function end(){
	
	if(isautoplay.value===true)
	{
		get_video()
	}
	else if(isautoplay.value===false)
	{
		
		
	}
	
}




</script>

<style lang="scss" scoped>
.layout{
	
	.video{
		margin-left: auto;
		margin-right: auto;
		margin-top: 40rpx;
		width: 600rpx;
		height: 70vh;
		box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3), -10px -10px 20px rgba(255, 255, 255, 0.3);
		video{
			width: 100%;
			height: 100%;
			object-fit: contain;
		}

		
	}
		.text{
			border:1px solid #ccc;
			width: 600rpx;
			height: 7vh;
			margin-left: auto;
			margin-right: auto;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 40rpx;
			font-size: 38rpx;
			border-radius: 20rpx;
			
	
		
		}
	
	
}

</style>