<template>
	<view class="layout">
		<view class="box">
			<view class="">
				<view class="text1">
					一个简单的前端练手app
				</view>
				<view class="text2">
					——made by lucky
				</view>
			</view>

		</view>
	
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>

	
.box{
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
	margin-top: 400rpx;
	border-radius: 20rpx;
	width: 500rpx;
	margin-left: auto;
	margin-right: auto;
	height: 200rpx;
	display: flex;
	justify-content: center;

	position: relative;
	
	.text1{
		position: absolute;
		left: 5px;
		top:50rpx;
		font-size: 30rpx;
	}
	.text2{
		position: absolute;
		right: 5px;
		bottom: 30px;
		
	}
	
}
	       
</style>
