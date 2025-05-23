<template>
	<view class="videoContiner" v-for="item in likeList" :key="item.id">
		<video :src=item.url></video>
	</view>
</template>

<script>
import { likeStore } from '../../store/like';
import { ref } from "vue";

const Store = likeStore()
const likeList = ref([])
likeList.value = Store.likeList


</script>

<style>
</style>
