<template>
    <el-menu
    :default-active="route.path"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    background-color="#112f50"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <el-menu-item>
        <template #title>
            <span>
                首课生鲜采购系统
            </span>
        </template>
    </el-menu-item>
    <el-menu-item index="/">
        <template #title>
            <el-icon>
                <Briefcase />
            </el-icon>
            <span>
                系统首页
            </span>
      </template>
    </el-menu-item>
    <el-sub-menu index="/goods">
      <template #title>
        <el-icon>
            <Grid />
        </el-icon>
        <span>
            产品管理
        </span>
      </template>
      <el-menu-item-group>
        <template></template>
        <el-menu-item index="/goods/list">产品列表</el-menu-item>
        <el-menu-item index="/goods/category">产品分类</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router'
export default {
    setup(){
        // 定义开关
        const isCollapse = ref(false)
        //使用路由
        const route = useRoute()
        console.log(route);
        return {
            isCollapse,
            route
        }
    }
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>