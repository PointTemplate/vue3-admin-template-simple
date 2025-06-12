<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useDeviceStore } from '@/stores/deviceStore'
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

const deviceStore = useDeviceStore()
const locale = "zhCN"

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
  <a-config-provider :locale="locale">
    <router-view></router-view>
  </a-config-provider>

</template>

<style>
#app {
  width: 100%;
  height: 100vh;
}
</style>
