<template>
  <div class="home_container">
    {{ useUserStore.userInfo.routes }}
  </div>
</template>

<script setup lang="ts">
import userStore from '@/store/modules/user.ts'

let useUserStore = userStore()
</script>

<style scoped lang="scss"></style>
