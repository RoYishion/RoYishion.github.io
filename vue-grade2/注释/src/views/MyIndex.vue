<template>
  <div>
    <el-row class="index-top">
      <el-col :span="2" :offset="18">
        <el-dropdown trigger="click" v-if="user" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ user.userName }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-edit" command="modifyPwd">
              修改密码
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-close" command="logout">
              退出登陆
            </el-dropdown-item>
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
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showLogin = false">取 消</el-button>
        <el-button type="primary" @click="checkLogin" :loading="loginLoading"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 修改密码弹窗 -->
    <el-dialog
      title="修改密码"
      :visible.sync="pwdModalVisible"
      :before-close="handlePwdModalClose"
    >
      <el-form :model="pwdForm">
        <el-form-item label="新的密码" :label-width="formLabelWidth">
          <el-input
            v-model="pwdForm.newPwd"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="再次输入" :label-width="formLabelWidth">
          <el-input
            v-model="pwdForm.reNewPwd"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="pwdModalVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmModify">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { login, modifyPwd } from "@/services/user";  // 引入当前页面用到的请求api
import { mapMutations } from "vuex";
import { mapState } from "vuex";

export default {
  data() {
    return {//当前页面所用的变量
      loginForm: {//登录用户名和密码
        userId: "",
        password: "",
      },
      pwdForm: {//修改密码所用到的变量
        newPwd: "",
        reNewPwd: "",
      },
      formLabelWidth: "120px",
      loginLoading: false,
      showLogin: false,
      pwdModalVisible: false,
      userName: "",
    };
  },
  computed: {
    // 获取store中的用户数据
    ...mapState("account", ["user"]),
  },
  methods: {
    // 展开store中的mutations, 用于更新store的数据
    ...mapMutations("account", ["setUser", "setRoles"]),
    // 关闭登录弹窗
    handleClose(done) {
      this.showLogin = false;
    },

    handlePwdModalClose(done) {//关闭弹窗
      this.pwdModalVisible = false;
    },

    // 点击登录, 确认提交
    checkLogin() {
      this.loginLoading = true;
      login(this.loginForm) //login 为上面引入的函数方法，括号中为该函数所用到的实参
        .then((res) => {//res为mock返回的结果
          console.log(res);
          if (res.success) {
            this.setUser({//调用stroe中的setuser函数，更新stroe中的数据
              userId: res.data.userId,
              userName: res.data.userName,
              userNo: res.data.userNo,
            });

            this.setRoles(res.data.userRole);//调用store中setRoles函数，更新角色信息

            this.$router.push({//登录成功之后跳转 mine页面
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

    // 提交修改密码
    confirmModify() {
      if (this.pwdForm.newPwd !== this.pwdForm.reNewPwd) {//两次输入密码做对比
        return this.$message.error("两次密码输入不一致");
      }

      modifyPwd(this.pwdForm)  // 修改密码函数，带入实参
        .then((res) => {  // res为mock返回数据
          if (res.success) {  // 根据返回数据做出判断，res.success = true
            this.$message.info("修改成功");
            this.pwdModalVisible = false;//修改成功之后关闭弹窗
          } else {  // res.success = false
            this.$message.error(res.err.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleCommand(command) {
      // 退出登录
      if (command == "logout") {
        this.$store.dispatch("account/resetToken");  // 调用account中resetToken函数，清除登录信息
      } else if (command === "modifyPwd") {  // 修改密码
        this.pwdModalVisible = true;  // 弹窗打开
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
