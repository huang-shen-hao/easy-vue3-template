<template>
  <div class="container">
    <el-row>
      <el-card>
        <el-table
          :data="permissionData"
          style="width: 100%"
          row-key="id"
          border
          default-expand-all
        >
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="code" label="权限值" />
          <el-table-column prop="createTime" label="修改时间" />
          <el-table-column label="操作">
            <template v-slot:default="{ row }">
              <el-button
                size="small"
                type="primary"
                :icon="Plus"
                @click="onBtnAdd(row)"
                v-if="row.level !== 4"
              >
                {{ row.level === 3 ? '添加功能' : '添加菜单' }}
              </el-button>
              <el-button
                size="small"
                type="success"
                :icon="Edit"
                @click="onBtnEdit(row)"
                v-if="row.level === 1 ? false : true"
              >
                编辑
              </el-button>
              <el-button
                size="small"
                type="warning"
                :icon="Delete"
                @click="onBtnDelete(row.id)"
                v-if="row.level === 1 ? false : true"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-row>
    <el-row>
      <div class="img_container"></div>
    </el-row>

    <el-dialog v-model="addDialog">
      <template #header>{{ level !== 3 ? '添加菜单' : '添加功能' }}</template>
      <el-form ref="editFormRef" :rules="rules" :model="editForm">
        <el-form-item
          :label="level !== 3 ? '菜单名称' : '功能名称'"
          label-width="100px"
          prop="menuName"
        >
          <el-input v-model="editForm.menuName" clearable></el-input>
        </el-form-item>
        <el-form-item label="权限值" label-width="100px" prop="code">
          <el-input v-model="editForm.code" clearable></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="onBtnSave">确定</el-button>
        <el-button @click="addDialog = false">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  getPermissionData,
  menuAdd,
  menuDelete,
  menuUpdate,
} from '@/api/permission'
import { permissionTree } from '@/api/permission/interface.ts'
import { Delete, Edit, Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'

let permissionData = ref<permissionTree[]>([])

const getList = async () => {
  let res = await getPermissionData()
  if (res.code === 200) {
    permissionData.value = res.data
  }
}

let addDialog = ref<boolean>(false)

type EditFormType = {
  menuName: string
  code: string
}

let editForm = ref<EditFormType>({
  menuName: '',
  code: '',
})

let editFormRef = ref<FormInstance>()
let rules = ref<FormRules>({
  menuName: [{ required: true, message: '菜单名称不能为空', trigger: 'blur' }],
  code: [{ required: true, message: '权限值不能为空', trigger: 'blur' }],
})
// 用于判断几级菜单
let level = ref<number>(0)
// 收集pid 菜单的ID
let pid = ref<number>(0)
// 收集id
let id = ref<number>(0)
const onBtnAdd = (data: any) => {
  level.value = data.level
  pid.value = data.id || 0
  id.value = 0
  editForm.value.code = ''
  editForm.value.menuName = ''
  addDialog.value = true
  editFormRef.value && editFormRef.value?.clearValidate() //清除之前的校验
}

const onBtnSave = () => {
  if (!editFormRef.value) return
  let param = {
    code: editForm.value.code,
    level: level.value,
    name: editForm.value.menuName,
    pid: pid.value,
  }
  editFormRef.value?.validate(async (val) => {
    if (val) {
      console.log('al', param)
      if (id.value === 0) {
        let res = await menuAdd(param)
        if (res.code == 200) {
          ElMessage.success('添加成功')
          addDialog.value = false
          await getList()
        } else {
          ElMessage.error('添加失败')
          addDialog.value = false
        }
      } else {
        let param = {
          code: editForm.value.code,
          level: level.value,
          name: editForm.value.menuName,
          pid: pid.value,
          id: id.value,
        }
        let res = await menuUpdate(param)
        if (res.code == 200) {
          ElMessage.success('修改成功')
          addDialog.value = false
          await getList()
        } else {
          ElMessage.error('修改失败')
          addDialog.value = false
        }
      }
    } else {
      return
    }
  })
}
const onBtnEdit = (data: any) => {
  level.value = data.level
  pid.value = data.pid || 0
  id.value = data.id || 0
  editForm.value.code = data.code
  editForm.value.menuName = data.name
  addDialog.value = true
  editFormRef.value && editFormRef.value?.clearValidate() //清除之前的校验
}
const onBtnDelete = async (id: number) => {
  ElMessageBox.confirm(`确定删除?`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      let res = await menuDelete(id)
      if (res.code === 200) {
        ElMessage.success('删除成功')
        await getList()
      } else {
        ElMessage.error('删除失败')
      }
    })
    .catch(() => {
      console.log('取消删除')
    })
}

onMounted(() => {
  getList()
})
</script>

<style scoped lang="scss">
.container {
  .el-card {
    width: 100%;
    margin: 10px;
  }
  .img_container {
    background-image: url('@/assets/menu.webp');
    background-repeat: no-repeat;
    height: 500px;
    width: 100%;
    background-size: contain;
    background-position: center;
  }
}
</style>
