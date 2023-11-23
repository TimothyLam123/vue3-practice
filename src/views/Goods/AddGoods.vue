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
                                <span class="category"> {{ goodsForm.category }}</span>
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
                            </el-form-item>
                            <el-form-item label="商品描述" prop="descs">
                                <el-input v-model="goodsForm.sellPoint"></el-input>
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
                        </el-form>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>>
</template>

<script setup>
import { reactive } from 'vue';
import GoodsTree from './GoodsTree.vue'

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
const changeTree=(val)=>{
    console.log('接受Tree点击的数据', val);
    goodsForm.cid = val.cid
    goodsForm.category = val.name
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