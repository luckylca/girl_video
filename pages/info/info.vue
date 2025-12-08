<template>
	<view class="layout">
		<view class="box">
			<view class="text1">
				一个简单的前端练手app
			</view>
			<view class="text2">
				——lucky
			</view>
		</view>
		<view class="box">
			<view class="text3" @click="openVersion">
				版本号：3.0.0
			</view>
		</view>
		<view class="box">
			<view class="text3" @click="checkUpdate">
				检查更新
			</view>
		</view>
		<view class="box">
			<view class="text3" @click="openGithubSite">
				<image src="/static/info/github.png" style="width: 50rpx;height: 50rpx;margin-right: 20rpx;" mode=""></image>
				项目地址
			</view>
		</view>
	</view>
	<view class="versionContain" v-if="isContainShow">
		<view class="" style="display: flex;justify-content: center;align-items: center;padding-bottom: 10rpx;">
			当前版本更新内容
		</view>
		{{releaseNote}}
	</view>	
	<view class="nextVersionContain" v-if="isContainShow">
		<view class="" style="display: flex;justify-content: center;align-items: center;padding-bottom: 10rpx;">
			下个版本更新内容
		</view>
		优化后端同步内容，接入瑟瑟频道支持😋，完善安卓端的权限问题
	</view>	
	<view class="black" v-show="isHover" @click="ended">
		
	</view>
</template>

<script setup>
import { ref } from 'vue';

const isHover = ref(false)
const isContainShow = ref(false)
const githubUrl = "https://github.com/luckylca/girl_video"
function openGithubSite() {
	plus.runtime.openURL(githubUrl, function(err) {
		console.log('打开失败:' + err);
	});
	// uni.setClipboardData({
	// 	data: githubUrl,
	// 	success: function () {
	// 		uni.showToast({
	// 			title: '链接已复制，请去浏览器打开',
	// 			icon: 'none',
	// 			duration: 3000
	// 		});
	// 	}
	// });
}

const GITHUB_USER = 'luckylca'; 
const GITHUB_REPO = 'girl_video'; 
const CURRENT_VERSION = '3.0.0';
function compareVersion(v1, v2) {
    v1 = v1.replace(/^v/, '');
    v2 = v2.replace(/^v/, '');
    const parts1 = v1.split('.').map(Number);
    const parts2 = v2.split('.').map(Number);
    const len = Math.max(parts1.length, parts2.length);
    for (let i = 0; i < len; i++) {
        const num1 = parts1[i] || 0;
        const num2 = parts2[i] || 0;
        if (num1 > num2) return 1; // v1 大
        if (num1 < num2) return -1; // v2 大
    }
    return 0; // 相等
}

// 3. 检查更新的主函数
function checkUpdate() {
    uni.showLoading({ title: '检查中...' });
    uni.request({
        url: `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/releases/latest`,
        method: 'GET',
        success: (res) => {
            uni.hideLoading();
            
            if (res.statusCode === 200) {
                const latestData = res.data;
                const latestVersion = latestData.tag_name; // 例如 "v1.0.1"
                const releaseNote = latestData.body; // 更新日志
                const downloadUrl = latestData.html_url; // 发布页链接
                // 开始对比
                const result = compareVersion(latestVersion, CURRENT_VERSION);
                
                if (result === 1) {
                    // --- 发现新版本 ---
                    uni.showModal({
                        title: `发现新版本 ${latestVersion}`,
                        content: releaseNote || '修复了一些已知问题',
                        confirmText: '去下载',
                        cancelText: '稍后',
                        success: (modalRes) => {
                            if (modalRes.confirm) {
                                // 跳转到浏览器下载
                                // #ifdef APP-PLUS
                                plus.runtime.openURL(downloadUrl);
                                // #endif
                                // #ifdef H5
                                window.open(downloadUrl);
                                // #endif
                            }
                        }
                    });
                } else {
                    // --- 已经是最新 ---
                    uni.showToast({
                        title: '当前已是最新版本',
                        icon: 'none'
                    });
                }
            } else {
                // API 访问失败 (可能是网络问题或仓库私有)
                uni.showToast({
                    title: '检查失败，请稍后重试',
                    icon: 'none'
                });
            }
        },
        fail: () => {
            uni.hideLoading();
            uni.showToast({
                title: '网络请求失败',
                icon: 'none'
            });
        }
    });
}
const releaseNote = ref("修复了一些已知问题")
async function openVersion() {
	uni.showLoading({
		title:"检查中"
	})
	await uni.request({
	    url: `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/releases/latest`,
	    method: 'GET',
	    success: (res) => {
	        uni.hideLoading();
	        if (res.statusCode === 200) {
	            const latestData = res.data;
	            const latestVersion = latestData.tag_name; // 例如 "v1.0.1"
	            releaseNote.value = latestData.body; // 更新日志
	            const downloadUrl = latestData.html_url; // 发布页链接
				console.log(releaseNote.value);
				isHover.value = true
				isContainShow.value = true
	        } else {
	            uni.showToast({
	                title: '检查失败，请稍后重试',
	                icon: 'none'
	            });
	        }
	    },
	    fail: () => {
	        uni.hideLoading();
	        uni.showToast({
	            title: '网络请求失败',
	            icon: 'none'
	        });
	    }
	});
}
function ended() {
	isHover.value = false
	isContainShow.value = false
}
</script>

<style lang="scss" scoped>

.layout {
	padding-top: 200rpx;
}
.box{
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
	margin-top: 40rpx;
	margin-bottom: 40rpx;
	border-radius: 20rpx;
	width: 600rpx;
	margin-left: auto;
	margin-right: auto;
	height: 170rpx;
	display: flex;
	justify-content: center;
	position: relative;
	box-sizing: border-box;
	.text1{
		position: absolute;
		left: 10px;
		top:50rpx;
		font-size: 30rpx;
	}
	.text2{
		position: absolute;
		right: 10px;
		bottom: 20px;
	}
	.text3 {
		display: flex;
		justify-content: center;
		align-items: center;
	}
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
.versionContain{
	width: 600rpx;
	height: 15vh;
	position: fixed;
	top:10vh;
	left:75rpx;
	border-radius: 100rpx;
	z-index: 1000;
	background-color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20rpx;
	box-sizing: border-box;
	border: 2rpx solid rgba(255, 255, 255, 0.9);
	box-shadow: 0 0 50rpx rgba(0, 0, 0, 0.8);
	flex-direction: column;
}
.nextVersionContain{
	width: 600rpx;
	height: 15vh;
	position: fixed;
	top:30vh;
	left:75rpx;
	border-radius: 100rpx;
	z-index: 1000;
	background-color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20rpx;
	box-sizing: border-box;
	border: 2rpx solid rgba(255, 255, 255, 0.9);
	box-shadow: 0 0 50rpx rgba(0, 0, 0, 0.8);
	flex-direction: column;
}
</style>
