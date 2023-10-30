<template>
    <div class="header"></div>
    <div class="wrapper">
        <router-view></router-view>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.header{
    height: 50px;
    background-color: pink;
}
.wrapper{
    margin:10px;
}
</style>