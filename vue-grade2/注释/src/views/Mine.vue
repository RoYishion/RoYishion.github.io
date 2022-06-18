<template>
  <div>
    <h1>Mine 我的地址和书籍</h1>
    <ul>
      <li>
        <router-link to="/Mine/mybooks">我的书籍</router-link>
      </li>
      <li>
        <router-link to="/Mine/myaddress">我的地址</router-link>
      </li>
      <li>
        <router-link to="/Mine/ManageUsers">用户管理</router-link>
      </li>
    </ul>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "mine",
  data: function () {
    return {};
  },
  computed: {
    ...mapState("account", ["roles"]),
  },
};
</script>