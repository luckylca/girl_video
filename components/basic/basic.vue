<template>
	<view class="layout">
		<view class="video">
			<video ref="videoPlayer" :src="url" autoplay="true" enable-play-gesture="true" @ended="end"></video>
		</view>
		<view class="toolBar">
			<view class="like" v-if="!islike">
				<image src="/static/basic/like.png" style="width: 100%;height: 100%;" @click="like"></image>
			</view>
			<view class="likeed" v-else>
				<image src="/static/basic/likeed.png" style="width: 100%;height: 100%;" @click="like"></image>
			</view>
			<view class="text" :class="{ani:isAni}" id="text" @click="get_video">
				下一个
			</view>
			<view class="download">
				<image src="/static/basic/download.png" style="width: 100%;height: 100%;" @click="downloadVideo"></image>
			</view>
		</view>	
	</view>

</template>

<script setup>
import { likeStore } from '../../store/like';
import { ref, onBeforeMount, onMounted } from 'vue';

const url = ref("https://alimov2.a.kwimgs.com/upic/2023/03/14/07/BMjAyMzAzMTQwNzMyMDRfMzEyNDcxOTkyNF85ODE2OTI5OTUxM18xXzM=_b_B48c337e8ee1a614653d500c9c3c6cf2c.mp4?clientCacheKey=3xhiww7s3qui8ng_b.mp4&tt=b&di=b72e16c7&bp=13414\n")
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
const isautoplay = ref(false)
const videoPlayer = ref(null);
const isAni = ref(false)
const islike = ref(false)
const likeList = ref([])
const title = ref("")

const Store = likeStore()
likeList.value = Store.likeList
function like(){
	islike.value = !islike.value
	if(islike.value)
	{	
		if(Object.keys(Store.userData).length === 0)
		{
			uni.showToast({
				title:"你还没有登录，数据将保存在本地",
				duration:1000
			})
		}
		const tempLikeItem = {
			id:0,
			url:"",
			title:""
		}
		tempLikeItem.id = Store.likeList.length
		tempLikeItem.url = url.value
		tempLikeItem.title = title.value
		Store.addLikeList(tempLikeItem)
	}
	else
	{
		Store.removeLikeList()
	}
	console.log(Store.likeList);
}
async function downloadVideo()
{
	uni.showLoading()
	const res =await uni.downloadFile({
		url:url.value,
	})
	if(res.statusCode==200)
	{
		const data = await uni.saveFile({
			tempFilePath:res.tempFilePath,
		})
		uni.showToast({
			title:"保存成功",icon:'none',
			duration:1000
		})
		console.log(data.savedFilePath);
		Store.addDownloadTitleList(title.value)
		console.log(Store.downloadTitleList);
		uni.hideLoading()
	}
}
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
	isAni.value = true
	islike.value = false
	isautoplay.value = await getStorageSync('autoplay');
	index = await getStorageSync('line');
	uni.showNavigationBarLoading()
	const res = await uni.request({
		url:urls[index],
	}).then(res=>{
		url.value=res.data.data
		title.value = res.data.title
	}).finally(()=>{
		uni.hideNavigationBarLoading()
		uni.hideLoading()
	})
	setTimeout(()=>{
		isAni.value = false
	},300)

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
onMounted(()=>{
	likeList.value = uni.getStorageSync('like')
})



</script>

<style lang="scss" scoped>
@keyframes anima
{
	0%{transform: scale(1);}
	25%{transform: scale(0.9);}
	75%{transform: scale(1.1);}
	100%{transform: scale(1);}
}

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
			border-radius: 20rpx;
		}

		
	}
		.text{
			border:1px solid #ccc;
			width: 400rpx;
			height: 7vh;
			margin-left: 10rpx;
			margin-right: 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			
			font-size: 38rpx;
			border-radius: 20rpx;
		}
		.text:hover{
			box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		}
		.ani{
			animation: anima 0.3s ease-in-out;
		}
	.toolBar{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 40rpx;
		.like{
			width: 100rpx;
			height: 100rpx;
			margin-left: 20rpx;
		}
		.likeed{
			width: 100rpx;
			height: 100rpx;
			margin-left: 20rpx;
		}
		.download{
			width: 100rpx;
			height: 100rpx;
			margin-right: 20rpx;
		}
		
	}
	
}

</style>