<template>
  <div>
    <el-row class="index-top">
      <el-col :span="2" :offset="18">
        <el-dropdown trigger="click" v-if="userName" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
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

    <el-row>
      <el-col :span="24">
        <div class="block">
          <span class="demonstration">My Index</span>
          <el-carousel>
            <el-carousel-item v-for="item in imagesList">
              <img :src="item.url" alt="" />
            </el-carousel-item>
          </el-carousel>
        </div>
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
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showLogin = false">取 消</el-button>
        <el-button type="primary" @click="checkLogin()" :loading="loginLoading"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { login } from "@/services/user";
import Cookies from "js-cookie";

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
      userName: "",
      imagesList: [
        { url: require("../images/100.png") },
        { url: require("../images/100n.png") },
      ],
      bannerHeight: 1000,
    };
  },
  mounted: function () {
    this.userName = Cookies.get("userName");
  },
  methods: {
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
            //登陆成功保存用户与信息
            let num = 2; //失效时间2小时
            let time = new Date(new Date().getTime() + num * 60 * 60 * 1000);
            Cookies.set("userId", res.data.userId, { expires: time });
            Cookies.set("userName", res.data.userName, { expires: time });

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
        });
    },
    handleCommand(command) {
      if (command == "logout") {
        console.log("111");
        Cookies.remove("userId");
        Cookies.remove("userName");
        this.$router.go(0);
      }
    },
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