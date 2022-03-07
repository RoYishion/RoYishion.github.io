<template>
  <div>
    <el-row class="index-top">
      <el-col :span="2" :offset="18">
        <el-dropdown trigger="click" v-if="user" @command="handleCommand">
          <span class="el-dropdown-link">
            {{user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-close" command="logout">退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-link type="primary" @click="showLogin = !showLogin" v-else>登陆</el-link>
      </el-col>
    </el-row>

    <el-dialog
      title="登陆"
      :visible.sync="showLogin"
      :before-close="handleClose"
    >
      <el-form :model="loginForm">
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="loginForm.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            v-model="loginForm.password"
            autocomplete="off"
            show-password
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showLogin = false">取 消</el-button>
        <el-button type="primary" @click="checkLogin" :loading="loginLoading"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-row>
      <el-col :span="12" :offset="6">
        <el-carousel :interval="4000" height="500px">
          <el-carousel-item v-for="(item, index) in newsListCar" :key="index">
            <h1>{{ item.news_title }}</h1>
            <h2>{{ item.news_content }}</h2>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { login } from "@/services/user";
import { mapMutations } from "vuex";
import { mapState } from "vuex";
import { getNewsByTypeNum } from "../services/news";
import { setToken } from "@/util/auth";

export default {
  data() {
    return {
      loginForm: {
        phone: "",
        password: ""
      },
      formLabelWidth: "120px",
      loginLoading: false,
      showLogin: false,
      newsListCar: []
    };
  },
  computed: {
    ...mapState("account", ["user"])
  },
  methods: {
    ...mapMutations("account", ["setUser", "setRoles"]),
    handleClose(done) {
      this.$confim("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    checkLogin() {
      this.loginLoading = true;
      login(this.loginForm)
        .then((res) => {
          console.log(res);
          if (res.success) {
            setToken(res.data.token);
            this.loginLoading = false;
            this.showLogin = false;
            this.$router.push("/Mine");
          } else {
            this.$message.error(res.err.msg);
            this.loginLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
          this.loginLoading = false;
        });
    },
    handleCommand(command) {
      // 退出登录
      if (command == "logout") {
        this.$store.dispatch("account/resetToken");
      }
    },
  },
  mounted: function () {
    getNewsByTypeNum({ newsType: 1, newsNum: 3 }).then((res) => {
      console.log(res);
      this.newsListCar = res.data;
    });
  },
};
</script>

<style>
.el-carousel__item {
  font-size: 14px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.index-top {
  background-color: #d3dce6;
  line-height: 50px;
}
</style>