<template>
  <div class="container">
    <el-row style="height: 50%">
      <el-col :span="12" :xs="24">
        <div class="head_left"></div>
      </el-col>
      <el-col :span="12" :xs="24">
        <div class="head_right"></div>
      </el-col>
    </el-row>
    <el-row style="height: 20%">
      <el-col :span="24">
        <div class="app_container"></div>
      </el-col>
    </el-row>
    <el-row style="height: 30%">
      <el-col :span="12" :xs="24">
        <div class="bottom_left"></div>
      </el-col>
      <el-col :span="12" :xs="24">
        <div class="bottom_right"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: calc(100vh - 130px);
  .head_left {
    height: 100%;
    background-color: #00d463;
  }
  .head_right {
    height: 100%;
    background-color: #4a18ad;
  }
  .app_container {
    height: 100%;
    background-color: pink;
  }
  .bottom_left {
    height: 100%;
    background-color: #e03654;
  }
  .bottom_right {
    height: 100%;
    background-color: #c9b010;
  }
}
</style>
