<template>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
      @current-change="handleCurrentChange"
    />
</template>

<script setup>
import { ref } from 'vue'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(10)

const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}
</script>

<style>

</style>