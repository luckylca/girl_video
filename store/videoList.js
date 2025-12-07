import { defineStore } from "pinia"
import { ref, watch } from 'vue'
export const videoListStore = defineStore("videoList",()=>{
	const videoList = ref([])
	const coverList = ref([])
	const drawContent = ref([
		{"value": 0,"text": "随机播放","videoList":[],"coverList":[]},
		{"value": 1,"text": "小姐姐1","coverList":[],"videoList":[]},
		{"value": 2,"text": "小姐姐2","coverList":[],"videoList":[]},
	])
	// const videoListStr = uni.getStorageSync('videoList')
	// if (videoListStr) {
	//   videoList.value = JSON.parse(videoListStr)
	// }

	// const coverListStr = uni.getStorageSync('coverList')
	// if (coverListStr) {
	//   coverList.value = JSON.parse(coverListStr)
	// }

	const drawContentStr = uni.getStorageSync('drawContent')
	if (drawContentStr) {
	  drawContent.value = JSON.parse(drawContentStr)
	}
	const addVideoItem = (videoItem)=>{
		videoList.value.push(videoItem)
	}
	const addCoverItem = (coverItem)=>{
		coverList.value.push(coverItem)
	}
	const addDrawContent = (drawItem) => {
		drawContent.value.push(drawItem)
	}
	const deleteDrawContent = (drawItem) => {
	  const index = drawContent.value.findIndex(
		it => it.value === drawItem.value
	  )
	  if (index !== -1) {
		drawContent.value.splice(index, 1)
	  }
	}
	// watch(
	//   () => videoList.value,
	//   (newVal) => {
	//     uni.setStorageSync('videoList', JSON.stringify(newVal))
	//   },
	//   { deep: true }
	// )
	watch(
	  () => drawContent.value,
	  (newVal) => {
	    uni.setStorageSync('drawContent', JSON.stringify(newVal))
	  },
	  { deep: true }
	)
	// watch(
	//   () => coverList.value,
	//   (newVal) => {
	//     uni.setStorageSync('coverList', JSON.stringify(newVal))
	//   },
	//   { deep: true }
	// )
	return {videoList,addVideoItem,drawContent,addDrawContent,coverList,addCoverItem,deleteDrawContent}
})
