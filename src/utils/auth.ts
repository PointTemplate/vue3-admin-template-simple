/**
 * 检查用户角色是否在权限数组中
 */
export function hasPermission(userRole: string, allowedRoles: string[]): boolean {
    return allowedRoles.includes(userRole)
  }
  