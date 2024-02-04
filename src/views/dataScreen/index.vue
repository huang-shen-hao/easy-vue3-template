<template>
  <div class="container">
    <div class="screen" ref="screenRef">
      <div class="screen_bar">
        <div class="screen_bar_left">
          <span class="left_btn" @click="onBtnBack">首页</span>
        </div>
        <div class="screen_bar_center">
          <span>人事资源可视化大数据平台</span>
        </div>
        <div class="screen_bar_right">
          <span class="right_btn">全屏</span>
        </div>
      </div>
      <div class="screen_main">
        <div class="screen_main_left">
          <div class="screen_main_left_top">
            <div class="screen_main_left_top_title">
              <div class="total">可预约总人数：99999</div>
              <div
                v-for="(item, index) in dataList"
                class="screen_main_left_top_title_item"
                :key="index"
              >
                {{ item }}
              </div>
              <div class="screen_main_left_top_title_item">人</div>
            </div>
            <div class="screen_main_left_top_ec" ref="waterRef">水球图</div>
          </div>
          <div class="screen_main_left_center">
            <!--男女比例-->
            <div class="screen_main_left_center_title">
              <div class="screen_main_left_center_title_man">
                <div class="sex"><span>男士</span></div>

                <img src="@/assets/images/man.png" />
              </div>
              <div class="screen_main_left_center_title_woman">
                <div class="sex"><span>女士</span></div>
                <img src="@/assets/images/woman.png" />
              </div>
            </div>
            <div class="screen_main_left_center_ec" ref="sexRef"></div>
          </div>
          <div class="screen_main_left_bottom">
            <div class="screen_main_left_bottom_ec" ref="ageRef"></div>
          </div>
        </div>
        <div class="screen_main_center">
          <div class="screen_main_center_top">
            <div class="screen_main_center_top_ec" ref="mapRef"></div>
          </div>
          <div class="screen_main_center_bottom">
            <div class="screen_main_center_bottom_ec" ref="lineRef"></div>
          </div>
        </div>
        <div class="screen_main_right">
          <div class="screen_main_right_top">
            <div class="screen_main_right_top_ec" ref="raderRef"></div>
          </div>
          <div class="screen_main_right_center">
            <div class="screen_main_right_center_ec" ref="noRef"></div>
          </div>
          <div class="screen_main_right_bottom"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'
import 'echarts-liquidfill'
import chinaJson from './china.json'
// 获取Dom
const screenRef = ref()
const waterRef = ref() //水球图
const sexRef = ref() //性别柱状图
const ageRef = ref() //年龄饼图
const mapRef = ref() //地图
const lineRef = ref() //游客折线图
const noRef = ref() //排名
const raderRef = ref() //雷达图
// 注册中国地图
echarts.registerMap('china', chinaJson as any)

