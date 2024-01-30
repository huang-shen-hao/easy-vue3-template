<template>
  <div class="container">
    <el-row class="row_top">
      <el-card>
        <el-form :model="searchForm" inline>
          <el-form-item label="用户名：">
            <el-input
              v-model="searchForm.name"
              placeholder="请输入用户名字"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">搜索</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
    <el-row class="row_bottom">
      <el-card>
        <el-row>
          <el-button type="primary" @click="onBtnAdd(-1)">添加</el-button>
          <el-button type="success">批量删除</el-button>
        </el-row>
        <el-row>
          <el-table :data="dataList" border style="width: 100%">
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
              min-width="100"
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
                <el-button type="primary" :icon="User">分配角色</el-button>
                <el-button
                  @click="onBtnAdd(row.id)"
                  type="success"
                  :icon="Edit"
                >
                  编辑
                </el-button>
                <el-button
                  @click="onBtnDelete(row.id)"
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
              :page-sizes="[5, 10, 20, 50]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-row>
      </el-card>
    </el-row>

    <!--添加 编辑 抽屉组件-->
    <addDrawer ref="addDrawerRef" @callback="refresh"></addDrawer>
  </div>
</template>
<script lang="ts">
export default {
  name: 'USERMANAGEMENT',
}
</script>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getUserList, userDelete } from '@/api/permission'
import { UserListResponse } from '@/api/permission/interface.ts'
import addDrawer from '@/views/permission/userManagement/addDrawer.vue'
import userStore from '@/store/modules/user.ts'
import { Delete, Edit, User } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
let dataList = ref<UserListResponse[]>([])
const getList = async (page: number) => {
  searchForm.value.page = page
  let res = await getUserList(searchForm.value)
  if (
    res.code === 200 &&
    Array.isArray(res.data.records) &&
    res.data.records.length > 0
  ) {
    dataList.value = res.data.records
    total.value = res.data.total
    searchForm.value.limit = res.data.size
    searchForm.value.page = res.data.current
  }
  // console.log('popoipipo', dataList.value)
}

// 子组件回调
const refresh = (val: number) => {
  getList(val)
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
  limit: 10,
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
  let title = id > 0 ? '用户管理-用户修改' : '用户管理-用户新增'
  addDrawerRef.value && addDrawerRef.value.open({ title, id })
}

const onBtnDelete = (id: number) => {
  ElMessageBox.confirm('提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      let res = await userDelete(id)
      if (res.code === 200) {
        await getList(1)
      }
      ElMessage.success('删除成功')
    })
    .catch(() => {
      console.log('取消删除')
    })
}
</script>

<style scoped lang="scss">
.container {
  .el-card {
    width: 100%;
    margin: 10px;
  }
  .row_top {
  }
  .row_bottom {
    .el-row {
      margin: 10px 0;
    }
  }
}
</style>
