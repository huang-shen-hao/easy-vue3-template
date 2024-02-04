<template>
  <div class="container">
    <el-row>
      <div class="img_container"></div>
    </el-row>
    <el-row>
      <div class="text_container">
        <p>404 ERROR</p>
        <p>抱歉，您没有权限访问此页面</p>
      </div>
    </el-row>
    <el-row>
      <div class="button_container">
        <el-button type="primary" @click="router.push('/')">返回首页</el-button>
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import router from '@/router/index.js'
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  background-color: #d3a9a9;
  .el-row {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .img_container {
    width: 800px;
    height: 800px;
    background: url(@/assets/404.png) no-repeat;
    background-size: contain;
  }
  .text_container {
    color: #f1eaea;
    text-align: center;
    font-size: 80px;
  }
  .button_container {
    margin-top: 20px;

    ::v-deep .el-button {
      position: relative;
      width: auto;
      min-width: 180px;
      height: 52px;
      padding: 10px;
      text-align: center;
      color: #fff;
      background: #00d463;
      cursor: pointer;
      border-radius: 4px;
      border: none;
    }

    ::v-deep .el-button:after,
    .el-button:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 0;
      height: 100%;
      background: #00d463;
      z-index: -2;
      border-radius: 4px;
    }
    ::v-deep .el-button:hover {
      z-index: 1;
      background: transparent;
    }
    ::v-deep .el-button:before {
      transition: 0.3s;
      background: #14ae5c;
      z-index: -1;
    }
    ::v-deep .el-button:hover:after,
    .el-button:hover:before {
      width: 100%;
    }
  }
}
</style>
