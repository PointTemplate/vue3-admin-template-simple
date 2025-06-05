<template>
  <div>
    <div>当前您的角色是： {{ currentRole }}</div>
    <div>测试下 v-permission</div>

    <div style="margin: 16px 0">
      
      <a-button type="primary" v-permission="['admin']">仅管理员可见</a-button>
      <a-button type="primary" v-permission="['user']">仅普通用户可见</a-button>
      <a-button type="primary" v-permission="['user', 'admin']">管理员和普通用户都可见</a-button>
    </div>

    <div style="margin: 16px 0">
      <a-button type="primary" danger v-permission="['admin']">管理员危险操作</a-button>
      <a-button type="primary" danger v-permission="['user', 'admin']">所有用户危险操作</a-button>
    </div>
  </div>
</template>
<script setup>
import { usePermission } from '@/hooks/usePermission'
const { currentRole } = usePermission()
</script>