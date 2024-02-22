<template>
  <div class="container">
    <el-row>
      <el-col :span="12">
        <el-card>
          <div class="top_left_header">
            <div class="top_left_header_title">本周数据</div>
            <div>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  按周
                  <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>按周</el-dropdown-item>
                    <el-dropdown-item>按月</el-dropdown-item>
                    <el-dropdown-item>按年</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
          <div class="top_left_data">
            <div
              style="
                font-weight: bolder;
                color: #dbd3d3;
                font-size: 16px;
                padding: 2px;
                margin-top: 8px;
              "
            >
              本周考勤
            </div>
            <div style="margin-top: 8px">
              <span
                style="
                  color: #333333;
                  font-size: 18px;
                  font-weight: bolder;
                  padding: 2px;
                "
              >
                1,314,520
              </span>
              <span
                style="
                  color: #333333;
                  font-size: 12px;
                  font-weight: bolder;
                  padding: 2px;
                "
              >
                次
              </span>
              <span style="color: #999999; font-size: 10px; padding: 2px">
                比较上周
              </span>
              <span style="color: red; font-size: 10px; padding: 2px">+5</span>
            </div>
          </div>
          <div class="top_left_pie">
            <div class="top_left_pie_Ec" ref="pieRef"></div>
            <div class="top_left_pie_right">
              <div
                class="top_left_pie_item"
                v-for="item in itemList"
                :key="item.name"
              >
                <div class="top_left_pie_item_top">
                  <div
                    class="circle"
                    :style="{ backgroundColor: item.color }"
                  ></div>
                  <div class="type">{{ item.name }}</div>
                </div>
                <div class="top_left_pie_item_bottom">
                  <span class="number">{{ item.value }}</span>
                  <span class="change" :style="{ color: item.color }">
                    {{ item.change }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="top_left_header_event">
            <div
              class="top_left_header_event_item"
              v-for="item in eventItemList"
              :key="item.name"
              :style="{ backgroundColor: item.color }"
            >
              <div
                style="
                  color: #333333;
                  font-size: 16px;
                  margin-top: 5px;
                  font-weight: bold;
                "
              >
                {{ item.name }}
              </div>
              <div style="margin: 5px 0">
                <span style="font-size: 24px">{{ item.number }}</span>
                <span style="font-size: 14px">次</span>
              </div>
              <div style="display: flex">
                <div>
                  <span style="font-size: 12px">{{ item.count1Name }}</span>
                  <span style="font-size: 12px; padding-left: 5px">
                    {{ item.count1 }}
                  </span>
                </div>
                <div style="margin-left: 10px">
                  <span style="font-size: 12px">{{ item.count2Name }}</span>
                  <span style="font-size: 12px; padding-left: 5px">
                    {{ item.count2 }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div class="center_top">
            <div class="center_title">今日待办</div>
            <div class="center_opt">
              <div>全部代办</div>
              <div>
                <el-icon><ArrowRight /></el-icon>
              </div>
            </div>
          </div>
          <div>
            <el-calendar :range="currentWeek">
              <template #date-cell="{ data }">
                <p :class="data.isSelected ? 'is-selected' : ''">
                  {{ data.day.split('-').slice(2).join() }}
                </p>
              </template>
            </el-calendar>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div class="center_top">
            <div class="center_title">常用应用</div>
            <div class="center_opt">
              <div>查看更多</div>
              <div>
                <el-icon><ArrowRight /></el-icon>
              </div>
            </div>
          </div>
          <div class="icon_container">
            <div class="icon_item" v-for="item in svgList" :key="item.name">
              <div class="icon_item_top">
                <SvgIcon :name="item.name" height="30" width="30" />
              </div>
              <div class="icon_item_title">{{ item.title }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-card>
          <div class="center_top">
            <div class="center_title">用工评分</div>
            <div class="center_opt">
              <div>查看全部</div>
              <div>
                <el-icon><ArrowRight /></el-icon>
              </div>
            </div>
          </div>
          <div class="bottom_left">
            <div class="bottom_left_water" ref="waterRef"></div>
            <div>
              <div
                class="bottom_left_event"
                v-for="item in infoList"
                :key="item.name"
              >
                <div class="circle" style="margin-right: 10px"></div>
                <div>
                  <span style="font-size: 14px">{{ item.name }}</span>
                  <span
                    style="padding-left: 10px; color: orange; font-size: 14px"
                  >
                    {{ item.count }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div class="center_top">
            <div class="center_title">最新公告</div>
            <div class="center_opt">
              <div>查看全部</div>
              <div>
                <el-icon><ArrowRight /></el-icon>
              </div>
            </div>
          </div>
          <div class="bottom_right">
            <div
              class="bottom_right_news"
              v-for="item in newsList"
              :key="item.context"
            >
              <div>
                <span>{{ item.context }}</span>
                <span v-if="item.read" style="padding-left: 10px">
                  <el-tag type="success" size="small">已读</el-tag>
                </span>
                <span
                  v-else
                  style="padding-left: 12px; font-size: 10px; color: red"
                >
                  新
                </span>
              </div>
              <div>{{ item.date }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

const pieRef = ref()
onMounted(() => {
  const pieEc = echarts.init(pieRef.value)
  pieEc.setOption({
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        name: '考勤数据分析',
        type: 'pie',
        radius: ['55%', '85%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        tooltip: {
          confine: true, //是否将 tooltip 框限制在图表的区域内。
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 8,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: '正常' },
          { value: 735, name: '迟到' },
          { value: 580, name: '早退' },
          { value: 484, name: '请假' },
          { value: 300, name: '缺卡' },
          { value: 500, name: '旷工' },
          { value: 600, name: '异地打卡' },
          { value: 700, name: '异常' },
        ],
      },
    ],
  })
})

const itemList = [
  { value: 1048, name: '正常', color: 'green', change: '-8' },
  { value: 735, name: '迟到', color: 'blue', change: '+2' },
  { value: 580, name: '早退', color: 'pink', change: '+2' },
  { value: 484, name: '请假', color: 'orange', change: '-5' },
  { value: 300, name: '缺卡', color: 'black', change: '-2' },
  { value: 500, name: '旷工', color: 'red', change: '-7' },
  { value: 600, name: '异地打卡', color: 'yellowGreen', change: '+3' },
  { value: 700, name: '异常', color: 'purple', change: '+1' },
]
const eventItemList = [
  {
    name: '本周审批',
    number: '23',
    count1Name: '已通过',
    count2Name: '驳回',
    count1: '2',
    count2: '2',
    color: 'rgba(1,112,252,10%)',
  },
  {
    name: '本周反馈',
    number: '14',
    count1Name: '已通过',
    count2Name: '驳回',
    count1: '4',
    count2: '8',
    color: 'rgba(244,147,32,10%)',
  },
  {
    name: '本周人事',
    number: '17',
    count1Name: '入职',
    count2Name: '转正',
    count1: '+2',
    count2: '+7',
    color: 'rgba(194,64,255,10%)',
  },
]
const svgList = [
  {
    name: 'shenpi',
    title: '审批',
  },
  {
    name: 'youjian',
    title: '邮件',
  },
  {
    name: 'wenjuan',
    title: '问卷',
  },
  {
    name: 'jixiao',
    title: '绩效',
  },
  {
    name: 'renshi',
    title: '人事',
  },
  {
    name: 'tianjia',
    title: '添加',
  },
]
const infoList = [
  {
    name: '续合同到期日缺失员工',
    count: '13名',
  },
  {
    name: '紧急联系人电话缺失员工',
    count: '23名',
  },
  {
    name: '最近7天旷工1天员工',
    count: '2名',
  },
  {
    name: '最近7天旷工1天员工',
    count: '2名',
  },
]
const newsList = [
  {
    context: '关于开展对知识库以及文档的整理须知',
    date: '6-10',
    read: true,
  },
  {
    context: '优化外勤管理和外勤人员的福利方案',
    date: '6-12',
    read: false,
  },
  {
    context: '今日公告，大家都不准笑乖乖听话',
    date: '6-13',
    read: true,
  },
  {
    context: '今日公告，大家都不准笑乖乖听话',
    date: '6-15',
    read: true,
  },
  {
    context: '今日公告，新人入职培训',
    date: '6-16',
    read: false,
  },
]

// ===========================日期实现====================
const currentWeek = ref<string[]>([])
const startOfWeek = dayjs()
currentWeek.value = [startOfWeek, startOfWeek]
// =======================日期实现_End====================

const waterRef = ref()
onMounted(() => {
  const waterEc = echarts.init(waterRef.value)
  waterEc.setOption({
    series: [
      {
        type: 'liquidFill',
        radius: '80%', //大小
        data: [0.4],
        itemStyle: {
          normal: {
            shadowBlur: 0, // 取消阴影模糊度
            shadowColor: null, // 取消阴影颜色
            shadowOffsetX: 0, // 取消阴影水平位移
            color: 'orange', // 自定义水球图颜色
          },
        },
        waveAnimation: true,
        animationDuration: 0,
        animationDurationUpdate: 0,
        backgroundStyle: {
          color: 'white',
          // borderColor: '#06f12e',
          // borderWidth: 2,
          // shadowColor: 'rgba(0, 0, 0, 0.4)',
          // shadowBlur: 20,
        },
        outline: {
          show: true, //外圈的线
          borderDistance: 0,
          itemStyle: {
            borderWidth: 2,
            borderColor: '#4abe50',
            // shadowBlur: 20,
            // shadowColor: 'rgba(255, 0, 0, 1)',
          },
        },
        label: {
          position: ['50%', '40%'],
          formatter: function () {
            return '40分'
          },
          fontSize: 32,
          color: '#000000',
        },
      },
    ],
    grid: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  })
})
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: calc(100vh - 130px);
  background-color: #eaeef1;
  .el-card {
    margin: 5px;
  }
  .top_left_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .top_left_header_title {
      font-size: 18px;
      font-weight: bolder;
      color: #333333;
      padding: 2px;
    }
  }
  .top_left_pie {
    display: flex;
    margin-top: 10px;
    .top_left_pie_Ec {
      width: 110px;
      height: 110px;
    }
    .top_left_pie_right {
      width: calc(100% - 110px);
      height: 110px;
      display: flex;
      align-items: center;
      justify-items: center;
      flex-wrap: wrap;
      .top_left_pie_item {
        width: 25%;
        .top_left_pie_item_top {
          display: flex;
          justify-content: start;
          align-items: center;
          .circle {
            width: 10px;
            height: 10px;
            border-radius: 50%;
          }
          .type {
            color: #666666;
            font-size: 14px;
            margin-left: 5px;
          }
        }
        .top_left_pie_item_bottom {
          display: flex;
          justify-items: start;
          margin-left: 15px;
          margin-top: 5px;
          .number {
            font-size: 18px;
            font-weight: bold;
            color: #000000;
          }
          .change {
            font-size: 12px;
            font-weight: bold;
            padding-top: 5px;
            padding-left: 5px;
          }
        }
      }
    }
  }
  .top_left_header_event {
    display: flex;
    justify-content: space-between;
    .top_left_header_event_item {
      width: 32%;
      height: 88px;
      border-radius: 4px;
      padding: 5px 10px;
      display: flex;
      flex-direction: column;
    }
  }
  .center_top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .center_title {
      font-size: 18px;
      font-weight: bolder;
      color: #333333;
      padding: 2px;
    }
    .center_opt {
      display: flex;
      font-size: 14px;
      color: #999999;
    }
  }
  .icon_container {
    height: 60px;
    display: flex;
    margin-top: 18px;
    align-items: center;
    justify-content: space-between;
    padding: 30px 40px;
    .icon_item {
      display: flex;
      align-items: center;
      flex-direction: column;
      .icon_item_top {
        width: 48px;
        height: 48px;
        padding: 4px;
        background-color: rgba(1, 112, 252, 8%);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .icon_item_title {
        margin-top: 4px;
        font-size: 16px;
        color: #999999;
        font-weight: bolder;
      }
    }
  }
  .bottom_left {
    height: 180px;
    display: flex;
    .bottom_left_water {
      width: 180px;
      height: 180px;
    }
    .bottom_left_event {
      display: flex;
      align-items: center;
      margin: 25px 0;
      .circle {
        background-color: orange;
        height: 6px;
        width: 6px;
        border-radius: 50%;
      }
    }
  }
  .bottom_right {
    height: 180px;
    .bottom_right_news {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      padding: 10px 5px;
    }
  }

  //表格的样式修改
  ::v-deep .el-calendar__body {
    padding: 0; //不需要
  }
  ::v-deep .el-calendar-table tr td {
    border: 0; //单元格去掉边界框
  }

  //日期元素样式
  ::v-deep .el-calendar-day {
    width: 50px; //变窄
    height: 28px; //变高
    padding: 0;
    p {
      text-align: center; //日期居中
      width: 100%; //撑满父元素
      height: 100%; //撑满父元素
      border-bottom-left-radius: 12px; // 左上角
      border-bottom-right-radius: 12px; // 右上角
    }
  }
  ::v-deep .current {
  }
  //.el-calendar-table td.is-selected {
  //  color: white;
  //  width: 50px;
  //  background-color: #0170fc;
  //  border-bottom-left-radius: 12px; // 左下角
  //  border-bottom-right-radius: 12px; // 右下角
  //}
  //::v-deep .el-calendar-day:hover {
  //  color: white;
  //  background-color: #0170fc;
  //  border-bottom-left-radius: 12px; // 左下角
  //  border-bottom-right-radius: 12px; // 右下角
  //}

  //th背景改变实现
  //::v-deep .el-calendar-table thead :nth-child(3) {
  //  width: 50px;
  //  color: white;
  //  background-color: #0170fc;
  //  border-top-left-radius: 12px; // 左上角
  //  border-top-right-radius: 12px; // 右上角
  //}

  //::v-deep .el-calendar-table td.is-today {
  //  color: white;
  //  background-color: #0170fc;
  //  border-bottom-left-radius: 12px; // 左下角
  //  border-bottom-right-radius: 12px; // 右下角
  //}
}
</style>
