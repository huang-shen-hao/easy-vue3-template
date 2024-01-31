<template>
  <div>
    <el-drawer v-model="drawer">
      <template #header>
        <span>{{ title }}</span>
      </template>
      <el-form ref="infoFormRef" :rules="rules" :model="infoForm">
        <el-form-item prop="username" label="用户名字">
          <el-input
            v-model="infoForm.username"
            clearable
            @blur="infoForm.username = $event.target.value.trim()"
          ></el-input>
        </el-form-item>
        <el-form-item prop="name" label="用户名称">
          <el-input
            v-model.trim="infoForm.name"
            clearable
            @blur="infoForm.name = $event.target.value.trim()"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="id === -1" prop="password" label="用户密码">
          <el-input
            v-model.trim="infoForm.password"
            clearable
            @blur="infoForm.password = $event.target.value.trim()"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="onBtnSave">保存</el-button>
        <el-button @click="drawer = false">关闭</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ADDUSER',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import { userAdd, userInfo, userUpdate } from '@/api/permission'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import userStore from '@/store/modules/user.ts'

let drawer = ref<boolean>(false)
let title = ref<string>('')
let id = ref<number>(-1)
let page = ref<number>(-1)
let oldName = ref<string>('')
const open = async (data: any) => {
  infoFormRef.value?.resetFields()
  infoForm.value.name = ''
  infoForm.value.username = ''
  infoForm.value.password = ''
  drawer.value = true
  id.value = data.id
  page.value = data.page
  title.value = data.title
  if (data.id > 0) {
    let res = await userInfo(data.id)
    if (res.code === 200 && res.data) {
      oldName.value = res.data.username as string //记录一下旧名字
      infoForm.value.name = res.data.name as string
      infoForm.value.username = res.data.username as string
      infoForm.value.password = res.data.password as string
    } else {
      ElMessage.error('获取失败')
    }
  }
}
type InfoType = {
  name: string
  username: string
  password: string
}
let infoForm = ref<InfoType>({
  name: '',
  username: '',
  password: '',
})

let infoFormRef = ref<FormInstance>()
let rules = ref<FormRules>({
  name: [
    { required: true, min: 5, message: '用户名称需大于5位', trigger: 'blur' },
  ],
  username: [
    {
      required: true,
      message: '用户名字不能为空',
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, min: 6, message: '密码至少六位', trigger: 'blur' },
  ],
})
let useUserStore = userStore()
const emit = defineEmits(['callback'])
const onBtnSave = () => {
  if (!infoFormRef.value) return
  infoFormRef.value?.validate(async (val) => {
    if (val) {
      // 有id是修改
      if (id.value > 0) {
        // 判断是否修改自己
        console.log('oooo', oldName.value)
        let tag = useUserStore.userInfo?.name == oldName.value
        let param = {
          id: id.value,
          name: infoForm.value.name,
          password: infoForm.value.password,
          username: infoForm.value.username,
        }
        let res = await userUpdate(param)
        if (res.code === 200) {
          ElMessage.success('修改成功')
          emit('callback', { page: page.value, tag })
          drawer.value = false
        } else {
          ElMessage.error('修改失败')
        }
      } else {
        // 没有id是新增
        let res = await userAdd(infoForm.value)
        if (res.code === 200) {
          ElMessage.success('新增成功')
          emit('callback', { page: 1 })
          drawer.value = false
        } else {
          ElMessage.error('新增失败')
        }
      }
    } else {
      console.log('error submit!')
    }
  })
}
defineExpose({
  open,
})
</script>

<style scoped lang="scss">
::v-deep .el-drawer__header {
  border-bottom: 1px solid #d7cfcf;
  padding: 30px 10px;
  color: #000000;
  font-size: 20px;
  font-weight: bold;
}
::v-deep .el-drawer__footer {
  border-top: 1px solid #d7cfcf;
  padding: 30px 10px;
  color: #000000;
}
</style>
