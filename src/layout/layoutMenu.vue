<template>
  <template v-for="item in props.menuList" :key="item.path">
    <!--没有子路由-->
    <template v-if="!item.children">
      <el-menu-item v-if="!item.meta.hidden" :index="item.path">
        <i>
          <SvgIcon :name="item.meta.icon"></SvgIcon>
        </i>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!--有children但是只有一个-->
    <template v-if="item.children && item.children.length === 1">
      <el-menu-item
        v-if="!item.children[0].meta.hidden"
        :index="item.children[0].path"
      >
        <i>
          <SvgIcon :name="item.children[0].meta.icon"></SvgIcon>
        </i>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!--多个children-->
    <el-sub-menu
      :index="item.path"
      v-if="item.children && item.children.length > 1"
    >
      <template #title>
        <i>
          <SvgIcon :name="item.meta.icon"></SvgIcon>
        </i>
        <span>{{ item.meta.title }}</span>
      </template>
      <layoutMenu :menuList="item.children"></layoutMenu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router'

const props = defineProps({
  menuList: {
    required: true,
    type: [] as RouteRecordRaw[],
  },
})
</script>

<script lang="ts">
export default {
  name: 'layoutMenu',
}
</script>
<style scoped lang="scss">
i {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 8px;
}
</style>
