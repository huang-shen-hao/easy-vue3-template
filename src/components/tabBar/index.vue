<template>
  <div class="tabBar_container">
    <span class="open_or_close" @click="onFlodClick">
      <SvgIcon
        :name="useSettingStore.isFlod ? 'zhankai' : 'zhedie'"
        fill="black"
      ></SvgIcon>
    </span>

    <div style="margin-left: 10px">
      <el-breadcrumb :separator-icon="ArrowRight">
        <!--利用路由对象上的matched动态获取路由路径-->
        <el-breadcrumb-item
          v-for="(item, index) in $route.matched"
          :key="index"
          :to="{ path: item.path }"
          v-show="item.meta.title"
        >
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'TabBar',
}
</script>
<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import settingStore from '@/store/modules/setting.ts'
import { useRoute } from 'vue-router'

let useSettingStore = settingStore()
let $route = useRoute()
const onFlodClick = () => {
  useSettingStore.isFlod = !useSettingStore.isFlod
  // 存到仓库
}
</script>

<style scoped lang="scss">
.tabBar_container {
  width: 100%;
  height: $base-main-height;
  padding: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  .open_or_close {
    cursor: pointer;
  }
}
</style>
