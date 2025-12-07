<template>
	<view class="page-container">
		<!-- <uni-transition mode-class="fade" :show="isShow"> -->
			<view class="loginDisplay" v-if="isShow" id="loginDisplay">
				<view class="down" style="right: 0px;position: fixed;font-size: 40rpx;" @click="loginDisplayDown">
					❌
				</view>
				<view class="avatar">
					<image :src=loginSrc mode="" style="width: 100%;height: 100%;border-radius: 50%;"></image>
				</view>
				<input class="accountInput" type="text" placeholder="请输入QQ账号" maxlength="10" cursor-color="black" @input="onKeyInput" v-model="account"/>
				<input class="passwordInput" password="true" placeholder="请输入密码" maxlength="14" cursor-color="black" v-model="password"/>
				<button class="loginButton" @click="login">登录</button>
				<view class="tip">
					如果未注册则自动注册
				</view>
			</view>
		<!-- </uni-transition> -->
		<!-- <uni-transition mode-class="fade" :show="isShow"> -->
			<view class="black" v-show="isShow" @click="loginDisplayDown">
				
			</view>
		<!-- </uni-transition> -->
		<view class="loginLayout" @click="loginDisplayOpen" >
			<view class="avatar">
				<image :src=userSrc mode="" style="width: 100%;height: 100%;border-radius: 50%;"></image>
			</view>
			<view class="account" v-if="name">
				{{name}}
			</view>
			<view class="account" v-else>
				请登录
			</view>
		</view>
		<view class="layout">
			<view class="box1">
				<text>自动播放</text>
				<switch :checked="isChecked" @change="onSwitchChange(e)" class="choose" />
			</view>
			<view class="box" @click="openDrawer">
				数据源选择
			</view>
			<view class="box" @click="likeListOpen">
				收藏列表
			</view>
			<view class="box" @click="downloadListOpen">
				下载列表
			</view>
			<view class="box" @click="douyinSetOpen">
				导入抖音视频
			</view>
			<view class="box" @click="info">
				关于app
			</view>
		</view>
		<view class="drawer">			
			<uni-drawer ref="showRight" mode="right" :width="150">
				<view class="drawer-content">
						<!-- <uni-data-checkbox class="checkbox" mode="list" v-model="value" :localdata="drawerContentdate" :multiple="false" @change="change"></uni-data-checkbox> -->
					<view class="checkbox" 
						v-for="item in drawerContentdate" 
						:key="item.value" 
						@click="change(item)" 
						:class="{ isSelcet: selcetIndex===item.value}"
						:style="getItemStyle(item)"
						@touchstart="touchStart($event,item)"
						@touchmove="touchMove($event,item)"
						@touchend="touchEnd($event,item)"
					>{{item.text}}</view>
				</view>
			</uni-drawer>
		</view>
	</view>
</template>

