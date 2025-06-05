<template>
  <div class="login-page">
    <div class="login-container">
      <a-card class="login-card" title="后台管理系统">
        <a-form @submit.prevent="onSubmit" layout="vertical">
          <a-form-item label="用户名">
            <a-input v-model:value="username" placeholder="请输入用户名" />
          </a-form-item>
          <a-form-item label="密码">
            <a-input-password v-model:value="password" placeholder="请输入密码" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" block>登录</a-button>
          </a-form-item>
        </a-form>

        admin/123456  或 
        user/123456
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import { useUserStore } from '@/stores/userStore'
import type { UserRole } from '@/stores/userStore'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const username = ref('admin')
const password = ref('123456')

const onSubmit = () => {
  // 模拟登录验证
  if (username.value === 'admin' && password.value === '123456') {
    const role: UserRole = 'admin'
    userStore.setUserInfo({ username: username.value, role })
    userStore.setToken('mock-token')
    message.success('登录成功')
    const redirect = (route.query.redirect as string) || '/'
    router.replace(redirect)
  } else if (username.value === 'user' && password.value === '123456') {
    const role: UserRole = 'user'
    userStore.setUserInfo({ username: username.value, role })
    userStore.setToken('mock-token')
    message.success('登录成功')
    const redirect = (route.query.redirect as string) || '/'
    router.replace(redirect)
  } else {
    message.error('账号或密码错误')
  }
}
</script>


<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1890ff 0%, #722ed1 100%);
}

.login-container {
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  display: flex;
  justify-content: center;
}

.login-card {
  width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
}
</style>
  