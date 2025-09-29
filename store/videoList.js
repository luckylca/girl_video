import { defineStore } from "pinia";
import { ref, watch } from 'vue'
export const videoListStore = defineStore("videoList",()=>{
	const videoList = ref([])
	
	watch(
	  () => list.value,
	  (newVal) => {
	    uni.setStorageSync('videoList', JSON.stringify(newVal))
	  },
	  { deep: true }
	)
	return {videoList}
})
