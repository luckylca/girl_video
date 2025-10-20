<template>
	<view class="layout">
		<swiper :indicator-dots="false" :autoplay="false" :duration="duration" :vertical="true" :acceleration="true"
			:circular="true" :current="controlIndex" @change="changeSwiper" ref="swiperRef" @click="clickGet">
			<!-- item 0 -->
			<swiper-item>
				<view class="videoPlayer">
					<video referrer-policy="no-referrer" :src="safeGet(videoIndex0)?.url || ''"
						style="height:100%;width:100vw" id="video0" autoplay="true" @ended="end"></video>
				</view>
			</swiper-item>

			<!-- item 1 -->
			<swiper-item>
				<view class="videoPlayer">
					<video referrer-policy="no-referrer" :src="safeGet(videoIndex1)?.url || ''"
						style="height:100%;width:100vw" id="video1" autoplay="true" @ended="end"></video>
				</view>
			</swiper-item>

			<!-- item 2 -->
			<swiper-item>
				<view class="videoPlayer">
					<video referrer-policy="no-referrer" :src="safeGet(videoIndex2)?.url || ''"
						style="height:100%;width:100vw" id="video2" autoplay="true" @ended="end"></video>
				</view>
			</swiper-item>
		</swiper>
	</view>
	<view class="toolbar">
		<view class="box" v-if="!isLike">
			<image src="/static/basic/like.png" style="width: 80%;height: 80%;border-radius: 50%;" @click="like"></image>
		</view>
		<view class="box" v-else>
			<image src="/static/basic/likeed.png" style="width: 80%;height: 80%;border-radius: 50%;" @click="like"></image>
		</view>
		<view class="box">
			<image src="/static/basic/download.png" style="width: 80%;height: 80%;border-radius: 50%;"></image>
		</view>
		<view class="box">
			<image src="/static/basic/share.png" style="width: 80%;height: 80%;border-radius: 50%;"></image>
		</view>
	</view>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import { likeStore } from '../../store/like';

/* 状态变量 */
const isLike = ref(false)
const isAutoPlay = ref(false)

const currentVideoIndex = ref(0)  // 逻辑上的第几个视频（你原来的 currentVideoIndex）
const controlIndex = ref(0)       // 传给 swiper 的 current（0/1/2）
const currentIndex = ref(0)       // 记录上一帧 swiper 的 current，用于方向判定
const nextIndex = ref(0)          // 临时存储 change 事件里传来的 current

/* 三个循环复用的 item 对应的视频索引 */
const videoIndex0 = ref(0)
const videoIndex1 = ref(1)
const videoIndex2 = ref(2)

/* 双跳时用的锁：只锁住第二次程序性 change(2->0) */
const lockNext = ref(false)

/* 动画时长 */
const duration = ref(300)
const loading = ref(false)
/* 你的视频列表 */
const nowVideoList = ref([
	{ url: '', title: '' }
])

/* 请求相关 */
const url = ref('')
const title = ref('')
let index = 0

const urls = [
	'http://api.yujn.cn/api/zzxjj.php?type=json',
	'http://api.yujn.cn/api/xjj.php?type=json',
	'https://api.yujn.cn/api/nvda.php?type=json',
	'http://api.yujn.cn/api/heisis.php?type=json',
	'https://api.yujn.cn/api/manzhan.php?type=json',
	'http://api.yujn.cn/api/baisis.php?type=json',
	'http://api.yujn.cn/api/wmsc.php?type=json',
	'http://api.yujn.cn/api/shejie.php?type=json',
	'http://api.yujn.cn/api/diaodai.php?type=json',
	'http://api.yujn.cn/api/jpmt.php?type=json',
	'http://api.yujn.cn/api/hanfu.php?type=json',
	'http://api.yujn.cn/api/qingchun.php?type=json',
	'http://api.yujn.cn/api/luoli.php?type=json',
	'https://api.dwo.cc/api/miss?type=json'
]
let lastDate = 0
const Store = likeStore()
/* 简易防并发 */
const autoChange = ref(false)

/* 安全访问列表避免 undefined */
let isClick = 0
function safeGet(i) {
	if (i == null) return null
	if (i < 0) return null
	if (i >= nowVideoList.value.length) return null
	return nowVideoList.value[i]
}
function clickGet()
{
	const nowDate = Date.now()
	if(nowDate-lastDate<200)
	{
		isLike.value = !isLike.value
	}
	lastDate = nowDate
}

/* 方向计算：返回 1=向下翻到下一条；0=向上翻到上一条；-1=无效/未移动 */
function getDir(newIdx, oldIdx) {
	const diff = (newIdx - oldIdx + 3) % 3
	if (diff === 1) return 1
	if (diff === 2) return 0
	return -1
}


