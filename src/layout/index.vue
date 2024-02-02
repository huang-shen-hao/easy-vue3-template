<template>
  <div class="layout_container">
    <!--顶部-->
    <LayoutHeader></LayoutHeader>
    <!--底部侧边栏和main区域-->
    <div class="layout_bottom">
      <div
        class="layout_slider"
        :class="{ flod: useSettingStore.isFlod ? true : false }"
      >
        <el-scrollbar height="100%">
          <el-menu
            :default-active="activePath"
            router
            background-color="#2E1256FF"
            text-color="white"
            :collapse="useSettingStore.isFlod"
          >
            <LayoutMenu :menuList="menuList"></LayoutMenu>
          </el-menu>
        </el-scrollbar>
      </div>
      <div
        class="layout_main"
        :class="{ flod: useSettingStore.isFlod ? true : false }"
      >
        <div class="bar_container">
          <TabBar></TabBar>
        </div>
        <div class="route_container">
          <!--过渡-->
          <router-view v-slot="{ Component }">
            <transition name="fade">
              <component :is="Component" v-if="refreshFlag" />
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'LayOut',
}
</script>
<script setup lang="ts">
import LayoutHeader from '@/layout/layoutHeader.vue'
import LayoutMenu from '@/layout/layoutMenu.vue'
import TabBar from '@/components/tabBar/index.vue'
import userStore from '@/store/modules/user.ts'
import { useRoute } from 'vue-router'
import { nextTick, ref, watch } from 'vue'
import settingStore from '@/store/modules/setting.ts'
let useUserStore = userStore()
let menuList = useUserStore.menuRoutes

// 获取路由对象 路径就是active
let getRouteInfo = useRoute()
let activePath = ref<string>()
activePath.value = getRouteInfo.fullPath //激活菜单
// console.log('getRouteInfo', getRouteInfo)
// 从仓库获取是否折叠tag值
let useSettingStore = settingStore()
let refreshFlag = ref<boolean>(true)
watch(
  () => useSettingStore.refresh,
  () => {
    console.log('fresh')
    refreshFlag.value = false
    nextTick(() => {
      refreshFlag.value = true //dom更新循环结束后
    })
  }
)
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_bottom {
    width: 100%;
    height: calc(100vh - 80px);
    display: flex;
    justify-content: center;
    align-items: center;
    .layout_slider {
      width: $base-menu-width;
      height: 100%;
      background-color: $base-menu-color;
      transition: all 0.3s;
      &.flod {
        width: $base-menu-width-flod;
      }
    }
    .layout_main {
      width: calc(100% - $base-menu-width);
      height: 100%;
      overflow: auto;
      position: relative;
      transition: all 0.3s;
      .bar_container {
        width: 100%;
        position: sticky;
        top: 0;
        left: 0;
        background-color: #e9eff5;
        z-index: 99; //tabBar不被底部内容遮挡
      }
      .route_container {
        width: 100%;
      }
      &.flod {
        width: calc(100% - $base-menu-width-flod);
      }
    }
  }
}
.el-divider {
  height: 20px;
  font-weight: bolder;
}
.el-menu {
  border-right: none;
}

.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
}
</style>
