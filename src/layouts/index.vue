<template>
  <a-layout class="main-layout" :theme="theme">
    <!-- PC端侧边栏 -->
    <a-layout-sider
      v-if="!isMobile"
      v-model:collapsed="collapsed"
      collapsible
      :theme="theme"
      :width="219"
    >
      <div class="logo font22bold" v-if="!collapsed">{{ logo }}</div>
      <div class="logo font22bold" v-else>
        <img src="@/assets/logo.png" class="logo-img" />
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" :theme="theme" mode="inline">
        <template v-for="item in menuRoutes" :key="item.key">
          <template v-if="item.children && item.children.length">
            <a-sub-menu :key="item.key">
              <template #title>
                <component v-if="item.icon" :is="item.icon" />
                <span>{{ item.title }}</span>
              </template>
              <a-menu-item v-for="child in item.children" :key="child.key">
                <router-link :to="child.path">
                  <component v-if="child.icon" :is="child.icon" />
                  <span>{{ child.title }}</span>
                </router-link>
              </a-menu-item>
            </a-sub-menu>
          </template>
          <template v-else>
            <a-menu-item :key="item.key">
              <router-link :to="item.path">
                <component v-if="item.icon" :is="item.icon" />
                <span>{{ item.title }}</span>
              </router-link>
            </a-menu-item>
          </template>
        </template>
      </a-menu>
    </a-layout-sider>

    <!-- 移动端抽屉侧边栏 -->
    <a-drawer
      v-model:open="drawerVisible"
      placement="left"
      :width="219"
      :closable="false"
      :body-style="{ padding: 0 }"
    >
      <div class="logo font22bold">{{ logo }}</div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline">
        <template v-for="item in menuRoutes" :key="item.key">
          <template v-if="item.children && item.children.length">
            <a-sub-menu :key="item.key">
              <template #title>
                <component v-if="item.icon" :is="item.icon" />
                <span>{{ item.title }}</span>
              </template>
              <a-menu-item 
                v-for="child in item.children" 
                :key="child.key"
                @click="drawerVisible = false"
              >
                <router-link :to="child.path">
                  <component v-if="child.icon" :is="child.icon" />
                  <span>{{ child.title }}</span>
                </router-link>
              </a-menu-item>
            </a-sub-menu>
          </template>
          <template v-else>
            <a-menu-item 
              :key="item.key"
              @click="drawerVisible = false"
            >
              <router-link :to="item.path">
                <component v-if="item.icon" :is="item.icon" />
                <span>{{ item.title }}</span>
              </router-link>
            </a-menu-item>
          </template>
        </template>
      </a-menu>
    </a-drawer>

    <!-- 主内容区 -->
    <a-layout>
      <a-layout-header class="header">
        <MenuUnfoldOutlined v-if="isMobile" @click="drawerVisible = true" />
        <div class="header-right">
          <Header />
        </div>
      </a-layout-header>

      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { appRoutes } from "@/router";
import { useDeviceStore } from "@/stores/deviceStore";
import { useUserStore } from "@/stores/userStore";
import type { UserRole } from "@/stores/userStore";
import Header from "./header.vue";
import { MenuUnfoldOutlined } from "@ant-design/icons-vue";

const drawerVisible = ref(false);
const logo = ref("XX 管理系统");
const theme = ref("light");

const route = useRoute();
const deviceStore = useDeviceStore();
const userStore = useUserStore();
const isMobile = computed(() => deviceStore.isMobile);

const selectedKeys = computed(() => [route.meta?.key ?? ""]);

const menuRoutes = computed(() => {
  const root = appRoutes.find((r: any) => r.path === "/");
  return root?.children
    ?.filter((r: any) => {
      // 过滤掉隐藏的菜单
      if (r.meta?.hidden) return false;
      // 检查权限
      const roles = r.meta?.roles as UserRole[] | undefined;
      if (!roles) return true;
      return userStore.hasPermission(roles);
    })
    .map((r: any) => ({
      key: r.meta?.key,
      title: r.meta?.title,
      icon: r.meta?.icon,
      path: r.path.startsWith("/") ? r.path : `/${r.path}`,
      children: r.children
        ?.filter((child: any) => {
          // 过滤掉隐藏的子菜单
          if (child.meta?.hidden) return false;
          // 检查子菜单权限
          const roles = child.meta?.roles as UserRole[] | undefined;
          if (!roles) return true;
          return userStore.hasPermission(roles);
        })
        .map((child: any) => ({
          key: child.meta?.key,
          title: child.meta?.title,
          icon: child.meta?.icon,
          path: `/${r.path}/${child.path}`,
        })),
    })) ?? [];
});

const isCompactLayout = ref(window.innerWidth < 1000);
const collapsed = computed({
  get: () => isCompactLayout.value,
  set: (val: boolean) => (isCompactLayout.value = val),
});

const handleResize = () => {
  deviceStore.checkDevice();
  isCompactLayout.value = window.innerWidth < 1000;
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
}

.logo {
  padding: 24px;
}

.logo-img {
  width: 100%;
}

.header {
  background: #fff;
  padding: 0 16px;
  display: flex;
  align-items: center;
}

.header-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.content {
  margin: 16px;
}
</style>
