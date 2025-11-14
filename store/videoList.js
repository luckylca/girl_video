import { defineStore } from "pinia";
import { ref, watch } from 'vue'
export const videoListStore = defineStore("videoList",()=>{
	const videoList = ref([])
	const drawContent = ref([
		{"value": 0,"text": "小姐姐1"},{"value": 1,"text": "小姐姐2"}
	])
	const addVideoItem = (videoItem)=>{
		videoList.value.push(videoItem)
	}
	watch(
	  () => videoList.value,
	  (newVal) => {
	    uni.setStorageSync('videoList', JSON.stringify(newVal))
	  },
	  { deep: true }
	)
	watch(
	  () => drawContent.value,
	  (newVal) => {
	    uni.setStorageSync('videoList', JSON.stringify(newVal))
	  },
	  { deep: true }
	)
	return {videoList,addVideoItem,drawContent}
})
