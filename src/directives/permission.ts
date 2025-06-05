import type { Directive } from 'vue'
import { useUserStore } from '@/stores/userStore'

const permissionDirective: Directive = {
  mounted(el, binding) {
    const { value: allowedRoles } = binding
    const userStore = useUserStore()

    if (typeof allowedRoles === 'string') {
      console.error('v-permission 需要一个角色数组，例如：v-permission="[\'admin\']"')
      return
    }

    if (!userStore.userInfo || !allowedRoles.includes(userStore.userInfo.role)) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}

export default permissionDirective
