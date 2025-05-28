import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const likeStore = defineStore('like', () => {
  // 从本地读取数据并初始化 likeList
  const storedData1 = uni.getStorageSync('likeList')
  const storedData2 = uni.getStorageSync('downloadTitleList')
  const storedData3 = uni.getStorageSync('userData')
  const likeList = ref(storedData1 ? JSON.parse(storedData1) : [])
  const userData = ref(storedData3 ? JSON.parse(storedData3) : {})
	const downloadTitleList = ref(storedData2 ? JSON.parse(storedData2) : [])
  // 添加收藏项
  const addLikeList = (tempLikeItem) => {
    likeList.value = [...likeList.value, tempLikeItem]
  }
  const addDownloadTitleList = (title) => {
    downloadTitleList.value = [...downloadTitleList.value, title]
  }
  // 移除最后一个收藏项
  const removeLikeList = () => {
    likeList.value = likeList.value.slice(0, -1)
  }
	const updataLikeList = (list)=>{
		likeList.value = list
	}
	const updataUserData = (data)=>{
		userData.value = data
	}
  // 监听 likeList 变化，自动保存到本地
  watch(
    () => likeList.value,
    (newVal) => {
      uni.setStorageSync('likeList', JSON.stringify(newVal))
    },
    { deep: true }
  )
  watch(
    () => downloadTitleList.value,
    (newVal) => {
      uni.setStorageSync('downloadTitleList', JSON.stringify(newVal))
    },
    { deep: true }
  )
  watch(
    () => userData.value,
    (newVal) => {
      uni.setStorageSync('userData', JSON.stringify(newVal))
    },
    { deep: true }
  )
  return { likeList, addLikeList, removeLikeList,updataLikeList,downloadTitleList,updataUserData,addDownloadTitleList,userData }
})