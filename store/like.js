import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const likeStore = defineStore('like', () => {
  // 从本地读取数据并初始化 likeList
  const storedData = uni.getStorageSync('likeList')
  const likeList = ref(storedData ? JSON.parse(storedData) : [])

  // 添加收藏项
  const addLikeList = (tempLikeItem) => {
    likeList.value = [...likeList.value, tempLikeItem]
  }
  // 移除最后一个收藏项
  const removeLikeList = () => {
    likeList.value = likeList.value.slice(0, -1)
  }

  // 监听 likeList 变化，自动保存到本地
  watch(
    () => likeList.value,
    (newVal) => {
      uni.setStorageSync('likeList', JSON.stringify(newVal))
    },
    { deep: true }
  )
  return { likeList, addLikeList, removeLikeList }
})