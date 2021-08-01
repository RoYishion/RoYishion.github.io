<template>
    <div>
        <h2>我是用户界面</h2>
        <p2>我是用户信息</p2>
        <h2>{{userId}}</h2>
    </div>
</template>

<script>
    export default{
        name: 'User',
        computed: {
            userId() {
                return this.$route.params.userId
                //$route表示一个激活的路由对象，这里拿到的是index.js里面配置的被激活的路由
                //$router表示index.js里面配置的所有路由
            }
        }
    }
</script>