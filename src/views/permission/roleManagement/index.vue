<template>
  <div class="container">
    <el-row class="row_top">
      <el-card>
        <el-form ref="searchFormRef" inline :model="searchForm">
          <el-form-item prop="roleName" label="角色名称">
            <el-input v-model="searchForm.roleName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onBtnSearch">搜索</el-button>
            <el-button @click="onBtnReset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
    <el-row class="row_bottom">
      <el-card>
        <el-row>
          <el-button type="primary" :icon="Plus" @click="onBtnAdd">
            添加角色
          </el-button>
        </el-row>
        <el-row>
          <el-table :data="roleList" border style="width: 100%">
            <el-table-column type="index" />
            <el-table-column
              align="center"
              label="id"
              prop="id"
              min-width="60px"
            />
            <el-table-column
              align="center"
              label="角色名称"
              prop="roleName"
              min-width="90px"
            />
            <el-table-column
              align="center"
              label="创建时间"
              prop="createTime"
              min-width="130px"
            />
            <el-table-column
              align="center"
              label="更新时间"
              prop="updateTime"
              min-width="130px"
            />
            <el-table-column align="center" label="操作" min-width="200px">
              <template v-slot:default="{ row }">
                <el-button
                  type="primary"
                  size="small"
                  :icon="User"
                  @click="onBtnPermission(row.id)"
                >
                  分配权限
                </el-button>
                <el-button
                  size="small"
                  type="success"
                  :icon="Edit"
                  @click="onBtnEdit(row.id)"
                >
                  编辑
                </el-button>
                <el-button
                  size="small"
                  type="danger"
                  :icon="Delete"
                  @click="onBtnDelete(row.id, row.roleName)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row>
          <el-pagination
            v-model:current-page="searchForm.page"
            v-model:page-size="searchForm.limit"
            :page-sizes="[3, 5, 7, 10]"
            layout="prev, pager, next, jumper, sizes,total"
            :total="total"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </el-card>
    </el-row>

    <el-drawer v-model="permissionDrawer">
      <template #header>角色管理-分配权限</template>
      <el-tree
        :data="permissionData"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defaultCheckedKeys"
        :props="defaultProps"
        ref="permissionTreeRef"
      />
      <template #footer>
        <el-button type="primary" @click="onBtnPermissionSave">保存</el-button>
        <el-button @click="permissionDrawer = false">关闭</el-button>
      </template>
    </el-drawer>

    <el-dialog v-model="addDialog">
      <template #header>添加角色</template>
      <el-row>
        <el-form
          ref="addFormRef"
          :rules="rules"
          :model="addForm"
          style="width: 100%"
        >
          <el-form-item prop="roleName" label="角色名称">
            <el-input v-model="addForm.roleName" clearable></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <template #footer>
        <el-button type="primary" @click="onBtnSave">保存</el-button>
        <el-button @click="addDialog = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ROLEMANAGEMENT',
}
</script>

<script setup lang="ts">
import { Delete, Edit, Plus, User } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import {
  getPermissionDataById,
  getRoleInfo,
  getRoleList,
  roleAdd,
  roleDelete,
  roleUpdate,
  setPermissionById,
} from '@/api/permission'
import {
  getRoleListRequest,
  permissionTree,
  roleListType,
} from '@/api/permission/interface.ts'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'

let roleList = ref<roleListType[]>([])

let total = ref<number>(0)
let searchForm = ref<getRoleListRequest>({
  page: 1,
  limit: 5,
  roleName: '',
})

type addFormType = {
  roleName: string
}

const getList = async (page: number) => {
  searchForm.value.page = page
  let res = await getRoleList(searchForm.value)
  if (res.code === 200 && Array.isArray(res.data.records)) {
    roleList.value = res.data.records
    total.value = res.data.total
  } else {
    ElMessage.error('获取失败')
  }
  console.log('list', res)
}
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  searchForm.value.limit = val
  getList(1)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  getList(val)
}

onMounted(() => {
  getList(1)
})

let searchFormRef = ref<FormInstance>()

const onBtnSearch = () => {
  console.log(searchForm.value)
  getList(1)
}

const onBtnReset = () => {
  if (!searchFormRef.value) return
  searchFormRef.value?.resetFields()
  getList(1)
}

