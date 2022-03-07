<template>
  <div>
    <el-row class="index-top">
      <el-col :span="2" :offset="18">
        <el-dropdown trigger="click" v-if="user" @command="handleCommand">
          <span class="el-dropdown-link">
            {{user.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
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
      :before-close="handleClose">
      <el-form :model="loginForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="loginForm.userId" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            v-model="loginForm.password"
            autocomplete="off"
            show-password>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showLogin = false">取 消</el-button>
        <el-button type="primary" @click="checkLogin" :loading="loginLoading">确 定</el-button>
      </div>
    </el-dialog>

    <div class="demo-image__lazy">
      <el-image v-for="url in urls" :key="url" :src="url" lazy></el-image>
    </div>
  </div>
</template>

<script>
import {login} from "@/services/user";
import {mapMutations} from "vuex";
import {mapState} from "vuex";

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
      urls: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
        ]
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
            this.setUser({
              userId: res.data.userId,
              userName: res.data.userName,
              userNo: res.data.userNo
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
    handleCommand(command) {   // 退出登录
      if (command == "logout") {
        this.$store.dispatch("account/resetToken");
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