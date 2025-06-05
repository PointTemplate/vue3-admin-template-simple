import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDeviceStore = defineStore('device', () => {
  const isMobile = ref(false)

  const checkDevice = () => {
    const ua = navigator.userAgent

    // 判断是否为移动设备
    const isTouchDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)

    // 判断是否为小屏幕（进一步加强判断准确度）
    const isSmallScreen = window.innerWidth <= 600

    isMobile.value = isTouchDevice || isSmallScreen
  }

  return {
    isMobile,
    checkDevice,
  }
})