// 水球图
onMounted(() => {
  let waterEc = echarts.init(waterRef.value)
  waterEc.setOption({
    // 标题组件
    title: {
      text: '水球图',
      textStyle: {
        color: 'white',
      },
    },
    series: [
      {
        type: 'liquidFill',
        radius: '90%', //大小
        data: [0.68, 0.55, 0.4, 0.25],
        color: ['red', '#0f0', 'rgb(0, 0, 255)', 'pink'],
        // label: {
        //   position: ['38%', '40%'],
        //   formatter: function () {
        //     return 'ECharts\nLiquid Fill'
        //   },
        //   fontSize: 20,
        //   color: '#D94854',
        // },
        waveAnimation: true,
        animationDuration: 0,
        animationDurationUpdate: 0,
        backgroundStyle: {
          borderColor: '#4c3cb2',
          borderWidth: 5,
          shadowColor: 'rgba(0, 0, 0, 0.4)',
          shadowBlur: 20,
        },
        outline: {
          show: true, //外圈的线
          borderDistance: 0,
          itemStyle: {
            borderWidth: 5,
            borderColor: '#156ACF',
            shadowBlur: 20,
            shadowColor: 'rgba(255, 0, 0, 1)',
          },
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
// 男女比例图
onMounted(() => {
  let sexEc = echarts.init(sexRef.value)
  sexEc.setOption({
    // 标题组件
    title: {
      text: '男女比例',
      textStyle: {
        color: 'white',
      },
    },
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false,
      type: 'category',
    },
    series: [
      {
        type: 'bar',
        data: [58],
        barWidth: '20',
        z: '100',
        itemStyle: {
          borderRadius: 20,
        },
      },
      {
        type: 'bar',
        data: [100],
        barWidth: '20',
        barGap: '-100%',
        itemStyle: {
          color: 'pink',
          borderRadius: 20,
        },
      },
    ],
    grid: {
      top: 20,
      bottom: 0,
      left: 20,
      right: 20,
    },
  })
})
// 年龄饼图
onMounted(() => {
  let ageEc = echarts.init(ageRef.value)
  ageEc.setOption({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '20%',
      right: 0,
      orient: 'vertical', //图例方向 水平|竖直
      textStyle: {
        color: 'white',
        fontSize: '16',
      },
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['55%', '85%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          position: 'inside',
          color: 'white',
        },
        // emphasis: {
        //   label: {
        //     show: true,
        //     fontSize: 10,
        //     fontWeight: 'bold',
        //   },
        // },
        labelLine: {
          show: false,
        },
        data: [
          { value: 300, name: '小孩' },
          { value: 1048, name: '儿童' },
          { value: 735, name: '青少年' },
          { value: 580, name: '中年' },
          { value: 484, name: '老人' },
        ],
      },
    ],
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  })
})
let dataList = ref<number[]>([6, 1, 4, 7, 3, 9])
//未来30天游客趋势折线图
onMounted(() => {
  let lineEc = echarts.init(lineRef.value)
  lineEc.setOption({
    // 标题组件
    title: {
      text: '未来一个月游客趋势折线图',
      textStyle: {
        color: 'white',
      },
    },
    zoom: false,
    xAxis: {
      type: 'category',
      boundaryGap: false, //两侧不留白
      splitLine: {
        show: false, //取消分割线
      },
      data: [
        3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.1, 3.11, 3.12, 3.13,
        3.14, 3.15, 3.16, 3.17, 3.18, 3.19, 3.2, 3.21, 3.22, 3.23, 3.24, 3.25,
        3.26, 3.27, 3.28, 3.29, 3.3, 3.31,
      ],
    },
    yAxis: {
      splitLine: {
        show: false, //取消分割线
      },
      axisLine: {
        show: true, //坐标轴线
      },
      axisTick: {
        show: true, //刻度
      },
    },
    series: [
      {
        type: 'line',
        data: [
          1100, 800, 500, 2000, 1300, 500, 600, 1100, 800, 500, 1800, 1100,
          1500, 2600, 900, 600, 500, 2000, 3300, 2500, 1600, 2100, 3800, 1500,
          2600, 1900, 500, 2600, 1400, 1800, 2500,
        ],
        smooth: true, //平滑曲线
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(30, 144, 255, 0.8)', // 开始颜色
            },
            {
              offset: 1,
              color: 'rgba(30, 144, 255, 0.3)', // 结束颜色
            },
          ]),
        },
        emphasis: {
          color: '#0063BF',
          lineStyle: {
            // 系列级个性化折线样式
            width: 5,
            type: 'dotted',
            color: '#4fd6d2', // 折线的颜色
          },
        },
      },
    ],
    grid: {
      top: 30,
      bottom: 30,
      left: 50,
      right: 30,
    },
  })
})
//========雷达图=========
onMounted(() => {
  let raderEc = echarts.init(raderRef.value)
  raderEc.setOption({
    //你的代码
    // backgroundColor: 'rgba(19, 21, 44, 1)',
    // tooltip: {
    //   trigger: 'item',
    //   formatter: function (data) {
    //     // console.log(data);
    //   },
    // },
    radar: [
      {
        indicator: [
          {
            text: '满意度',
            max: 10,
            val: '9.6',
            position: 'top',
          },
          { text: '便捷性', max: 10, val: '9.3', position: 'right' },
          {
            text: '园区整洁',
            max: 10,
            val: '8.8',
            position: 'right',
          },
          {
            text: '服务态度',
            max: 10,
            val: '8.5',
            position: 'left',
          },
          { text: '安全性', max: 10, val: '9.5', position: 'left' },
        ],
        // indicator: indicatorData,
        splitNumber: 5,
        center: ['50%', '60%'],
        // shape: 'circle',
        name: {
          formatter: function (name: any, indicator: any) {
            // return `{name|${name}}\n\n{val|${indicator.val}}`
            return `{name|${name}\n}`
          },
          rich: {
            name: {
              color: '#88ead3',
              fontSize: 22,
              fontWeight: 600,
            },
            // val: {
            //   color: '#FFFFFF',
            //   fontSize: 14,
            //   fontWeight: 600,
            // },
          },
          textStyle: {
            color: '#ffffff',
          },
        },
        splitArea: {
          areaStyle: {
            color: ['#1a1a5d', '#6868be'],
          },
        },
        axisLine: {
          lineStyle: {
            color: '#5A5A89',
          },
        },
        splitLine: {
          lineStyle: {
            color: '#5A5A89',
          },
        },
      },
    ],
    series: [
      {
        type: 'radar',
        lineStyle: {
          normal: {
            color: '#99EFFA',
            width: 2,
          },
        },
        label: {
          show: true,
        },
        itemStyle: {
          color: '#71cdd9', //顶点的颜色
        },
        data: [
          {
            value: [9.6, 9.5, 8.5, 8.8, 9.3],
            // value: valArr,
            // name: '图一',
            symbolSize: 6,
            symbol: 'circle',
            areaStyle: {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: 'transparent',
                  },
                  {
                    offset: 0.5,
                    color: 'transparent',
                  },
                  {
                    offset: 1,
                    color: 'rgba(59,101,251,.9)',
                  },
                ],
                globalCoord: false,
              },
              // opacity: 0 // 区域透明度
            },
            itemStyle: {
              normal: {
                color: '#000000', //拐点颜色
                borderColor: '#99EFFA', //拐点边框颜色
                borderWidth: 2, //拐点边框大小
              },
              emphasis: {
                color: '#000000', //hover拐点颜色定义
              },
            },
          },
        ],
      },
    ],
  })
})

