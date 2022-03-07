<template>
  <div>
    <el-row class="tac">
      <el-col :span="2">
        <el-menu default-active="1" class="el-menu-vertical-demo">
          <el-menu-item index="1">
            <el-button
              @click="ManageNews"
              size="large"
              type="primary"
              icon="el-icon-reading"
              >新闻管理</el-button>
          </el-menu-item>

          <el-menu-item index="2">
            <el-button
              @click="ManageUsers"
              size="large"
              type="primary"
              icon="el-icon-user"
              v-if="roles == '管理员'"
              >用户管理</el-button>
          </el-menu-item>

          <el-menu-item index="3">
            <el-button
              @click="ManageRoles"
              size="large"
              type="primary"
              icon="el-icon-user"
              v-if="roles == '管理员'"
              >角色管理</el-button>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <router-view></router-view>
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
    ...mapState("account", ["roles"])
  },
  methods: {
    ManageNews() {
      this.$router.push("/Mine/manageNews");
    },
    ManageUsers() {
      this.$router.push("/Mine/ManageUsers");
    },
    ManageRoles() {
      this.$router.push("/Mine/ManageRoles");
    }
  },
};
</script>