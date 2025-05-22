import { defineStore } from 'pinia'
import {ref} from 'vue'
export const likeStore = defineStore('like',()=>{
	
	const likeList = ref([])
	const addLikeList = (tempLikeItem)=>{
		likeList.value = [...likeList.value,tempLikeItem]
	}
	const removeLikeList = ()=>{
		likeList.value.pop()
	}

	return {likeList,addLikeList,removeLikeList}
})