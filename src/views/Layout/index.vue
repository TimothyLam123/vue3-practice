<template>
    <div class="menu">
        <MyMenu></MyMenu>
    </div>
    <div class="content">
        <Content></Content>
    </div>
</template>

<script>
import MyMenu from './MyMenu'
import Content from './Content'
export default {
    components: {
        MyMenu,
        Content
    }
}
</script>

<style lang="less" scoped>
.menu{
    position: fixed;
    left:0;
    top:0;
    bottom:0;
    background-color: #112f50;
}
.content{
    padding-left: 200px;
}
</style>