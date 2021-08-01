<template>
  <div id="app">
    <router-link to='/home'>首页</router-link>
    <router-link to='/about'>关于</router-link>
    <router-link :to="'/user/' + userId">用户</router-link>

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
    }
  }
</script>

<style> 
  .router-link-active {  /* 被点击的rouret-link会增加一个router-link-active的class属性 */
    color: red
  }
</style>
