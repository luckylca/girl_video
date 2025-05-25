<template>
	<view class="page-container">
		<view class="loginDisplay" id="loginDisplay" v-if="isShow">
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
			<view class="box" @click="info">
				关于app
			</view>
		</view>
		<view class="drawer">			
			<uni-drawer ref="showRight" mode="right" :width="150">
			  <view class="drawer-content">
				  <view class="checkbox">
					<uni-data-checkbox class="checkbox" mode="list" v-model="value" :localdata="date" :multiple="false" @change="change"></uni-data-checkbox>
				  </view>
			  </view>
			</uni-drawer>
		</view>
	</view>
</template>

<script setup>
import { likeStore } from "../../store/like"
import {ref} from "vue"
const isChecked = ref(false)
const showRight = ref(null)
const value = ref(0)
const letter = ref("L")
const date = ref([{"value": 0,"text": "小姐姐1"},{"value": 1,"text": "小姐姐2"},{"value": 2,"text": "女大学生"},{"value": 3,"text": "黑丝"},{"value": 4,"text": "cos"},{"value": 5,"text": "白丝"},{"value": 6,"text": "身材"},{"value": 7,"text": "蛇姐"},{"value": 8,"text": "吊带"},{"value": 9,"text": "玉足"},{"value": 10,"text": "汉服"},{"value": 11,"text": "清纯"},{"value": 12,"text": "萝莉"}])
const userSrc = ref("https://tse4-mm.cn.bing.net/th/id/OIP-C.Nj6o69waOC3JTbebyCu-hgHaEc?cb=iwp2&rs=1&pid=ImgDetMain")
const loginSrc = ref("https://tse4-mm.cn.bing.net/th/id/OIP-C.Nj6o69waOC3JTbebyCu-hgHaEc?cb=iwp2&rs=1&pid=ImgDetMain")
const Store = likeStore()
const isShow = ref(false)
const account = ref("")
const password = ref("")
const name = ref("")
function change(){
	console.log(value.value);
	uni.setStorage({
		key:"line",
		data:value.value
	})
	
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
function loginDisplayOpen(){
	isShow.value = true
}
function loginDisplayDown()
{
	isShow.value = false
}
async function login()
{	
	if(account.value==""||password.value=="")
	{
		uni.showToast({ title: '请输入账号和密码', icon: 'none',duration:2000});
		return
	}
	uni.showLoading({ title: '正在登录...' });
	const data = await uni.request({
		url:"",
		data:{account:account.value,password:password.value}
	})
	if(data.code==500)
	{
		uni.showToast({
			title:'登录成功',icon:"none",duration:2000
		})
		name.value = data.name
		Store.updataLikeList(data.list)
	}
	if(data.code==302)
	{
		uni.showToast({
			title:'账号或者密码错误',icon:"none",duration:2000
		})
	}
	if(data.code==501)
	{
		uni.showToast({
			title:'已为你注册账号',icon:"none",duration:2000
		})
		name.value = data.name
		Store.updataLikeList(data.list)
	}
	uni.hideLoading()
	
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
	
</script>

<style lang="scss" scoped>
.loginDisplay{
	width: 600rpx;
	height: 800rpx;
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
	background-color: white;
	z-index: 1000;
	display: block;
	
	.avatar{
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
		object-fit: contain;
		// border: 1px solid red;
		color: black;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgb(137, 207, 240);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		font-size: 90rpx;
		margin: 40rpx auto;
	}
	.accountInput{
		width: 450rpx;
		height: 80rpx;
		padding-left: 20rpx;
		box-sizing: border-box;
		margin: 20rpx auto;
		margin-top: 50rpx;
		color: black;
		border: 1px solid red;
	}
	.passwordInput{
		width: 450rpx;
		height: 80rpx;
		padding-left: 20rpx;
		box-sizing: border-box;
		margin: 40rpx auto;
		color: black;
		border: 1px solid red;
	}
	.loginButton{
		width: 450rpx;
		margin-top: 60rpx;
	}
	.tip{
		color: black;
		text-align: center;
		margin-top: 20rpx;
		opacity: 0.6;
	}
}
.loginLayout{
	// border:1rpx solid red;
	display: flex;
	width:250rpx;
	height: 300rpx;
	justify-content: center;
	align-items: center;
	margin-left: auto;
	margin-right: auto;
	flex-direction: column;
	.avatar{
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
		object-fit: contain;
		// border: 1px solid red;
		color: black;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgb(137, 207, 240);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		font-size: 90rpx;
	}
	.account{
		margin-top: 20rpx;
		color: #000;
		font-size: 30rpx;
	}
	
	
	
}
.layout{
	padding-top: 50rpx;

	.box{
		
		border-radius: 15rpx;
		width: 700rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 40rpx;
		height: 110rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
		font-size: 35rpx;
		color: black;

	}
	.box1{
		border-radius: 15rpx;
		width: 700rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 40rpx;
		height: 110rpx;
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
		display: flex;
		align-items: center;
		padding-left: 20px;
		box-sizing: border-box;
		font-size: 35rpx;
		position: relative;
		color: black;
		.choose{
			margin-right: 20rpx;
			position: absolute;
			right: 0;
		}
	}
}
.checkbox{
	display: flex;
	justify-content: center;

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
