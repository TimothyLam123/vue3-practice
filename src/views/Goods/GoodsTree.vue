<template>
    <!-- <el-tree :props="props" :load="loadNode" lazy show-checkbox @node-click="clickTree"/> -->
</template>

<script setup>

// import api from '@/api/index'
// const emit = defineEmits(['changeTree'])

// import Node from 'element-plus/es/components/tree/src/model/node'

// interface Tree {
//   name: string
//   leaf?: boolean
// }

// const props = {
//   label: 'name',
//   children: 'zones',
//   isLeaf: 'leaf',
// }

// const loadNode = async (node, resolve) => {
//   if (node.level === 0) {
    // let result = await goodsItemCategory(1)
    // return resolve(result);
//   }
//   if (node.level > 1) {
    // let result = await goodsItemCategory(node.data.cid)
    // return resolve(result);
//   }
// }
//获取数据
// const goodsItemCategory = async (type)=>{
//     let res = await api.goodsItemCategory({ type })
//     if (res.data.status === 200) {
//         return res.data.result;
//     } else {
//         return [];
//     }
// }

// const clickTree=(data,node)=>{
//     emit('changeTree', data)
// }
</script>

<style>

</style>