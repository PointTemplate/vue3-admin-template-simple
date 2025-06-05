import { defineStore } from 'pinia'
import { ref } from 'vue'

export type UserRole = 'admin' | 'user'

interface UserInfo {
  username: string
  role: UserRole
}

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(localStorage.getItem('token') || '')
  const storedUserInfo = localStorage.getItem('userInfo')
  const userInfo = ref<UserInfo | null>(storedUserInfo ? JSON.parse(storedUserInfo) : null)

  const setUserInfo = (info: UserInfo) => {
    userInfo.value = info
    localStorage.setItem('userInfo', JSON.stringify(info))
  }

  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  const clearUserInfo = () => {
    userInfo.value = null
    token.value = ''
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
  }

  const hasPermission = (requiredRoles: UserRole[]) => {
    if (!userInfo.value) return false
    return requiredRoles.includes(userInfo.value.role)
  }

  return {
    userInfo,
    token,
    setUserInfo,
    setToken,
    clearUserInfo,
    hasPermission
  }
})