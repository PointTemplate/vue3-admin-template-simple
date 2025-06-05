<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useDeviceStore } from '@/stores/deviceStore'

const deviceStore = useDeviceStore()

const handleResize = () => {
  deviceStore.checkDevice()
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>


<template>
  <router-view></router-view>
</template>

<style>
#app {
  width: 100%;
  height: 100vh;
}
</style>
