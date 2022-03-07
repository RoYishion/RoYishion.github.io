<template>
  <div id="content">
    <div id="left">
      <ul>
        <li @click="menuAction(1)">我的书籍</li>
        <li @click="menuAction(2)">我的地址</li>
      </ul>
    </div>

    <div id="right">
      <component :is="showCom"></component>
    </div>
  </div>
</template>

<script>
import mybooks from './views/mybooks'
import myaddress from './views/myaddress'

export default {
  name: 'App',
  data() {
    return {
      showCom: 'mybooks'
    }
  },
  components: {
    mybooks,
    myaddress
  },
  methods: {
    menuAction(menuIndex) {
      if(menuIndex == 1) {
        this.showCom = 'mybooks'
      }else if(menuIndex == 2) {
        this.showCom = 'myaddress'
      }
    }
  }
}
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