<script setup>
import { likeStore } from "../../store/like"
import { videoListStore } from "../../store/videoList"
import {ref,onMounted} from "vue"
import {onShow} from '@dcloudio/uni-app'
const isChecked = ref(false)
const showRight = ref(null)
const value = ref(0)
const letter = ref("L")
const userSrc = ref("https://c-ssl.dtstatic.com/uploads/blog/202105/25/20210525121250_5e7ad.thumb.1000_0.jpg")
const loginSrc = ref("https://c-ssl.dtstatic.com/uploads/blog/202105/25/20210525121250_5e7ad.thumb.1000_0.jpg")
const useLikeStore = likeStore()
const useVideoListStore = videoListStore()
const drawerContentdate = useVideoListStore.drawContent
const isShow = ref(false)
const account = ref("")
const password = ref("")
const name = ref("")
const selcetIndex = ref(1)
const offXData = ref({});
function change(e){
	// console.log(e.value);
	uni.setStorage({
		key:"line",
		data:e.value
	})
	selcetIndex.value = e.value
}
const MAX_SLIDE = 120        // 最大左滑距离（px），用于计算“红色渐变”
const DELETE_THRESHOLD = -100 // 超过这个距离就认为要删除（px）
let touchStartData = 0
let touchMoveData = 0
let touchEndData = 0
let activeIndex = null
const diffX = ref(0)
function touchStart(e,item) {
	touchStartData = e.changedTouches[0].clientX
	activeIndex = item.value
}
function touchMove(e,item) {
	touchMoveData = e.changedTouches[0].clientX
	diffX.value = touchMoveData-touchStartData
	if(diffX.value>0) {
		diffX.value = 0
	}
	if(diffX.value<-120) {
		diffX.value = -120
	}
	offXData.value[item.value] = diffX.value
}
function touchEnd(e,item) {
	touchEndData = e.changedTouches[0].clientX
	if(diffX.value<DELETE_THRESHOLD && item.value!=0) {
		useVideoListStore.deleteDrawContent(item)
	}
	offXData.value[item.value] = 0
	diffX.value = 0
	activeIndex = null
}
function getItemStyle(item) {
	const offsetX = offXData.value[item.value] || 0
	const progress = Math.min(Math.abs(offsetX) / MAX_SLIDE, 1) // 0~1

	// 颜色从 白色(#ffffff) → 红色(#f44336)
	const rStart0 = 255, gStart0 = 255, bStart0 = 255
	const rEnd0 = 244, gEnd0 = 67, bEnd0 = 54

	const r0 = Math.round(rStart0 + (rEnd0 - rStart0) * progress)
	const g0 = Math.round(gStart0 + (gEnd0 - gStart0) * progress)
	const b0 = Math.round(bStart0 + (bEnd0 - bStart0) * progress)

	const rStart1 = 0, gStart1 = 0, bStart1 = 0
	const rEnd1 = 244, gEnd1 = 67, bEnd1 = 54

	const r1 = Math.round(rStart1 + (rEnd1 - rStart1) * progress)
	const g1 = Math.round(gStart1 + (gEnd1 - gStart1) * progress)
	const b1 = Math.round(bStart1 + (bEnd1 - bStart1) * progress)
	return {
		transform: `translateX(${offsetX}px)`,
		backgroundColor: `rgb(${r0}, ${g0}, ${b0})`,
		color: `rgb(${r1}, ${g1}, ${b1})`,
	}
}



function info(){
	uni.navigateTo({
		url: '../info/info',
	});
}
function likeListOpen()
{
	uni.navigateTo({
		url: '../list/list',
	});
}
function downloadListOpen()
{
	uni.navigateTo({
		url: '../downloadList/downloadList',
	});
}
function douyinSetOpen()
{
	uni.navigateTo({
		url: '../douyinSet/douyinSet',
	});	
}
function loginDisplayOpen(){
	isShow.value = true
}
function loginDisplayDown()
{
	isShow.value = false
}
function upLikeList(likeList,account)
{
	uni.request({
		url:"http://60.204.248.38:1315/api/updateLikeList",
		data:{List:likeList,account:account,},
		method:'POST'
	})
}
async function login()
{	
	if(account.value==""||password.value=="")
	{
		uni.showToast({ title: '请输入账号和密码', icon: 'none',duration:2000});
		return
	}
	
	// uni.showLoading({ title: '正在登录...' });
	if(Object.keys(useLikeStore.userData).length > 0)
	{
		await upLikeList(useLikeStore.likeList,useLikeStore.userData.account)
		useLikeStore.updataUserData({})//清空原先登录信息
	}
	
	const data = await uni.request({
		url:"http://60.204.248.38:1315/api/login",
		data:{account:account.value,password:password.value},
		method:'POST'
	})
	// uni.hideLoading()
	console.log(data);
	if(data.data.code==500)
	{
		uni.showToast({
			title:'登录成功',icon:"none",duration:2000
		})
		isShow.value = false
		name.value = data.data.name
		userSrc.value = "http://q.qlogo.cn/headimg_dl?dst_uin=" + data.data.account + "&spec=640&img_type=jpg"
		let userData = {
			name:name.value,
			account:data.data.account,
			password:data.data.password,
			src:userSrc.value,
		}
		console.log(data.data);
		useLikeStore.updataUserData(userData)
		useLikeStore.updataLikeList(data.data.list)
	}
	if(data.data.code==302)
	{
		uni.showToast({
			title:'账号或者密码错误',icon:"none",duration:2000
		})
	}
	if(data.data.code==501)
	{
		uni.showToast({
			title:'已为你注册账号',icon:"none",duration:2000
		})
		name.value = data.name
		isShow.value = false
		useLikeStore.updataLikeList(data.list)
	}
	
	
}
function onKeyInput(e)
{
	getQQSrc(e.detail.value)
}
function getQQSrc(qq)
{	
	let url = "http://q.qlogo.cn/headimg_dl?dst_uin=" + qq + "&spec=640&img_type=jpg"
	loginSrc.value = url
}
function onSwitchChange(){
	
	isChecked.value =! isChecked.value
	
	uni.setStorage({
		key:"autoplay",
		data:isChecked.value
	})
	console.log(isChecked.value);
}	

