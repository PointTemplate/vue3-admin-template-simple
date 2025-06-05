<template>
  <div class="header">
    <div class="name">
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          Point
          <CaretDownOutlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="logout"> 退出登录 </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CaretDownOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
const router = useRouter();

const logout = () => {
  localStorage.removeItem("token");
  router.replace("/login");
};
</script>

<style lang="scss" scoped>
.header {
  padding: 0 20px;
  .name {
    text-align: right;
  }
}
</style>
