<template>
  <div class="container">
    <el-row class="row_top">
      <el-card>
        <el-form ref="searchFormRef" :model="searchForm" inline>
          <el-form-item prop="name" label="用户名：">
            <el-input
              v-model="searchForm.name"
              placeholder="请输入用户名字"
            ></el-input>
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
          <el-button
            type="primary"
            v-if="hasBtnPermission('btn.User.add')"
            @click="onBtnAdd(-1)"
          >
            添加
          </el-button>
          <el-button type="success" @click="onBatchDelete">批量删除</el-button>
        </el-row>
        <el-row>
          <el-table
            :data="dataList"
            border
            style="width: 100%"
            @selection-change="onSelect"
          >
            <el-table-column
              fixed="left"
              align="center"
              type="selection"
            ></el-table-column>
            <el-table-column align="center" type="index"></el-table-column>
            <el-table-column
              align="center"
              prop="id"
              label="id"
              min-width="80"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              prop="username"
              label="用户名字"
              min-width="100"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              prop="name"
              label="用户名称"
              min-width="100"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              prop="roleName"
              label="角色名称"
              width="120"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              prop="createTime"
              label="创建时间"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              prop="updateTime"
              label="修改时间"
              show-overflow-tooltip
            />
            <el-table-column
              fixed="right"
              align="center"
              label="操作"
              min-width="150"
            >
              <template v-slot:default="{ row }">
                <el-button
                  type="primary"
                  size="small"
                  :icon="User"
                  @click="roleAssignment(row.id, row.username)"
                >
                  分配角色
                </el-button>
                <el-button
                  size="small"
                  @click="onBtnAdd(row.id)"
                  type="success"
                  :icon="Edit"
                >
                  编辑
                </el-button>
                <el-button
                  size="small"
                  @click="onBtnDelete(row.id, row.username)"
                  type="danger"
                  :icon="Delete"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row>
          <div>
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
          </div>
        </el-row>
      </el-card>
    </el-row>

    <!--添加 编辑 抽屉组件-->
    <addDrawer ref="addDrawerRef" @callback="refresh" />
    <!--角色分配抽屉-->
    <roleDrawer ref="roleDrawerRef" @callback="refresh" />
  </div>
</template>
<script lang="ts">
export default {
  name: 'USERMANAGEMENT',
}
</script>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getUserList, userDelete, userDeleteBatch } from '@/api/permission'
import { UserListResponse } from '@/api/permission/interface.ts'
import addDrawer from '@/views/permission/userManagement/addDrawer.vue'
import roleDrawer from '@/views/permission/userManagement/roleDrawer.vue'
import userStore from '@/store/modules/user.ts'
import { Delete, Edit, User } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus'
import { hasBtnPermission } from '@/utils'
let dataList = ref<UserListResponse[]>([])
const getList = async (page: number) => {
  searchForm.value.page = page
  let res = await getUserList(searchForm.value)
  if (res.code === 200 && Array.isArray(res.data.records)) {
    dataList.value = res.data.records
    total.value = res.data.total
    searchForm.value.limit = res.data.size
    searchForm.value.page = res.data.current
  }
  // console.log('popoipipo', dataList.value)
}

// 子组件回调
const refresh = (data: any) => {
  console.log('000', data.page)
  getList(data.page)
  // 用户修改自己  触发刷新
  if (data.tag) {
    window.location.reload()
  }
}
onMounted(() => {
  getList(1)
})

type FormType = {
  name: string
  page: number
  limit: number
  username: string
}
let useUserStore = userStore()
let searchForm = ref<FormType>({
  name: '',
  page: 1,
  limit: 5,
  username: useUserStore.userInfo.name || '',
})
let total = ref<number>(0)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  searchForm.value.limit = val
  getList(1)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  getList(val)
}

let addDrawerRef = ref()
const onBtnAdd = (id: number) => {
  let page = searchForm.value.page
  let title = id > 0 ? '用户管理-用户修改' : '用户管理-用户新增'
  addDrawerRef.value && addDrawerRef.value.open({ title, id, page })
}

const onBtnDelete = (id: number, username: string) => {
  ElMessageBox.confirm(`确定删除用户${username}?`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      let tag = useUserStore.userInfo.name == username
      if (tag) {
        // 把自己删了
        window.location.reload()
      } else {
        let res = await userDelete(id)
        if (res.code === 200) {
          await getList(1)
        }
      }
      ElMessage.success('删除成功')
    })
    .catch(() => {
      console.log('取消删除')
    })
}

let roleDrawerRef = ref()
let roleAssignment = (id: number, name: string) => {
  let page = searchForm.value.page
  console.log('ooooooo', page)
  roleDrawerRef.value && roleDrawerRef.value.open({ id, name, page })
}

let selectList = ref<number[]>([])
// 列表勾选框 删除事件
const onSelect = (selection: any) => {
  console.log('selection', selection)
  selectList.value = []
  if (Array.isArray(selection) && selection.length == 0) {
    selectList.value = []
  }
  if (Array.isArray(selection) && selection.length > 0) {
    selection.forEach((item) => {
      selectList.value.push(item.id)
    })
    console.log('list', selectList.value)
  }
}
const onBatchDelete = async () => {
  if (Array.isArray(selectList.value) && selectList.value.length == 0) {
    ElMessage.warning('请至少勾选一条数据')
    return
  }

  let res = await userDeleteBatch(selectList.value)
  console.log('res', res)
  if (res.code === 200) {
    let len = dataList.value.length
    if (selectList.value.length < len) {
      await getList(searchForm.value.page) //留在当前页
    } else {
      // 如果全部删除光 回到第一页
      await getList(1) //留在当前页
    }
  } else {
    ElMessage.warning('删除失败')
  }
}

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
}
</style>
