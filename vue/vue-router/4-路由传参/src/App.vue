<template>
  <div id="app">
    <router-link to='/home'>首页</router-link>
    <router-link to='/about'>关于</router-link>

    <!-- 1.通过 router-link to 直接传参 -->
    <!-- <router-link :to="'/user/' + userId">用户</router-link> -->
    <!-- <router-link to='/profile'>档案</router-link> -->
    <!-- <router-link :to="{path: '/profile', query: {name: 'zhangsan', age: '18', height: 1.8}}">档案</router-link> -->
    
    <!-- 2.通过函数编程传参 -->
    <button @click="userClick()">用户</button>
    <button @click="profileClick()">档案</button>
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        userId: 'lisi'
      }
    },
    methods: {
      userClick() {
        this.$router.push('/user/' + this.userId)
      },
      profileClick() {
        this.$router.push({
          path: '/profile',
          query: {
            name: 'zhangsan',
            age: '18',
            height: 1.8
          }
        })
      }
    }
  }
</script>

<style> 
  .router-link-active {  /* 被点击的rouret-link会增加一个router-link-active的class属性 */
    color: red
  }
</style>
