<template>
  <div class="login_container">
    <div class="copy_right">
      <span>
        Copyright©2024-9999. 保留所有权利。联系我们：1467788588@qq.com。
      </span>
    </div>
    <div class="login_container_item">
      <el-row style="width: 100%; height: 100%">
        <el-col :span="12" :xs="0" class="row_left"></el-col>
        <el-col :span="12" :xs="24" class="row_right">
          <el-row class="row_logo">
            <SvgIcon name="feiji" width="30" height="30"></SvgIcon>
            <SvgIcon name="W" width="30" height="30"></SvgIcon>
            <SvgIcon name="E" width="30" height="30"></SvgIcon>
            <SvgIcon name="L" width="30" height="30"></SvgIcon>
            <SvgIcon name="C" width="30" height="30"></SvgIcon>
            <SvgIcon name="O" width="30" height="30"></SvgIcon>
            <SvgIcon name="M" width="30" height="30"></SvgIcon>
          </el-row>
          <!--表单部分-->
          <el-row class="form_row">
            <el-form
              :model="loginForm"
              ref="formRef"
              :rules="rules"
              style="width: 100%; padding: 30px"
            >
              <el-form-item prop="userName">
                <el-input
                  class="input_container"
                  v-model="loginForm.username"
                  clearable
                  placeholder="请输入用户名"
                >
                  <template #prefix>
                    <SvgIcon name="zhanghao" width="22" height="22"></SvgIcon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="passWord">
                <el-input
                  class="input_container"
                  v-model="loginForm.password"
                  type="password"
                  show-password
                  placeholder="密码包含数字母、数字，长度8~12位"
                >
                  <template #prefix>
                    <SvgIcon name="mima" width="22" height="22"></SvgIcon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  :loading="loading"
                  @click="onBtnLogin"
                  type="primary"
                  style="width: 100%; height: 50px; background-color: #0170fc"
                >
                  登录
                </el-button>
              </el-form-item>
            </el-form>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import userStore from '@/store/modules/user.ts'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  ElMessage,
  ElNotification,
  FormInstance,
  FormRules,
} from 'element-plus'
import { getGreeting } from '@/utils'
import { getUserInfo } from '@/api/user'
// 收集表单数据
type FormType = {
  username: string
  password: string
}
let loginForm = ref<FormType>({
  username: '',
  password: '',
})
let formRef = ref<FormInstance>() //表单实例
// 自定义校验规则
const validateUserName = (rule: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback() //放行
  } else {
    callback(new Error('账号长度至少五位'))
  }
}
const validatePassWord = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback() //放行
  } else {
    callback(new Error('密码长度至少六位'))
  }
}
let rules = reactive<FormRules>({
  username: [
    {
      validator: validateUserName,
      trigger: 'blur',
    },
  ],
  password: [
    {
      validator: validatePassWord,
      trigger: 'blur',
    },
  ],
})

let router = useRouter()
let useUserStore = userStore()
// 登陆按钮loading效果
let loading = ref<boolean>(false)

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

const onBtnLogin = () => {
  if (!formRef.value) return
  formRef.value?.validate(async (isValid) => {
    if (isValid) {
      loading.value = true
      let res = await useUserStore.userLogin(loginForm.value)
      if (res === 'pass') {
        loading.value = false
        await getInfo()
        await router.push('/')
        ElNotification({
          title: getGreeting(),
          message: `欢迎回来，${loginForm.value.username}`,
          type: 'success',
          duration: 3000,
        })
      } else {
        loading.value = false
        ElMessage.error('error')
      }
    } else {
      return
    }
  })
}
</script>

<style scoped lang="scss">
.login_container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 50px;
  background-image: url('@/assets/back_login.png');
  background-repeat: no-repeat;
  background-size: cover;
  .copy_right {
    width: 100%;
    height: 80px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0;
    color: #999999;
  }
  .login_container_item {
    width: 1000px;
    height: 448px;
    border-radius: 8px;
    background-color: white;
    overflow: hidden;
    .row_left {
      background-image: url('@/assets/left_login.png');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      width: 500px;
      height: 448px;
    }
    .row_right {
      width: 500px;
      height: 448px;
      position: relative;
      .row_logo {
        height: 200px;
        position: absolute;
        top: 20px;
        padding: 30px;
      }
      .form_row {
        //background-color: crimson;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        ::v-deep .input_container .el-input__wrapper {
          background-color: #f6f7fb;
          border: none;
          box-shadow: none;
        }
      }
    }
  }
}

::v-deep .el-input__inner {
  height: 58px;
}

::v-deep(.el-input .el-input__icon) {
  width: 20px;
}

:deep(.el-icon svg) {
  height: 20px;
  width: 20px;
  font-size: 18px;
  font-weight: bolder;
  color: #2e1256;
}
</style>
