<template>
	<view class="layout">
		<view class="content">
			<basic></basic>
		</view>
	</view>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import basic from '../../components/basic/basic.vue'


onBeforeMount(()=>{
	uni.setStorage({
		key:"autoplay",
		data:false
	})
	uni.setStorage({
		key:"line",
		data:0
	})
})

</script>

<style lang="scss" scoped>

</style>