function openDrawer(){
	showRight.value.open()
}
onMounted(()=>{
	uni.setStorage({
		key:"line",
		data:1
	})
	selcetIndex.value = 1
})

</script>

<style lang="scss" scoped>
.black{
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 999;
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
}
.loginDisplay {
	/* --- 卡片容器布局 --- */
	width: 600rpx;
	/* 高度自适应或固定，建议稍微留点余地 */
	padding-bottom: 50rpx; 
	height: auto; 
	
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	
	/* --- 核心视觉：悬浮白卡 --- */
	background-color: #ffffff;
	z-index: 1000;
	border-radius: 32rpx; /* 更大的圆角，显得现代友好 */
	
	/* 最深的阴影，体现它“浮”在最高层 */
	box-shadow: 0 20rpx 60rpx rgba(0, 0, 0, 0.2); 
	
	/* 动画过渡 */
	transition: all 0.3s ease;
	overflow: hidden; /* 防止内部圆角溢出 */

	/* --- 关闭按钮 (对应 template 中的 class="down") --- */
	.down {
		/* 绝对定位已经在内联样式里了，这里优化视觉 */
		padding: 20rpx;
		color: #999; /* 改为浅灰色，不要太抢眼 */
		font-size: 32rpx !important; /* 调整大小 */
		opacity: 0.8;
		&:active { opacity: 0.5; } /* 点击反馈 */
	}

	/* --- 头像 --- */
	.avatar {
		width: 180rpx; /* 稍微缩小一点，更精致 */
		height: 180rpx;
		margin: 60rpx auto 50rpx auto; /* 调整间距 */
		
		border-radius: 50%;
		object-fit: contain;
		
		/* 统一风格：白边 + 投影 */
		background-color: #f0f2f5; 
		border: 6rpx solid #ffffff; 
		box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.15);
		
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 80rpx;
	}

	/* --- 输入框公共样式 (Account & Password) --- */
	/* 提取公共样式，保持一致性 */
	.accountInput,
	.passwordInput {
		width: 500rpx; /* 加宽一点，视觉更稳 */
		height: 100rpx; /* 加高，手指好点 */
		
		/* 居中 */
		margin: 0 auto 30rpx auto; 
		padding: 0 32rpx;
		box-sizing: border-box;
		
		/* 核心：灰白风格 (替换原来的蓝色边框) */
		background-color: #f7f8fa;
		border: 2rpx solid #e8e8e8;
		border-radius: 20rpx; /* 圆角矩形 */
		
		color: #333;
		font-size: 30rpx;
		
		/* 平滑过渡 */
		transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
		
		/* 去掉原来的 box-shadow */
		box-shadow: none;
	}

	/* 输入框聚焦态 */
	.accountInput:focus,
	.passwordInput:focus {
		background-color: #ffffff;
		border-color: #d1d1d1;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08); /* 聚焦时淡淡浮起 */
	}

	/* --- 登录按钮 --- */
	.loginButton {
		width: 500rpx;
		height: 90rpx;
		line-height: 90rpx;
		margin-top: 50rpx;
		
		/* 继承之前设计的黑色胶囊按钮风格 */
		background-color: #333333;
		color: #ffffff;
		font-size: 32rpx;
		font-weight: 600;
		border-radius: 100rpx; /* 胶囊圆角 */
		
		box-shadow: 0 6rpx 16rpx rgba(51, 51, 51, 0.25);
		border: none;
		
		transition: transform 0.1s;
		
		&:active {
			transform: scale(0.96);
			background-color: #000;
		}
		
		/* 覆盖 uniapp 默认边框 */
		&::after { border: none; }
	}

	/* --- 底部提示 --- */
	.tip {
		color: #999999; /* 浅灰 */
		text-align: center;
		margin-top: 30rpx;
		margin-bottom: 20rpx;
		font-size: 24rpx; /* 小一点 */
		letter-spacing: 1rpx;
	}
}.loginDisplay {
	/* --- 卡片容器布局 --- */
	width: 600rpx;
	/* 高度自适应或固定，建议稍微留点余地 */
	padding-bottom: 50rpx; 
	height: auto; 
	
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	
	/* --- 核心视觉：悬浮白卡 --- */
	background-color: #ffffff;
	z-index: 1000;
	border-radius: 32rpx; /* 更大的圆角，显得现代友好 */
	
	/* 最深的阴影，体现它“浮”在最高层 */
	box-shadow: 0 20rpx 60rpx rgba(0, 0, 0, 0.2); 
	
	/* 动画过渡 */
	transition: all 0.3s ease;
	overflow: hidden; /* 防止内部圆角溢出 */

	/* --- 关闭按钮 (对应 template 中的 class="down") --- */
	.down {
		/* 绝对定位已经在内联样式里了，这里优化视觉 */
		padding: 20rpx;
		color: #999; /* 改为浅灰色，不要太抢眼 */
		font-size: 32rpx !important; /* 调整大小 */
		opacity: 0.8;
		&:active { opacity: 0.5; } /* 点击反馈 */
	}

	/* --- 头像 --- */
	.avatar {
		width: 180rpx; /* 稍微缩小一点，更精致 */
		height: 180rpx;
		margin: 60rpx auto 50rpx auto; /* 调整间距 */
		
		border-radius: 50%;
		object-fit: contain;
		
		/* 统一风格：白边 + 投影 */
		background-color: #f0f2f5; 
		border: 6rpx solid #ffffff; 
		box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.15);
		
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 80rpx;
	}

	/* --- 输入框公共样式 (Account & Password) --- */
	/* 提取公共样式，保持一致性 */
	.accountInput,
	.passwordInput {
		width: 500rpx; /* 加宽一点，视觉更稳 */
		height: 100rpx; /* 加高，手指好点 */
		
		/* 居中 */
		margin: 0 auto 30rpx auto; 
		padding: 0 32rpx;
		box-sizing: border-box;
		
		/* 核心：灰白风格 (替换原来的蓝色边框) */
		background-color: #f7f8fa;
		border: 2rpx solid #e8e8e8;
		border-radius: 20rpx; /* 圆角矩形 */
		
		color: #333;
		font-size: 30rpx;
		
		/* 平滑过渡 */
		transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
		
		/* 去掉原来的 box-shadow */
		box-shadow: none;
	}

	/* 输入框聚焦态 */
	.accountInput:focus,
	.passwordInput:focus {
		background-color: #ffffff;
		border-color: #d1d1d1;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08); /* 聚焦时淡淡浮起 */
	}

	/* --- 登录按钮 --- */
	.loginButton {
		width: 500rpx;
		height: 90rpx;
		line-height: 90rpx;
		margin-top: 50rpx;
		
		/* 继承之前设计的黑色胶囊按钮风格 */
		background-color: #333333;
		color: #ffffff;
		font-size: 32rpx;
		font-weight: 600;
		border-radius: 100rpx; /* 胶囊圆角 */
		
		box-shadow: 0 6rpx 16rpx rgba(51, 51, 51, 0.25);
		border: none;
		
		transition: transform 0.1s;
		
		&:active {
			transform: scale(0.96);
			background-color: #000;
		}
		
		/* 覆盖 uniapp 默认边框 */
		&::after { border: none; }
	}

	/* --- 底部提示 --- */
	.tip {
		color: #999999; /* 浅灰 */
		text-align: center;
		margin-top: 30rpx;
		margin-bottom: 20rpx;
		font-size: 24rpx; /* 小一点 */
		letter-spacing: 1rpx;
	}
}
.loginLayout {
	display: flex;
	width: 300rpx; /* 稍微加宽一点，给文字更多空间 */
	height: 340rpx;
	justify-content: center;
	align-items: center;
	margin: 0 auto; /* 水平居中 */
	flex-direction: column;
	
	/* 增加整体点击的反馈感，因为你绑定了 click 事件 */
	transition: transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
	
	&:active {
		transform: scale(0.95); /* 点击时整体微缩 */
	}

	/* --- 头像区域 --- */
	.avatar {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
		
		/* 核心升级：增加白边和强投影 */
		/* 白边可以让头像从背景图中分离出来，显得更干净 */
		border: 8rpx solid #ffffff; 
		
		/* 这里的阴影要比 .box 更重一点，因为它是页面的视觉中心 */
		box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.2);
		
		background-color: #f0f2f5; /* 默认底色改为高级灰，不再是原来的亮蓝 */
		display: flex;
		justify-content: center;
		align-items: center;
		
		/* 图片容器内的行为 */
		overflow: hidden; /* 防止图片溢出圆角 */
	}

	/* --- 用户名区域 --- */
	.account {
		margin-top: 24rpx;
		
		/* 设计为“胶囊”样式，保证在任何背景图上都看得清文字 */
		background-color: rgba(255, 255, 255, 0.9); /* 半透明白底 */
		backdrop-filter: blur(10px); /* 如果环境支持，增加磨砂感 */
		
		padding: 10rpx 34rpx; /* 撑开胶囊 */
		border-radius: 50rpx; /* 全圆角 */
		
		/* 字体 */
		color: #333333;
		font-size: 30rpx;
		font-weight: 600; /* 加粗 */
		letter-spacing: 2rpx;
		
		/* 细微阴影 */
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
		
		/* 居中 */
		text-align: center;
		max-width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis; /* 防止名字太长撑破布局 */
	}
}
.layout {
	padding-top: 50rpx;

	/* --- 公共样式 --- */
	%box-shared {
		width: 700rpx;
		height: 120rpx;
		margin: 0 auto 30rpx auto;
		
		/* 1. 背景保持高亮白，增加一点点遮盖力 */
		background-color: #ffffff; 
		
		/* 2. 圆角 */
		border-radius: 24rpx; 
		
		/* 3. 关键修改：加强版投影 (Layered Shadows) */
		/* 第一层：近处深阴影，勾勒轮廓 */
		/* 第二层：远处扩散阴影，制造悬浮感 */
		box-shadow: 
			0 4px 10px rgba(0, 0, 0, 0.15), 
			0 10px 30px rgba(0, 0, 0, 0.12);
		
		/* 4. 加粗一点边框，防止背景图干扰边缘 */
		border: 1px solid rgba(255, 255, 255, 1);
		
		/* 字体 */
		color: #333333;
		font-size: 32rpx;
		font-weight: 520; /* 字体加粗，更清晰 */
		
		/* 动效 */
		transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
		box-sizing: border-box;
	}

	/* 普通项 */
	.box {
		@extend %box-shared;
		display: flex;
		justify-content: center;
		align-items: center;
		
		/* 点击反馈 */
		&:active {
			transform: scale(0.98) translateY(2rpx); /* 按下时微缩+下沉 */
			/* 按下时阴影收缩变淡，模拟贴地 */
			box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
			background-color: #f2f2f2;
		}
	}

	/* 开关项 */
	.box1 {
		@extend %box-shared;
		display: flex;
		align-items: center;
		justify-content: space-between; 
		padding: 0 40rpx; 
		
		text {
			font-size: 32rpx;
			color: #333;
			font-weight: 520;
		}

		.choose {
			transform: scale(0.9);
		}
	}
}
.checkbox{
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 5px;
	margin-bottom: 10px;
	margin-left: 10px;
	margin-right: 10px;
	box-sizing: border-box;
	// width: 100%;
	height: 60rpx;
	background: #ffffff;
	border-radius: 8px;              /* 轻微圆角 */
	// padding: 16px;                   /* 内边距 */
	box-shadow: 0 1px 3px rgba(0,0,0,0.12),
			  0 1px 2px rgba(0,0,0,0.24);  /* 典型 Material 阴影 */
	transition:
	box-shadow 0.2s ease,
	transform 0.15s ease,
	border-color 0.15s ease,
	background-color 0.15s ease;
	border: 1px solid transparent;   /* 为选中状态预留边框过渡 */
	cursor: pointer;                 /* 表示可点击 */
	color: #000;
}      
.isSelcet {
	background: #e3f2fd;              /* 淡蓝背景，类似 Material 的选中色 */
	border-color: #2196f3;            /* 主色边框 */
	box-shadow: 0 6px 10px rgba(0,0,0,0.18),
			  0 3px 5px rgba(0,0,0,0.24);  /* 阴影更明显一点 */
	transform: translateY(-2px);      /* 轻微“抬起” */
}
.page-container {
  position: relative;
  width: 100%;
  height: 100vh; /* 使用视窗单位确保全屏 */
  color: white; /* 文字颜色设为白色以便于阅读 */
}

/* 使用 ::before 伪元素添加半透明背景图像 */
.page-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('../../static/background.jpg'); /* 背景图片路径 */
  background-size: cover;
  background-position: center;
  opacity: 0.3; /* 设置透明度 */
  z-index: -1; /* 确保背景位于文本下方 */
}
</style>
