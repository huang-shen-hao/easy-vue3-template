<template>
  <div style="height: 1000px; background-color: #14dc43">
    {{ useUserStore.userInfo.routes }}
  </div>
</template>

<script setup lang="ts">
import userStore from '@/store/modules/user.ts'

let useUserStore = userStore()
</script>

<style scoped lang="scss"></style>
