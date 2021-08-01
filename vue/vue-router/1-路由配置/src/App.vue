<template>
  <div id="app">
    <router-link to='/home' replace>首页</router-link>  <!-- 默认渲染成a标签 -->  <!-- 加上replace属性后无法使用返回功能 -->
    <router-link to='/about' tag='button' replace>内容</router-link>  <!-- 渲染成按钮 -->  <!-- 加上replace属性后无法使用返回功能 -->
    <router-view />

    <button @click="homeClick()">首页</button>
    <button @click="aboutClick()">内容</button>
  </div>
</template>

<script>
  export default {
    name: 'App',
    methods: {
      homeClick() {
        this.$router.push('/home')  // 可以返回
        // this.$router.replace('/home')  // 不可以返回
      },
      aboutClick() {
        this.$router.push('/about')  // 可以返回
        // this.$router.replace('/about')  // 不可以返回
      }
    }
  }
</script>

<style> 
  .router-link-active {  /* 被点击的rouret-link会增加一个router-link-active的class属性 */
    color: red
  }
</style>