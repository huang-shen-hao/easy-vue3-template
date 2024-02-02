<template>
  <div class="layout_top">
    <div class="layout_top_left">
      <el-row type="flex" align="middle">
        <el-col :span="4" :xs="24">
          <SvgIcon
            v-if="SHOW_SYSTEM_LOGO"
            :name="SYSTEM_LOGO"
            :width="SHOW_SYSTEM_LOGO_SIZE"
            :height="SHOW_SYSTEM_LOGO_SIZE"
          ></SvgIcon>
        </el-col>
        <el-col :span="20" :xs="0">
          <p class="title">{{ SYSTEM_NAME }}</p>
        </el-col>
      </el-row>
    </div>
    <div class="layout_top_right">
      <!--刷新功能-->
      <el-tooltip placement="bottom" trigger="hover" content="刷新">
        <span
          class="icon_container"
          style="cursor: pointer"
          @click="refreshClick"
        >
          <SvgIcon
            name="shuaxing"
            width="26px"
            height="26px"
            fill="white"
          ></SvgIcon>
        </span>
      </el-tooltip>
      <!--暗黑模式切换-->
      <el-tooltip
        placement="bottom"
        trigger="hover"
        :content="tag ? '明亮模式' : '暗黑模式'"
        :width="250"
      >
        <span
          @click="changeMode"
          class="icon_container"
          style="cursor: pointer"
        >
          <SvgIcon
            :name="tag ? 'mingliang' : 'heian'"
            width="24px"
            height="24px"
            fill="white"
          ></SvgIcon>
        </span>
      </el-tooltip>
      <!--全屏功能-->
      <el-tooltip placement="bottom" trigger="hover" content="全屏切换">
        <span
          class="icon_container"
          style="cursor: pointer"
          @click="fullScreen"
        >
          <SvgIcon
            name="quanping"
            width="24px"
            height="24px"
            fill="white"
          ></SvgIcon>
        </span>
      </el-tooltip>
      <!--退出登陆-->
      <el-tooltip placement="bottom" trigger="hover" content="退出登陆">
        <span class="icon_container" style="cursor: pointer" @click="exitClick">
          <SvgIcon
            name="tuichudenglu"
            width="24px"
            height="24px"
            fill="white"
          ></SvgIcon>
        </span>
      </el-tooltip>
      <el-divider direction="vertical"></el-divider>
      <div class="avatar_container">
        <!--        :src="-->
        <!--        getUserStore.userInfo.avatar-->
        <!--        ? getUserStore.userInfo.avatar-->
        <!--        : avatarDefault-->
        <!--        "-->
        <el-avatar :size="50" :src="avatarDefault" />
        <span style="margin-left: 10px">
          {{ getUserStore.userInfo.name || '***' }}
        </span>
      </div>
    </div>
    <el-dialog :modal="tag"></el-dialog>
  </div>
</template>

<script setup lang="ts">
import userStore from '@/store/modules/user.ts'
import {
  SHOW_SYSTEM_LOGO,
  SHOW_SYSTEM_LOGO_SIZE,
  SYSTEM_LOGO,
  SYSTEM_NAME,
} from '@/systemConfig'
import settingStore from '@/store/modules/setting.ts'
import { REMOVE_TOKEN } from '@/utils/token.ts'
import Router from '@/router'
import { userLogout } from '@/api/user'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

let getUserStore = userStore()
let getSetStore = settingStore()
let avatarDefault =
  'https://www.qqkw.com/d/file/p/2018/06-19/61f1e99b952f7c99bb3f00904c2aa9b6.jpg'

const fullScreen = () => {
  // 原生实现
  let isFull = document.fullscreenElement //判断是否全屏
  if (!isFull) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
let useUserStore = userStore()
// 退出登陆
const exitClick = async () => {
  let res = await userLogout()
  if (res.code === 200) {
    // 清除本地缓存中的token
    REMOVE_TOKEN()
    useUserStore.userLogOut()
    await Router.push('/login')
  } else {
    ElMessage.error(res.message)
  }
}
// 刷新实现
const refreshClick = () => {
  getSetStore.refresh = !getSetStore.refresh
}
// 暗黑模式切换实现
let tag = ref<boolean>(true)
const changeMode = () => {
  tag.value = !tag.value
  let html = document.documentElement
  !tag.value ? (html.className = 'dark') : (html.className = '')
}
</script>

<style scoped lang="scss">
.layout_top {
  width: 100vw;
  height: $base-header-height;
  background: linear-gradient(to top, #3a3ab6, #35206b);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 50px;
  padding-right: 50px;
  .layout_top_left {
    display: flex;
    justify-content: center;
    align-items: center;
    .title {
      font-weight: bolder;
      font-size: 30px;
      color: white;
      margin-left: 10px;
    }
  }
  .layout_top_right {
    display: flex;
    justify-content: center;
    align-items: center;
    .avatar_container {
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      font-size: 12px;
      color: white;
      margin-right: 10px;
    }
    .icon_container {
      margin: 0 5px;
    }
  }
}
</style>
