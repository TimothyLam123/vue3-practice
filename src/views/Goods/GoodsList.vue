<template>
    <div class="list-header">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="产品名称">
      <el-input v-model="formInline.name" placeholder="产品名称" clearable />
    </el-form-item>
    <el-form-item label="产品类型">
      <el-select
        v-model="formInline.region"
        placeholder="产品类型"
        clearable
      >
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>

  <br>

  <el-button type="warning" :icon="Plus" @click="addGoods">添加商品</el-button>
  <el-button type="danger" :icon="Delete" @click="deleteSelected">删除商品</el-button>
    </div>
  
    <div class="wrapper">
        <el-table :data="tableData" border style="width: 100%" :header-row-style="{ color: '#333', textalgin: 'center' }"
      @selection-change="changeTable">
      <el-table-column type="selection" width="50">
      </el-table-column>
      <el-table-column prop="id" label="商品编号" width="100" />
      <el-table-column prop="title" label="商品名称" width="180" />
      <el-table-column prop="price" label="商品价格" width="120" />
      <el-table-column prop="category" label="商品类目" width="140" />
      <el-table-column prop="create_time" label="添加时间" width="200" />
      <el-table-column prop="sellPoint" label="商品卖点" />
      <el-table-column prop="descs" label="商品描述" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" :icon="EditPen" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" :icon="Delete" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>

    <Pagination :total="total" :pageSize="pageSize"></Pagination>
    <!-- <Pagination></Pagination> -->
</template>

<script setup>
import { reactive,ref,onMounted } from 'vue'
import { DataAnalysis, Delete,EditPen,Plus } from '@element-plus/icons-vue'
import api from '@/api/index'
// console.log(api)
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'
import Pagination from '@/components/Pagination.vue'
import { useGoodsStore } from '@/store/Goods'

//仓库
const goods = useGoodsStore()
// console.log('仓库数据', goods);

const router = useRouter();

//搜索数据
const formInline = reactive({
  name: '',
  region: '',
})

//分页数据变量
const total = ref(10)
const pageSize = ref(10)

//表格数据
const tableData = ref([])

const ids = ref([])

//查询
const onSubmit = async () => {
  console.log('formInline submit!', formInline.name)

  const data = await getGoodsList();
  let filteredData = null;

  console.log('filtered data before', filteredData)
  tableData.value = [];
  
  console.log('table data 1', tableData.value)
  
  for (const item of data) {
    if (formInline.name != '') {
      if (item.title.includes(formInline.name)) {
        filteredData = item;
        tableData.value.push(filteredData);
        // break;
      }
    }
  }
  console.log('table data 2', tableData.value)

  console.log('filtered data after', filteredData)
  if (tableData.value.length === 0) {
    total.value = 0;
    pageSize.value = 0
    console.log('table data after', tableData.value)
  }
}


//选择框
const changeTable=(val)=>{
  let arr = []
  val.forEach(ele => {
    arr.push(ele)
  })
  ids.value = arr;
  console.log('选择框', val)
  console.log('ids', ids)
}

//编辑
const handleEdit=(index,row)=>{
    console.log('编辑', row)
    goods.changeTitle('编辑')
    goods.changeRowData(row)
    router.push('/goods/addGoods')
}

//删除
const handleDelete=(index,row)=>{
    console.log('删除-----', row)
    const rowIndex = tableData.value.indexOf(row);

  // 如果找到了匹配的行
  if (rowIndex !== -1) {
    // 使用 splice 方法移除该行
    tableData.value.splice(rowIndex, 1);
  }
  localStorage.setItem('allGoods', JSON.stringify(tableData.value))
}

//批量删除
const deleteSelected=()=>{
  
  console.log('批量删除-----', ids.value)
  const rowIndexArray = ids.value.map(selectedItem => tableData.value.indexOf(selectedItem));

  // 逆序遍历索引数组，确保删除不影响后续的索引
  for (let i = rowIndexArray.length - 1; i >= 0; i--) {
    const rowIndex = rowIndexArray[i];
    
    // 如果找到了匹配的行
    if (rowIndex !== -1) {
      // 使用 splice 方法移除该行
      tableData.value.splice(rowIndex, 1);
    }
  }

  // 清空选择的内容
  ids.value = [];
  
  localStorage.setItem('allGoods', JSON.stringify(tableData.value))
}

//获取产品列表
const getGoodsList = () => {
    const customData = [
      { id: 'id1', title:'产品名称1', category: '产品类型1', price: '123', create_time: '1', sellPoint: '11', descs: '111' },
      { id: 'id2', title:'产品名称2', category: '产品类型1', price: '123', create_time: '2', sellPoint: '22', descs: '222' },
      { id: 'id3', title:'产品名称3', category: '产品类型2', price: '123', create_time: '3', sellPoint: '33', descs: '333' },
      { id: 'id4', title:'123', category: '产品类型2', price: '123', create_time: '4', sellPoint: '44', descs: '444' },
      { id: 'id5', title:'123', category: '产品类型3', price: '123', create_time: '5', sellPoint: '55', descs: '555' },
      { id: 'id6', title:'1234', category: '产品类型3', price: '123', create_time: '6', sellPoint: '66', descs: '666' }
    ];
    customData.forEach(ele => {
        ele.create_time = dayjs(ele.create_time).format('YYYY-MM-DD HH:mm:ss')
    });
    localStorage.setItem('allGoods', JSON.stringify(customData));
    tableData.value = JSON.parse(localStorage.getItem('allGoods'));
    localStorage.setItem('allGoods', JSON.stringify(customData));
    // total.value = 10;
    // pageSize.value = 10;
    return customData;
}




//点击添加商品
const addGoods=()=>{
  goods.changeTitle('添加')
  router.push('/goods/addGoods')
};

let goodsFormReceived = ref('')
onMounted(() => {
    tableData.value = JSON.parse(localStorage.getItem('allGoods'));
    localStorage.setItem('allGoods', JSON.stringify(tableData.value));
});

</script>

<style lang="less" scoped>
.list-header{
    border: 1px solid #000;
    padding: 10px;
    border-radius: 6px;
}

.el-form-item{
    margin-bottom: 0px;
}

.wrapper {
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>