function changeSwiper(e) {
	const cur = e.detail.current

	// 第二跳（程序性 2->0）被锁：只同步，不做逻辑
	if (lockNext.value) {
		lockNext.value = false
		currentIndex.value = cur   // 应该是 0
		// 不修改 currentVideoIndex
		return
	}

	nextIndex.value = cur

	// 计算方向（用户手势）
	const dir = getDir(nextIndex.value, currentIndex.value)
	// 顶部回弹条件：尝试向上翻（dir==0）且逻辑索引已经是 0
	if (dir === 0 && currentVideoIndex.value === 0) {
		// 双跳策略：当前已经 0->2 的第一跳，这里执行 2->0 的安排
		duration.value = 0         // 去动画
		// 第一阶段保持 2（cur 已经是 2，无需再写，如果怕“不触发刷新”可以再写一次 controlIndex.value=2）
		controlIndex.value = 2
		// 标记下一次 change（2->0）要忽略
		lockNext.value = true
		nextTick(() => {
			// 第二阶段：回到 0 并恢复动画
			controlIndex.value = 0
			duration.value = 300
		})
		uni.showToast({ title: '已是最顶部', icon: 'none' })
		// 注意：currentIndex 不在这里改为 2 或 0，由下一次（锁的那次）统一同步为 0
		return
	}

	// 正常翻页逻辑
	if (dir === 1) {
		// 向下（下一条）
		currentVideoIndex.value++
		isLike.value = false
		// 预加载下一条（可放到某个阈值时再拉）
		get_video(1)
	} else if (dir === 0) {
		// 向上（上一条）
		currentVideoIndex.value--
		if (currentVideoIndex.value < 0) currentVideoIndex.value = 0  // 保险
	} else {
		// 无效移动（可能是第二跳已被锁或值没变）
		currentIndex.value = cur
		return
	}

	// 根据当前 swiper 的索引（0/1/2）重新配置三个 videoIndexX
	syncVideoIndex(nextIndex.value)
	// setVideo(nextIndex.value)
	// 同步“上一帧”的基准
	currentIndex.value = nextIndex.value
}


/* 拆出映射逻辑，保持你原有的三种分支 */
function syncVideoIndex(swiperIdx) {
	if (swiperIdx === 1) {
		videoIndex0.value = -1
		videoIndex1.value = currentVideoIndex.value
		videoIndex2.value = -1
	} else if (swiperIdx === 0) {
		videoIndex0.value = currentVideoIndex.value
		videoIndex1.value = -1
		videoIndex2.value = -1
	} else { // 2
		videoIndex0.value = -1
		videoIndex1.value = -1
		videoIndex2.value = currentVideoIndex.value
	}
}

function like(){
	isLike.value = !isLike.value
	if(isLike.value)
	{	
		if(Object.keys(Store.userData).length === 0)
		{
			uni.showToast({
				title:"你还没有登录，数据将保存在本地",
				icon:'none',
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
/* 视频请求 */
async function get_video(num) {
	if (loading.value) return
	loading.value = true
	try {
		isLike.value = false
		index = await uni.getStorageSync('line')
		index = 13
		while (num-- > 0) {
			try {
				const res = await uni.request({ url: urls[index] })
				// 根据你的接口结构选择字段，下面假设 res.data.link 存视频地址
				url.value = res.data.link || res.data.data || ''
				title.value = res.data.title || ''
				if (!url.value) {
					continue
				}
				nowVideoList.value.push({
					url: url.value,
					title: title.value
				})
			} catch (err) {
				console.log('请求失败', err)
			}
		}
	} finally {
		loading.value = false
	}
}
async function end() {
	isAutoPlay.value = await uni.getStorageSync('autoplay')
	if (isAutoPlay.value) {
		lockNext.value = true
		autoChange.value = true
		controlIndex.value = currentIndex.value
		currentVideoIndex.value++
		syncVideoIndex((currentIndex.value + 1) % 3)
		nextTick(() => {
			controlIndex.value = (currentIndex.value + 1) % 3
		})
		isLike.value = false
		get_video(1)
	}
	else
		return
}
/* 初始化：至少先拉 2 条再允许用户滑动（你原来是 3，可根据需要） */
onMounted(async () => {
	await get_video(3)
	await nextTick()
	// 初始同步一次索引映射（避免越界）
	syncVideoIndex(controlIndex.value)


})

</script>

<style scoped>
.layout {
	width: 100vw;
	height: 100vh;
	z-index: 998;
}

.toolbar {
	width: 120rpx;
	height: 400rpx;
	position: fixed;
	border-radius: 200rpx;
	z-index: 1000;
	top: 700rpx;
	right: 20rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	backdrop-filter: blur(10px);
	background-color: rgba(255, 255, 255, 0.5);
}

.box {
	width: 120rpx;
	height: 120rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}

swiper {
	width: 100vw;
	height: 100vh;
}

.videoPlayer {
	width: 100%;
	height: 100%;
	background: #000;
}
</style>