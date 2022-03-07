<template>
  <div id="content">
    <div id="left">
      <ul>
        <li>
          <router-link to="/">我的书籍</router-link>
        </li>
        <li>
          <router-link to="/myaddress">我的地址</router-link>
        </li>
      </ul>
    </div>

    <div id="right">
      <router-view />
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style>
  #content {
    margin: 0 auto;
    width: 1004px;
  }

  #left, #right {
    border: 2px solid black;
  }

  #left {
    width: 200px;
    float: left;
  }

  #right {
    width: 834px;
    float: right;
  }
</style>