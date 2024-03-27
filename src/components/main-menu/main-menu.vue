<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.png" alt="" />
      <span class="title">后台管理系统</span>
    </div>
    <div class="menu">
      <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        background-color="#f9f9f9"
        active-text-color="#409EFF"
        text-color="#000"
      >
        <template v-for="item of userMenu">
          <el-menu-item v-if="!item.children" @click="handleParent">
            首页
          </el-menu-item>
          <el-sub-menu v-else :index="item.id + ''">
            <template #title>
              <span>{{ item.menuName }}</span>
            </template>
            <template v-for="children of item.children">
              <el-menu-item
                :index="children.id + ''"
                @click="handleChildren(children)"
              >
                {{ children.menuName }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import router from "@/router";
import useLoginStore from "@/store/login/login";
import { mapPathToMenu } from "@/util/map-menus";
import { useRoute } from "vue-router";

const loginStore = useLoginStore();
const userMenu = loginStore.userMenu;

const route = useRoute();

// 刷新的路由
const defaultActive = computed(() => {
  if (route.path == "/main/index") return;
  const path = mapPathToMenu(route.path, userMenu);
  return path.id + "";
});
const handleParent = () => {
  router.push("/main/index");
};
const handleChildren = (children: any) => {
  router.push(children.path);
};
</script>

<style lang="less" scoped>
.mian-menu {
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-menu-item {
  color: #777f8f;
}
.el-menu-item.is-active {
  color: #6681fa;
  background-color: #eaeeff !important;
}
// .el-sub-menu {
//   .el-menu-item {
//     padding-left: 50px !important;
//     background-color: #0c2135;
//   }
//   .el-menu-item:hover {
//     color: #fff;
//   }
//   .el-menu-item.is-active {
//     background-color: #0a60bd;
//   }
// }
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 0;

  background-color: white;
  .img {
    width: 40px;
    height: 40px;
  }
  .title {
    color: black;
    font-weight: 700;
    padding: 0 10px;
  }
}
</style>
