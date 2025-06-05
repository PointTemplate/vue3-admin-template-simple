import { createRouter, createWebHistory } from "vue-router";
import {
  DashboardOutlined,
  UnorderedListOutlined,
  ControlOutlined,
  FileTextOutlined,
  TeamOutlined,
} from "@ant-design/icons-vue";
import { useUserStore } from '@/stores/userStore'
import type { UserRole } from '@/stores/userStore'

const Layouts = () => import("@/layouts/index.vue");

export const appRoutes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/account/login/index.vue"),
    meta: {
      hidden: true,
    },
  },
  {
    path: "/404",
    component: () => import("@/views/error/404.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
  {
    path: "/403",
    component: () => import("@/views/error/403.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
  {
    path: "/",
    component: Layouts,
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: {
          title: "工作台",
          icon: DashboardOutlined,
          key: "dashboard",
          roles: ['admin', 'user'] as UserRole[]
        },
      },
      {
        path: "project",
        name: "project",
        meta: {
          title: "项目管理",
          icon: UnorderedListOutlined,
          key: "project",
          roles: ['admin', 'user'] as UserRole[]
        },
        children: [
          {
            path: "list",
            name: "list",
            component: () => import("@/views/project/list.vue"),
            meta: {
              title: "项目列表",
              icon: FileTextOutlined,
              key: "list",
              roles: ['admin','user'] as UserRole[]
            },
          },
          {
            path: "person",
            name: "person",
            component: () => import("@/views/project/person.vue"),
            meta: {
              title: "项目人员",
              icon: TeamOutlined,
              key: "person",
              roles: ['admin'] as UserRole[]
            },
          },
        ],
      },
      {
        path: "admin",
        name: "admin",
        component: () => import("@/views/admin/index.vue"),
        meta: {
          title: "管理员",
          icon: ControlOutlined,
          key: "admin",
          roles: ['admin'] as UserRole[]
        },
      },
    ],
  },
] as any;

const router = createRouter({
  history: createWebHistory(),
  routes: appRoutes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const token = userStore.token

  if (to.path === "/login") {
    next();
  } else if (!token) {
    next({ path: "/login", query: { redirect: to.fullPath } });
  } else {
    // 检查路由权限
    const requiredRoles = to.meta.roles as UserRole[] | undefined
    if (requiredRoles && !userStore.hasPermission(requiredRoles)) {
      next('/403')
    } else {
      next()
    }
  }
});

export default router;