//====================

//========地图=========
// 字符串统一变成数字
function preHandleData() {
  const facData = [
    {
      latitude: '39.949459',
      id: '2',
      longitude: '116.403694',
    },
    {
      latitude: '29.556681',
      id: '4',
      longitude: '106.553263',
    },
    {
      latitude: '23.185545',
      id: '5',
      longitude: '113.239359',
    },
    {
      latitude: '38.083783',
      id: '3',
      longitude: '114.508772',
    },
  ]
  const factorys = facData.map((item: any) => {
    return {
      name: item['name'],
      value: [item['longitude'] * 1, item['latitude'] * 1], //变成数字
    }
  })
  return factorys
}
const factorys = preHandleData()

function createOption(factorys) {
  // 云端
  const clouds = {
    name: '云端数据',
    value: [103.5, 48],
  }
  // 特殊展示点
  const hangzhou = {
    name: '杭州',
    value: [120.2, 30.24],
  }
  // 省会城市Coordinate 隐射表
  const provinceCoordinates = {
    安徽: [117.194778, 31.86577],
    北京: [116.403694, 39.949459],
    重庆: [106.553263, 29.556681],
    福建: [119.292069, 26.144144],
    甘肃: [103.856737, 36.094212],
    广东: [113.239359, 23.185545],
    广西: [108.345678, 22.861984],
    贵州: [106.616332, 26.707352],
    海南: [110.350983, 19.968035],
    河北: [114.508772, 38.083783],
    河南: [113.644099, 34.769161],
    黑龙江: [126.522207, 45.801617],
    湖北: [114.361594, 30.601078],
    湖南: [112.926605, 28.217167],
    吉林: [125.326383, 43.797768],
    江苏: [118.832137, 32.038322],
    江西: [115.851775, 28.672488],
    辽宁: [123.486653, 41.682522],
    内蒙古: [111.785972, 40.849642],
    宁夏: [106.257585, 38.482579],
    青海: [101.851432, 36.622494],
    山东: [117.194778, 36.652148],
    山西: [112.595453, 37.858034],
    陕西: [109.026378, 34.350591],
    上海: [121.518142, 31.211845],
    四川: [104.132697, 30.561282],
    天津: [117.286764, 39.001295],
    西藏自治区: [91.144205, 29.649484],
    新疆维吾尔自治区: [87.667116, 43.817754],
    云南: [102.881681, 24.866897],
    浙江: [120.211934, 30.274265],
    香港: [114.242011, 22.272474],
    澳门: [113.579709, 22.169692],
    台湾: [121.591732, 25.034634],
  }
  // 需要展示的省会城市
  const needShowProvincialCapitals = [
    '西藏自治区',
    '新疆维吾尔自治区',
    '四川',
    '贵州',
    '湖南',
    '福建',
    '广东',
    '甘肃',
    '河南',
    '江苏',
    '山东',
    '吉林',
    '上海',
    '浙江',
    '北京',
  ]

  // 需要展示的省会城市数据
  const getProvincialCapitals = (names: any) => {
    let res: any = []
    const len = names.length
    for (let i = 0; i < len; i++) {
      let geoCoord = provinceCoordinates[names[i]]
      if (geoCoord) {
        res.push({
          name: names[i],
          value: geoCoord,
        })
      }
    }
    return res
  }

  // 云端到工厂飞线
  const lines = factorys.map((item: any) => ({
    name: `${clouds.name}-${item.name}`,
    coords: [item.value, clouds.value],
  }))
  // 杭州州到云端
  const lines2 = [
    {
      name: clouds.name,
      coords: [clouds.value, hangzhou.value],
    },
  ]

  let option = {
    geo: [
      // 边框 map
      {
        zlevel: 6,
        map: 'china',
        // 取消一些交互
        select: {
          disabled: false,
        },
        emphasis: {
          disabled: true,
        },
        silent: true, //图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
        // 位置大小调整
        layoutCenter: ['50%', '68%'], //位置
        layoutSize: '125%', //大小 地图的大小，见 layoutCenter。支持相对于屏幕宽高的百分比或者绝对的像素大小。
        aspectScale: 0.84,

        // 框颜色
        itemStyle: {
          color: 'transparent',
          opacity: 1,
          borderWidth: 1,
          borderColor: 'rgba(146, 193, 240, 1)',
          borderCap: 'round', //线段末端以圆形结束
          shadowBlur: 20,
          shadowColor: 'rgba(146, 193, 240, 1)',
        },
      },
      // 顶层map
      {
        map: 'china',
        zlevel: 5,
        z: 4,

        // 取消一些交互
        select: {
          disabled: false,
        },
        emphasis: {
          disabled: true,
        },
        silent: true,

        // 位置大小调整
        layoutCenter: ['50%', '68%'], //位置
        layoutSize: '125%', //大小
        aspectScale: 0.84,
        // 调整颜色
        itemStyle: {
          // areaColor:'#264684',
          areaColor: {
            type: 'linear',
            x: 980,
            y: 400,
            x2: 150,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                // color: "rgba(56,96,155,1)", // 50% 处的颜色
                color: 'rgba(56,96,155,1)', // 50% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(2,20,42,1)', // 0% 处的颜色
              },
            ],
            global: true, // 缺省为 false
          },
          borderWidth: 1.2,
          borderCap: 'round',
          borderColor: 'RGBA(81, 123, 165, 1)',
          // shadowColor: "#fff",
          // shadowBlur: 20,
        },
      },
      // 第二层
      {
        // 下层地图，仿3d效果
        zlevel: 5,
        z: 3,
        map: 'china',
        // 取消一些交互
        select: {
          disabled: false,
        },
        emphasis: {
          disabled: true,
        },
        silent: true,

        // 位置大小调整
        layoutCenter: ['50%', '68.6%'], //位置
        layoutSize: '125%', //大小
        aspectScale: 0.84,

        // 颜色
        itemStyle: {
          borderWidth: 0,
          borderCap: 'round',
          areaColor: 'rgba(56,96,155,1)',
        },
      },
      // 第三层
      {
        // 下层地图，防3d效果
        zlevel: 5,
        z: 2,
        map: 'china',

        // 取消一些交互
        select: {
          disabled: false,
        },
        emphasis: {
          disabled: true,
        },
        silent: true,

        // 位置大小调整
        layoutCenter: ['50%', '69%'], //位置
        layoutSize: '125%', //大小
        aspectScale: 0.84,

        // 颜色
        itemStyle: {
          borderWidth: 0,
          borderCap: 'round',
          areaColor: 'rgba(56,96,155,1)',
        },
      },
      // 第四层
      {
        // 下层地图，防3d效果
        zlevel: 5,
        z: 1,
        map: 'china',
        // 取消一些交互
        select: {
          disabled: false,
        },
        emphasis: {
          disabled: true,
        },
        silent: true,

        // 位置大小调整
        layoutCenter: ['50%', '69.3%'], //位置
        layoutSize: '124.5%', //大小
        aspectScale: 0.84,

        // 颜色
        itemStyle: {
          borderColor: 'rgba(0, 0, 0, 0.3)',
          borderWidth: 1,
          borderCap: 'round',
          areaColor: 'rgba(56,96,155,1)',
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
        },
      },
    ],
    series: [
      // 其他省份
      {
        name: 'otherProvincialCapital',
        // symbol 形状修改
        type: 'scatter',
        symbol: 'circle',
        symbolSize: 4,
        // 显示层级
        zlevel: 7,
        z: 1,
        coordinateSystem: 'geo',
        geoIndex: 1,
        itemStyle: {
          //坐标点颜色
          show: true,
          color: '#fff',
        },
        // label样式
        label: {
          show: true,
          position: 'top',
          formatter: '{b}',
          fontSize: 10,
          color: 'rgba(255,255,255,0.8)',

          padding: 3,
          borderWidth: 0,
          borderRadius: 2,
          // borderColor: "rgba(7, 19, 37, 1)",
          fontWeight: 300,
          backgroundColor: 'rgba(255, 255, 255, 0.1)', // 字体背景色
        },

        // 取消一些交互
        select: {
          disabled: false,
        },
        emphasis: {
          disabled: true,
        },
        silent: true,

        data: getProvincialCapitals(needShowProvincialCapitals),
      },
      // 扬州
      {
        // symbol 形状修改
        name: 'hangzhou',
        type: 'scatter',
        symbol: 'circle',
        symbolSize: 10,

        // 显示层级
        zlevel: 7,
        z: 9,
        coordinateSystem: 'geo',
        geoIndex: 1,

        itemStyle: {
          //坐标点颜色
          show: true,
          color: '#f40',
        },
        // label样式
        label: {
          show: true,
          position: 'top',
          formatter: '{b}',
          fontSize: 12,
          color: 'rgba(255,255,16,1)',

          padding: 4,
          borderWidth: 0,
          borderRadius: 2,
          // borderColor: "rgba(7, 19, 37, 1)",
          fontWeight: 300,
          backgroundColor: 'rgba(231,181,92,0.5)', // 字体背景色
        },

        // 取消一些交互
        select: {
          disabled: false,
        },
        emphasis: {
          disabled: true,
        },
        silent: true,

        data: [hangzhou],
      },
      // 工厂 涟漪
      {
        name: 'factorys',
        type: 'effectScatter',
        symbol: 'circle',
        symbolSize: 8,

        // 显示层级
        zlevel: 7,
        z: 3,
        coordinateSystem: 'geo',
        geoIndex: 1,

        itemStyle: {
          //坐标点颜色
          show: true,
          color: 'rgba(81,179,248,1)',
        },
        rippleEffect: {
          period: 10,
          scale: 4,
          brushType: 'stroke',
        },

        // 取消一些交互
        select: {
          disabled: false,
        },
        emphasis: {
          disabled: true,
        },
        silent: true,
        data: factorys,
      },
      // 云端到工厂飞线
      {
        name: 'clouds-factorys',
        type: 'lines',
        // 显示层级
        zlevel: 7,
        z: 4,
        coordinateSystem: 'geo',
        geoIndex: 1,
        // 飞线样式
        lineStyle: {
          curveness: 0.2, // 尾迹线条曲直度
          width: 1.6,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0.05,
                color: 'rgba(56,96,155,0)', // 0% 处的颜色
              },
              {
                offset: 0.3,
                color: 'rgba(56,96,155,0.1)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(56,96,155,1)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },

        // 飞线动画效果
        effect: {
          show: true,
          period: 10,
          delay: 400,
          trailLength: 0.4,
          color: 'rgba(255,255,100,1)', // 流动点颜色
          symbol: 'pin',
          symbolSize: 10,
        },

        // 取消一些交互
        select: {
          disabled: false,
        },
        emphasis: {
          disabled: true,
        },
        silent: true,

        data: lines,
      },
      // 云端到扬州飞线
      {
        name: 'clouds-hangzhou',
        type: 'lines',

        // 显示层级
        zlevel: 7,
        z: 5,
        coordinateSystem: 'geo',
        geoIndex: 1,

        // 飞线样式
        lineStyle: {
          curveness: 0.2, // 尾迹线条曲直度
          width: 1.6,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0.05,
                color: 'rgba(56,96,155,0)', // 0% 处的颜色
              },
              {
                offset: 0.3,
                color: 'rgba(56,96,155,0.1)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(56,96,155,1)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },

        // 飞线动画效果
        effect: {
          show: true,
          period: 10,
          delay: 400,
          trailLength: 0.4,
          color: 'rgba(255,255,100,1)', // 流动点颜色
          symbol: 'pin',
          symbolSize: 10,
        },

        data: lines2,
        // 取消一些交互
        select: {
          disabled: false,
        },
        emphasis: {
          disabled: true,
        },
        silent: true,
      },
      // 工厂 标志 黄色水滴
      {
        name: 'factorys-water',
        type: 'scatter',
        symbol: 'pin',
        symbolSize: 14,

        // 显示层级
        zlevel: 7,
        z: 6,
        coordinateSystem: 'geo',
        geoIndex: 1,

        itemStyle: {
          //坐标点颜色
          show: true,
          color: 'yellow',
        },

        // 取消一些交互
        select: {
          disabled: false,
        },
        emphasis: {
          disabled: true,
        },
        silent: true,
        data: factorys,
      },
    ],
  }
  return Object.freeze(option)
}

