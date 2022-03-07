<template>
  <div>
    <el-row class="index-top">
      <el-col :span="2" :offset="18">
        <el-dropdown trigger="click" v-if="user" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ user.userName }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-close" command="logout"
              >退出登陆</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <el-link type="primary" @click="showLogin = !showLogin" v-else
          >登陆</el-link
        >
      </el-col>
    </el-row>

    <el-dialog
      title="登陆"
      :visible.sync="showLogin"
      :before-close="handleClose"
    >
      <el-form :model="loginForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="loginForm.userId" autocomplete="off"></el-input>
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
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="(item, index) in newsListCar" :key="index">
            <h1 >{{item.news_title}}</h1>
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
import getNewsByTypeNum from "../services/news";

export default {
  data() {
    return {
      loginForm: {
        userId: "",
        password: "",
      },
      formLabelWidth: "120px",
      loginLoading: false,
      showLogin: false,
      // userName: "",
      newsListCar: []
    };
  },
  computed: {
    ...mapState("account", ["user"]),
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
            this.setUser({
              userId: res.data.userId,
              userName: res.data.userName,
              userNo: res.data.userNo,
            });
            this.setRoles(res.data.userRole);
            this.$router.push({
              name: "Mine",
            });
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
    getNewsByTypeNum({ newsType: 2, newsNum: 2 }).then((res) => {
      console.log(res.data.data);
      this.newsListCar = res.data.data;
    });
  },
};
</script>

<style>
.el-carousel__item h3 {
  color: gray;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: blanchedalmond;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: goldenrod;
}

.index-top {
  background-color: antiquewhite;
  line-height: 50px;
}
</style>