let permissionDrawer = ref<boolean>(false)

let addDialog = ref<boolean>(false)
let addFormRef = ref<FormInstance>()
let addForm = ref<addFormType>({
  roleName: '',
})
let id = ref<number>(-1) //区分添加还是编辑
let rules = ref<FormRules>({
  roleName: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
})
const onBtnAdd = () => {
  id.value = -1
  addForm.value.roleName = '' //每次打开清空
  addDialog.value = true
  addFormRef.value?.clearValidate() //打开时候不需要校验
}

const onBtnEdit = async (userId: number) => {
  id.value = userId
  addDialog.value = true
  let res = await getRoleInfo(id.value)
  if (res.code === 200) {
    addForm.value.roleName = res.data.roleName
  }
  addFormRef.value?.clearValidate() //打开时候不需要校验
}

const onBtnSave = () => {
  if (!addFormRef.value) return
  addFormRef.value?.validate(async (val) => {
    if (val) {
      if (id.value > 0) {
        // 编辑
        let param = {
          id: id.value,
          roleName: addForm.value.roleName,
        }
        let res = await roleUpdate(param)
        if (res.code === 200) {
          addDialog.value = false
          ElMessage.success('角色修改成功')
          await getList(searchForm.value.page) //留在当前页
        } else {
          ElMessage.success('角色修改失败')
        }
      } else {
        // 新增
        let res = await roleAdd(addForm.value)
        if (res.code === 200) {
          addDialog.value = false
          ElMessage.success('角色添加成功')
          await getList(1)
        } else {
          ElMessage.success('角色添加失败')
        }
      }
    } else {
      return
    }
  })
}

const onBtnDelete = async (id: number, name: string) => {
  ElMessageBox.confirm(`确定删除角色${name}?`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      let res = await roleDelete(id)
      if (res.code === 200) {
        ElMessage.success('删除成功')
        await getList(
          roleList.value.length > 1
            ? searchForm.value.page
            : searchForm.value.page === 1
              ? 1
              : searchForm.value.page - 1
        )
        // 需要优化 当前页全部删除情况 2024-1-31
      }
    })
    .catch(() => {
      console.log('取消删除')
    })
}

const defaultProps = {
  children: 'children',
  label: 'name',
}
let roleId = ref<number>(0) //当前行角色的roleId
let permissionData = ref<permissionTree[]>([])
let defaultCheckedKeys = ref<number[]>([])

// 最内层级别 勾选数据
// let deepSelectPermission = ref<number>([])
// 递归获取勾选的权限
const getSelectPermission = (data: any[], init: any[]) => {
  data.forEach((item) => {
    if (item.select && item.level === 4) init.push(item.id)
    if (Array.isArray(item.children) && item.children.length > 0) {
      getSelectPermission(item.children, init)
    }
  })
  return init
}

const getPermissionById = async () => {
  let res = await getPermissionDataById(roleId.value)
  if (res.code === 200) {
    permissionData.value = res.data
    defaultCheckedKeys.value = getSelectPermission(res.data, [])
  } else {
    ElMessage.warning('获取权限列表数据失败')
  }
}
// 打开分配权限 抽屉组建
const onBtnPermission = async (id: number) => {
  permissionDrawer.value = true
  defaultCheckedKeys.value = []
  roleId.value = id
  await getPermissionById()
}

let permissionTreeRef = ref()

const onBtnPermissionSave = async () => {
  // 获取勾选的
  let arr1 = permissionTreeRef.value && permissionTreeRef.value.getCheckedKeys()
  // 获取半勾选的
  let arr2 =
    permissionTreeRef.value && permissionTreeRef.value.getHalfCheckedKeys()
  console.log(arr1, arr2, arr1.concat(arr2))
  let param = {
    roleId: roleId.value,
    permissionId: arr1.concat(arr2),
  }
  let res = await setPermissionById(param)
  if (res.code === 200) {
    ElMessage.success('保存成功')
    window.location.reload() //改了自己权限
  } else {
    ElMessage.error('保存失败')
  }
}
</script>

<style scoped lang="scss">
.container {
  .el-card {
    width: 100%;
    margin: 10px;
  }

  .row_bottom {
    .el-row {
      margin: 10px 0;
    }
  }

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
}
</style>
