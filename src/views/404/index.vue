<template>
  <div class="container">
    <el-row class="top_container">
      <div class="img_container"></div>
    </el-row>
    <el-row class="bottom_container">
      <div class="text_container">
        <p>404 ERROR</p>
        <p>抱歉，您没有权限访问此页面</p>
      </div>
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
  background-color: #777dec;
  .top_container {
    width: 100%;
    height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .img_container {
      width: 600px;
      height: 100%;
      background-size: cover;
      background: url(@/assets/404.png) no-repeat center;
    }
  }
  .bottom_container {
    width: 100%;
    height: 40vh;
    display: flex;
    flex-direction: column;
    //justify-content: center;
    align-items: center;
    .text_container {
      color: #f1eaea;
      text-align: center;
      font-size: 60px;
    }
    .button_container {
      ::v-deep .el-button {
        margin-top: 20px;
        position: relative;
        width: 180px;
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
        font-size: 18px;
      }
      ::v-deep .el-button:before {
        transition: 0.3s;
        background: rgb(98, 162, 243);
        z-index: -1;
      }
      ::v-deep .el-button:hover:after,
      .el-button:hover:before {
        width: 100%;
      }
    }
  }
}
</style>
