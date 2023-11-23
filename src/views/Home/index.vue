<template>
    <div class="home">
      <!--1.  顶部区域布局---------- -->
      <div class="home-header">
        <div class="item">
          总销售额
          <div class='num'>{{ homeInfo.saleTotal }}</div>
          <div class="bottom">今日销售额:{{ homeInfo.sale }}</div>
        </div>
        <div class="item">总访问量
          <div class='num'>{{ homeInfo.viewsTotal }}</div>
          <div class="bottom">今日访问量:{{ homeInfo.views }}</div>
        </div>
        <div class="item">总收藏量
          <div class='num'>{{ homeInfo.collectTotal }}</div>
          <div class="bottom">今日销售额:{{ homeInfo.collect }}</div>
        </div>
        <div class="item">总支付量
          <div class='num'>{{ homeInfo.payTotal }}</div>
          <div class="bottom">今日支付量:{{ homeInfo.pay }}</div>
        </div>
      </div>
  
      <!--2. 访问数据统计 ----------------->
      <div class="content">
        <div class="time-info" id='box13'>
          <div class="title">月销售额</div>
          <div id="charts" style="width: 100%; height: 300px"></div>
        </div>
        <div class="area" id="box1">
          <div class="title">产品销售比例</div>
          <div id="pie" style="width: 100%; height: 300px"></div>
        </div>
      </div>
  
  
      <!-- 3.  -->
      <!-- 最新内容 -->
      <div class="home-footer">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今日订单</span>
          </div>
          <div class="text item">
            <el-row>
              <el-col :span="8">
                <div class="title">今日订单数</div>
                <div>2000</div>
              </el-col>
              <el-col :span="8">
                <div class="title">汇总确认订单</div>
                <div>20000</div>
              </el-col>
              <el-col :span="8">
                <div class="title">今日金额</div>
                <div>20000</div>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>本月订单</span>
          </div>
          <div class="text item">
            <el-row>
              <el-col :span="8">
                <div class="title">本月订单数</div>
                <div>20000</div>
              </el-col>
              <el-col :span="8">
                <div class="title">汇总确认订单</div>
                <div>20000</div>
              </el-col>
              <el-col :span="8">
                <div class="title">累计金额</div>
                <div>20000</div>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>快捷入口</span>
          </div>
          <div class="text item">
            <el-button type="primary">产品管理</el-button>
            <el-button>消息管理</el-button>
            <el-button>内容管理</el-button>
          </div>
        </el-card>
      </div>
  
    </div>
  </template>
  
  <script>
  import api from '@/api'
  import { getCurrentInstance, onMounted, ref } from 'vue'
  import echarts from '@/Plugin/echarts'
  export default {
    setup() {
      //定义统计数据变量
      let homeInfo = ref({})
  
      //获取数据
      const instance = getCurrentInstance();
      const echarts = instance.appContext.config.globalProperties.$echarts
  
      // const $echarts = inject('echarts')
  
      //请求数据
      api.getHomeCount().then(res => {
          // console.log('首页统计的数据', res.data.data.list)
          // Object.assign(homeInfo, res.data.data.list)
          homeInfo.value = res.data.data.list
        })
  
      //获取图表数据
      api.getHomeFormat().then(res => {
          // console.log(res.data)
          let arr = res.data.result.data.sale_money
          //声明变理存储X轴 y轴数据
          let xData = [], yData = [], yBarData = [], pipeData = []
          arr.forEach(
            ele => {
              xData.push(ele.name)
              yData.push(ele.total_amount)
              yBarData.push(ele.num)
  
              //获取对象结构存储饼图数据
              let obj = {}
              obj.name = ele.name
              obj.value = ele.total_amount
              pipeData.push(obj)
            })
  
            bar(xData,yData,yBarData)
            pie(pipeData)
  
        })
  
  
  
      //绘制柱状图
      const bar = (xData,yData,yBarData) => {
        var myChart = echarts.init(document.getElementById("charts"))
        // 指定图表的配置项和数据
        var option = {
          title: {
          },
          tooltip: {},
          xAxis: {
            data: xData
          },
          yAxis: {},
          series: [
            {
              name: '销售额',
              type: 'line',
              data: yData,
              smooth: true
            },
            {
              name: '销售量',
              type: 'bar',
              data: yBarData
            }
          ]
        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      }
  
      //绘制饼图
      const pie = (data) => {
        var chartDom = document.getElementById('pie');
        var myChart = echarts.init(chartDom);
        var option;
  
        option = {
          title: {
            text: '',
            subtext: 'Fake Data',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '50%',
              data,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
  
        option && myChart.setOption(option);
      }
  
      return {
        homeInfo
      }
  
    }
  }
  </script>
  
  <style lang="less" scoped>
  // .home {
  //   margin: 10px;
  // }
  
  .home-header {
    display: flex;
    padding-right: 30px;
  
    .item {
      flex: 1;
      height: 100px;
      padding: 10px;
      background: #fff;
      border-radius: 10px;
      margin-left: 20px;
      margin-right: 20px;
      font-weight: bold;
      color: #fff;
      // text-align: center;
      position: relative;
  
      .num {
        font-size: 22px;
        margin: 10px;
        color: #fff;
      }
  
      .bottom {
        position: absolute;
        border-top: 1px solid rgb(246, 245, 245);
        padding: 10px 20px;
        bottom: 0;
        right: 0;
        left: 0;
        color: #fff;
        font-weight: normal;
      }
    }
  
    .item:nth-child(1) {
      background-image: linear-gradient(#df887d, #88554d);
    }
  
    .item:nth-child(2) {
      background-image: linear-gradient(#409eff, #2e556e);
    }
  
    .item:nth-child(3) {
      background-image: linear-gradient(#b54fa8, #713c7a);
    }
  
    .item:nth-child(4) {
      background-image: linear-gradient(#1cd2f1, #39717a);
    }
  }
  
  // 图表
  
  .content {
    margin: 20px;
    display: flex;
    height: 320px;
  
    .time-info {
      flex: 2;
      background: #fff;
      margin-right: 20px;
      padding: 10px;
    }
  
    .area {
      flex: 1;
      background: #fff;
      padding: 10px;
    }
  }
  
  //内容
  
  .home-footer {
    display: flex;
    padding-left: 20px;
    margin-bottom: 20px;
  
    .clearfix {
      margin-bottom: 20px;
    }
  
    .box-card {
      flex: 1;
      margin-right: 30px;
  
      span {
        font-weight: 600;
      }
    }
  
    .item {
      text-align: center;
      font-size: 24px;
      color: #333;
  
      .el-col {
        border-right: 1px solid #eee;
  
      }
  
      .el-col:last-child {
        border-right: none;
      }
  
      .title {
        margin-bottom: 10px;
        font-size: 14px;
      }
    }
  }
  </style>  