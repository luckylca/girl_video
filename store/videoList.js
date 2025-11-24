import { defineStore } from "pinia"
import { ref, watch } from 'vue'
export const videoListStore = defineStore("videoList",()=>{
	const videoList = ref([])
	const coverList = ref([])
	const drawContent = ref([
		{"value": 0,"text": "小姐姐1","videoList":[],"coverList":[]},
		{"value": 1,"text": "小姐姐2","coverList":[],"videoList":[]}
	])
	
	const addVideoItem = (videoItem)=>{
		videoList.value.push(videoItem)
	}
	const addCoverItem = (coverItem)=>{
		coverList.value.push(coverItem)
	}
	const addDrawContent = (drawItem) => {
		drawContent.value.push(drawItem)
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
	    uni.setStorageSync('drawContent', JSON.stringify(newVal))
	  },
	  { deep: true }
	)
	watch(
	  () => coverList.value,
	  (newVal) => {
	    uni.setStorageSync('coverList', JSON.stringify(newVal))
	  },
	  { deep: true }
	)
	return {videoList,addVideoItem,drawContent,addDrawContent,coverList,addCoverItem}
})
