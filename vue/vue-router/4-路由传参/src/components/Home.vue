<template>
    <div>
        <h2>我是首页界面</h2>
        <p2>我是首页内容</p2>

        <router-link to='/home/news'>新闻</router-link>
        <router-link to='/home/message'>消息</router-link>

        <router-view />
    </div>
</template>

<script>
    export default{
        name: 'Home'
    }
</script>