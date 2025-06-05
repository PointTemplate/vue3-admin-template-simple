import { useUserStore } from '@/stores/userStore'

export function usePermission() {
  const userStore = useUserStore()
  return {
    currentRole: userStore.userInfo?.role
  }
}
