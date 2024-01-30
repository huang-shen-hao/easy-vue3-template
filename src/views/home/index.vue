<template>
  <div style="height: 1000px; background-color: #14dc43">
    {{ useUserStore.userInfo }}
  </div>
</template>

<script setup lang="ts">
import userStore from '@/store/modules/user.ts'
import { onMounted } from 'vue'
import { getUserInfo } from '@/api/user'
import { ElMessage } from 'element-plus'

let useUserStore = userStore()

// 获取用户基本信息
const getInfo = async () => {
  let res = await getUserInfo()
  if (res.code === 200 && res.data) {
    useUserStore.setUserInfo(res.data)
  } else {
    ElMessage.error(res.message)
  }
  console.log('home', useUserStore)
}
onMounted(() => {
  getInfo()
})
</script>

<style scoped lang="scss"></style>
