<template>
  <div>
    <el-drawer v-model="drawer">
      <template #header>用户管理-分配角色</template>
      <el-form :model="editForm">
        <el-form-item label="用户名称">
          <el-input v-model="name" disabled></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checkAll" @change="handleCheckAllChange">
            全选
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox-group
            v-model="checkedRoles"
            @change="handleCheckedRolesChange"
          >
            <el-checkbox
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
            >
              {{ item.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="onBtnClick">保存</el-button>
        <el-button @click="drawer = false">关闭</el-button>
      </template>
    </el-drawer>
  </div>
</template>
<script lang="ts">
export default { name: 'ROLEDRAWER' }
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { userRole, userRoleUpdate } from '@/api/permission'
import {
  userRoleType,
  userRoleUpdateRequest,
} from '@/api/permission/interface.ts'
import { ElMessage } from 'element-plus'

let drawer = ref<boolean>(false)
let checkAll = ref<boolean>(false)

let rolesList = ref<userRoleType[]>([])
let checkedRoles = ref<string[]>([])
const handleCheckAllChange = (val: boolean) => {
  let arr = rolesList.value.map((item) => {
    return item.roleName
  })
  checkedRoles.value = val ? arr : []
}
const handleCheckedRolesChange = (value: string[]) => {
  console.log('check', value)
  const checkedCount = value.length
  checkAll.value = rolesList.value.length === checkedCount
}

let editForm = ref<userRoleUpdateRequest>({
  userId: 0,
  roleIdList: [] as number[],
})
let page = ref<number>(0)
let name = ref<string>('')
const open = async (data: any) => {
  drawer.value = true
  page.value = data.page
  editForm.value.userId = data.id
  editForm.value.roleIdList = []
  checkedRoles.value = []
  checkAll.value = false
  name.value = data.name
  let res = await userRole(data.id)
  if (
    res.code === 200 &&
    Array.isArray(res.data.allRolesList) &&
    Array.isArray(res.data.assignRoles)
  ) {
    // // 添加checked属性
    // let allRoles = res.data.allRolesList
    // let assignRoles = res.data.assignRoles
    // // 处理数据 带有checked属性的List
    // rolesList.value = allRoles.map((role) => {
    //   let isAssigned = assignRoles.find(
    //     (item) => item.roleName === role.roleName
    //   )
    //   role.checked = !!isAssigned
    //   return role
    // })
    rolesList.value = res.data.allRolesList
    // 对于全选相关数据的初始化
    res.data.assignRoles.forEach((item) => {
      checkedRoles.value.push(item.roleName)
    })
    if (checkedRoles.value.length === rolesList.value.length) {
      checkAll.value = true
    }
  }
}
const emit = defineEmits(['callback'])
const onBtnClick = async () => {
  editForm.value.roleIdList = []
  rolesList.value.forEach((item) => {
    if (checkedRoles.value.includes(item.roleName)) {
      editForm.value.roleIdList.push(item.id)
    }
  })

  let res = await userRoleUpdate(editForm.value)
  if (res.code === 200) {
    emit('callback', { page: page.value })
    drawer.value = false
    ElMessage.success('保存成功')
  } else {
    ElMessage.success('保存失败')
  }
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
