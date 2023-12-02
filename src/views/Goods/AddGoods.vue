<template>
    <div class="addGoods">
        <el-row :gutter="20">
            <el-col :span="4">
                <div class="menu">
                    <div class="title">产品类型列表</div>
                    <div class="tree">
                        <GoodsTree @changeTree="changeTree"></GoodsTree>
                    </div>
                </div>
            </el-col>
            <el-col :span="20">
                <div class="content">
                    <div class="subTitle">商品添加</div>
                    <div class="wrapper">
                        <el-form :model="goodsForm" :rules="rules" ref="ruleForm" label-width="100px" size="small" class="demo-ruleForm">
                            <el-form-item label="所属分类" prop="category">
                                <el-input v-model="goodsForm.category"></el-input>
                            </el-form-item>
                            <el-form-item label="商品名称" prop="title">
                                <el-input v-model="goodsForm.title"></el-input>
                            </el-form-item>
                            <el-form-item label="商品价格" prop="price">
                                <el-input v-model="goodsForm.price"></el-input>
                            </el-form-item>
                            <el-form-item label="商品数量" prop="num">
                                <el-input v-model="goodsForm.num"></el-input>
                            </el-form-item>
                            <el-form-item label="商品卖点" prop="sellPoint">
                                <el-input v-model="goodsForm.sellPoint"></el-input>
                            </el-form-item>
                            <el-form-item label="上传图片" prop="image">
                                <GoodsUpload @sendImage="sendImage" :fileList="fileList"></GoodsUpload>
                            </el-form-item>
                            <el-form-item label="商品描述" prop="descs">
                                <WangEditor @sendEditor="sendEditor"></WangEditor>
                            </el-form-item>
                            <el-form-item label="首页轮播推荐" prop="isBanner">
                                <el-switch v-model="goodsForm.isBanner" active-color="#13ce66"></el-switch>
                            </el-form-item>
                            <el-form-item label="是否推荐商品" prop="recommend">
                                <el-switch v-model="goodsForm.recommend" active-color="#13ce66"></el-switch>
                            </el-form-item>
                            <el-form-item label="是否上架商品" prop="shelves">
                                <el-switch v-model="goodsForm.shelves" active-color="#13ce66"></el-switch>
                            </el-form-item>
                            <el-form-item>
                                <el-button v-show="title !='详情'" type = "primary"
                                    @click="submitForm(ruleForm)">保存</el-button>
                                <!-- <el-button v-show="title !='详情'" type = "primary"
                                    @click="submitForm">保存</el-button> -->
                                <el-button v-show="title !='详情'"
                                    @click="resetForm(ruleForm)">重置</el-button>
                                <el-button @click="goGoodsList()" type = "info" plain>取消</el-button> 
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>>
</template>

<script setup>
import { reactive, ref } from 'vue';
// import { reactive, ref, defineEmits, defineProps } from 'vue';
import GoodsTree from './GoodsTree.vue'
import GoodsUpload from './GoodsUpload.vue'
import WangEditor from './WangEditor.vue'
// import api from '@/api/index'
import { useRouter } from 'vue-router'
const router = useRouter()

import { ElMessage } from 'element-plus'

//图片容器
const fileList = ref([])
const ruleForm = ref()

const goodsForm = reactive({
    cid: '',
    category: '',
    title: '',
    price: '',
    num: '',
    sellPoint: '',
    image: [],
    descs: '',
    isBanner: true,
    recommend: true,
    shelves: true
})

const rules = reactive({
    category: [
        { required: true, message: '请输入商品类目' }
    ],
    title: [
        { required: true, message: '请输入商品名称', trigger: 'blur' },
        { min: 2, max: 10, message: '长度在2到10个字符', trigger: 'blur' }
    ],
    price: [
        { required: true, message: '请输入商品价格', trigger: 'blur' }
    ],
    num: [
        { required: true, message: '请输入商品数量', trigger: 'blur' }
    ],
    date1: [
        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
    ],
    date2: [
        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
    ]
})

//接受Tree点击的数据
// const changeTree=(val)=>{
//     console.log('接受Tree点击的数据', val);
//     goodsForm.cid = val.cid
//     goodsForm.category = val.name
// }

//接受上传图片
// const sendImage=(url)=>{
//     console.log('上传图片', url);
//     goodsForm.image.push(url);
// }

//接受wangEditor的数据
const sendEditor=(val)=>{
    console.log('接受wangEditor数据', val);
    goodsForm.descs = val;
}

//添加商品接口
// const addGood = async (params) => {
//     let res = await api.addGood(params)
//     if (res.data.status === 200) {
//         router.push('/goods/list')
//         ElMessage({
//             showClose: true,
//             message: '恭喜你，添加商品成功',
//             type: 'success',
//         })
//     } else {
//         ElMessage({
//             showClose: true,
//             message: 'Oops, this is a error message.',
//             type: 'error',
//         })
//     }
// }

//保存
const submitForm = async formEl => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('获取表单的输入信息: ', goodsForm);
      let { id, title, cid, category, sellPoint, price, num, descs, image } = goodsForm;
    //   addGood({
    //     title, cid, category, sellPoint, price, num, descs,
    //     image: JSON.stringify(image)
    //   })
      console.log('Goods Form', goodsForm)
      localStorage.setItem('goodsFormToSend', JSON.stringify(goodsForm));
      router.push('/goods/list')
    } else {
      console.log('error submit!', fields)
    }
  })
}
// const props = defineProps(['customData'])
// const emit = defineEmits();
// const submitForm = async formEl => {
//   if (!formEl) return
//   await formEl.validate((valid, fields) => {
//     if (valid) {
//       console.log('获取表单的输入信息: ', goodsForm);
//       let { id, title, cid, category, sellPoint, price, num, descs, image } = goodsForm;
//     //   addGood({
//     //     title, cid, category, sellPoint, price, num, descs,
//     //     image: JSON.stringify(image)
//     //   })
//       $emit('goodsForm', goodsForm);
//     } else {
//       console.log('error submit!', fields)
//     }
//   })
// }

//重置
const resetForm=()=>{
    
}

//取消
const goGoodsList=()=>{
    
}

</script>

<style lang="less" scoped>
.addGoods{
    margin: 10px;
    padding: 10px;
}

.menu{
    border: 1px solid #000;
    height: 600px;
    background: #fff;

    .title {
        height: 50os;
        line-height: 50px;
        color: #fff;
        background: skyblue;
    }
}
</style>