onMounted(() => {
  let geoEc = echarts.init(mapRef.value)
  const option = createOption(factorys)
  geoEc.setOption(option)
})

//====================

// 获取变化后 缩放比例
const getScaleRatio = (w: 1920, h: 1080) => {
  const W_Ratio = window.innerWidth / w
  const H_Ratio = window.innerHeight / h
  console.log('====', W_Ratio, H_Ratio)
  return W_Ratio < H_Ratio ? W_Ratio : H_Ratio
}

// 放大缩小 平移拉拽
const resizeView = () => {
  if (screenRef.value) {
    screenRef.value.style.transform = `scale(${getScaleRatio(1920, 1080)}) translate(-50%,-50%)`
  }
}
window.onresize = () => {
  resizeView()
}
onMounted(() => {
  resizeView()
})

let $router = useRouter()
const onBtnBack = () => {
  $router.push('/home')
}
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  .screen {
    width: 1920px;
    height: 1080px;
    transform-origin: left top; //缩放基点左上角
    position: fixed;
    left: 50%;
    top: 50%;
    .screen_bar {
      width: 100%;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      .screen_bar_right {
        flex: 1;
        background: url(@/assets/images/dataScreen-header-right-bg.png)
          no-repeat;
        background-size: cover;
        margin-top: -30px;
        .right_btn {
          width: 160px;
          height: 50px;
          float: left;
          line-height: 40px;
          text-align: center;
          font-size: 30px;
          color: #29fcff;
          background: url(@/assets/images/dataScreen-header-btn-bg-r.png)
            no-repeat;
        }
      }
      .screen_bar_center {
        flex: 2;
        background: url(@/assets/images/dataScreen-header-center-bg.png)
          no-repeat;
        background-size: 100% 100%;
        height: 74px;
        line-height: 74px;
        text-align: center;
        font-size: 50px;
        color: #29fcff;
      }
      .screen_bar_left {
        flex: 1;
        background: url(@/assets/images/dataScreen-header-left-bg.png) no-repeat;
        background-size: cover;
        margin-top: -30px;
        .left_btn {
          width: 160px;
          height: 50px;
          float: right;
          line-height: 40px;
          text-align: center;
          font-size: 30px;
          color: #29fcff;
          background: url(@/assets/images/dataScreen-header-btn-bg-l.png)
            no-repeat;
        }
      }
    }
    .screen_main {
      height: calc(100% - 80px);
      width: 100%;
      display: flex;
      .screen_main_right {
        flex: 1;
        display: flex;
        flex-direction: column;
        .screen_main_right_top {
          flex: 1.5;
          background: url(@/assets/images/dataScreen-main-lt.png) no-repeat;
          background-size: 100% 100%;
          .screen_main_right_top_ec {
            width: 100%;
            margin-top: 55px;
            height: calc(100% - 55px);
          }
        }
        .screen_main_right_center {
          flex: 1;
          background: url(@/assets/images/dataScreen-main-lc.png) no-repeat;
          background-size: 100% 100%;
          margin: 10px 0;
          .screen_main_right_center_ec {
            width: 100%;
            margin-top: 55px;
            height: calc(100% - 55px);
          }
        }
        .screen_main_right_bottom {
          flex: 1;
          background: url(@/assets/images/dataScreen-main-lb.png) no-repeat;
          background-size: 100% 100%;
        }
      }
      .screen_main_center {
        flex: 2;
        display: flex;
        flex-direction: column;
        padding: 0 20px;
        .screen_main_center_top {
          flex: 3;
          .screen_main_center_top_ec {
            width: 100%;
            height: 100%;
          }
        }
        .screen_main_center_bottom {
          flex: 1;
          background: url(@/assets/images/dataScreen-main-cb.png) no-repeat;
          background-size: 100% 100%;
          .screen_main_center_bottom_ec {
            width: 100%;
            margin-top: 58px;
            height: calc(100% - 58px);
          }
        }
      }
      .screen_main_left {
        flex: 1;
        display: flex;
        flex-direction: column;
        .screen_main_left_top {
          flex: 1.5;
          background: url(@/assets/images/dataScreen-main-lt.png) no-repeat;
          background-size: 100% 100%;
          .screen_main_left_top_title {
            margin-top: 70px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            .total {
              position: absolute;
              top: -30px;
              right: 15px;
              font-size: 20px;
              color: white;
            }
            .screen_main_left_top_title_item {
              width: 60px;
              height: 60px;
              margin: 2px;
              background: url(@/assets/images/total.png) no-repeat;
              background-size: 100% 100%;
              color: white;
              font-size: 50px;
              line-height: 60px;
              text-align: center;
            }
          }
          .screen_main_left_top_ec {
            width: 100%;
            height: calc(100% - 130px);
          }
        }
        .screen_main_left_center {
          flex: 1;
          background: url(@/assets/images/dataScreen-main-lc.png) no-repeat;
          background-size: 100% 100%;
          margin: 10px 0;
          .screen_main_left_center_title {
            width: 100%;
            margin-top: 65px;
            height: 125px;
            display: flex;
            justify-content: center;
            align-items: center;
            .screen_main_left_center_title_man {
              width: 130px;
              height: 100%;
              background: url(@/assets/images/man-bg.png) no-repeat;
              background-size: 100% 100%;
              margin: 0 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              position: relative;
              .sex {
                position: absolute;
                top: 0;
                left: 45px;
                line-height: 20px;
                color: white;
                font-size: 20px;
              }
            }
            .screen_main_left_center_title_woman {
              width: 130px;
              height: 100%;
              background: url(@/assets/images/woman-bg.png) no-repeat;
              background-size: 100% 100%;
              margin: 0 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              position: relative;
              .sex {
                position: absolute;
                top: 0;
                left: 45px;
                line-height: 20px;
                color: white;
                font-size: 20px;
              }
            }
          }
          .screen_main_left_center_ec {
            width: 100%;
            height: calc(100% - 200px);
          }
        }
        .screen_main_left_bottom {
          flex: 1;
          background: url(@/assets/images/dataScreen-main-lb.png) no-repeat;
          background-size: 100% 100%;
          .screen_main_left_bottom_ec {
            width: 100%;
            margin-top: 55px;
            height: calc(100% - 55px);
          }
        }
      }
    }
  }
}
</style>
