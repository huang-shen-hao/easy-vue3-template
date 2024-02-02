<template>
  <div class="data_container"></div>
</template>

<script setup lang="ts">
const container = document.querySelector('.data_container')

// 获取变化后 缩放比例
const getScaleRatio = (w: 1920, h: 1080) => {
  const W_Ratio = window.innerWidth / w
  const H_Ratio = window.innerHeight / h
  return W_Ratio < H_Ratio ? W_Ratio : H_Ratio
}

window.onresize = () => {
  console.log('H', window.innerHeight)
  console.log('W', window.innerWidth)
  let ratio = getScaleRatio(1920, 1080)
  console.log('ooo', ratio)
}
</script>

<style scoped lang="scss">
.data_container {
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
