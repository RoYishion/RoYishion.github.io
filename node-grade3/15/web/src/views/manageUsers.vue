<template>
  <div>
    <el-table v-loading="loading" :key=1 :data="tableData" border style="width: 100%">
      <el-table-column
        prop="id"
        label="用户id"
        width="300"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="300"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        width="300"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="role.rolename"
        label="角色"
        width="200"
        align="center"
      ></el-table-column>

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="info" size="mini" @click="editUser(scope.row)">编辑</el-button>
          <el-button prop="id" @click="deleteUser(scope.row)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-button type="primary" icon="el-icon-edit" @click="addUser">
      添加用户
    </el-button>

    <el-button type="primary" icon="el-icon-edit" @click="searchUser">
      搜索用户
    </el-button>
    <el-dialog
      :title="showTitle"
      :visible.sync="showUser"
      width="40%"
      :before-close="handleClose"
    >
      <el-form :model="userForm" ref="forms" :rules="rules">
        <el-form-item label="姓名" prop="username" :label-width="formLabelWidth">
          <el-input v-model="userForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="userForm.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色" prop="role_id" :label-width="formLabelWidth">
          <el-select v-model="userForm.role_id" placeholder="请选择">
            <el-option v-for="item in roleOptions" :key="item.value" :label="item.rolename" :value="item.role_id"></el-option> 
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showUser = false">取消</el-button>
        <el-button type="primary" @click="confirmUser" :loading="editLoading">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllUser, addUser, updateUser, deleteUser, searchUser } from "@/services/user";

export default {
  data() {
    return {
      tableData: [],
      loading: true,
      formLabelWidth: "100px",
      showUser: false,
      editLoading: false,
      showTitle: "",
      confirmType: "",
      userForm: {
        phone: "",
        username: "",
        role_id: ""
      },
      rules: {},
      roleOptions: [],
      idDisabled: false
    };
  },

  methods: {
    // 删除用户
    deleteUser(row) {
      deleteUser(row.id)
        .then((res) => {
          console.log(res);
          if (res.success) {
            this.loading = true;
            this.$message.info(res.err.msg);
            getAllUser()
              .then((res) => {
                this.tableData = res.data.searchUsers;
                this.roleOptions = res.data.roles;
                this.loading = false;
              });
          } else {
            this.$message.error(res.err.msg);
          }
      });
    },
    // 关闭弹窗
    handleClose(done) {
      this.$confirm("确认关闭?")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // 打开添加用户的弹窗
    addUser() {
      this.showTitle = "新增用户";
      this.showUser = true;
      this.userForm.phone = "";
      this.userForm.username = "";
      this.confirmType = 1;
      this.idDisabled = false;
    },
    // 打开编辑用户的弹窗
    editUser(userItem) {
      this.showTitle = "编辑用户";
      this.showUser = true;
      this.userForm.id = userItem.id;
      this.userForm.phone = userItem.phone;
      this.userForm.username = userItem.username;
      this.confirmType = 2;
      this.idDisabled = true;
    },
    // 打开搜索用户的弹窗
    searchUser() {
      this.showTitle = "搜索用户";
      this.showUser = true;
      this.userForm.phone = "";
      this.userForm.username = "";
      this.confirmType = 3;
      this.idDisabled = false;
    },
    // 确认提交, 编辑和新增通过confirmType区分
    confirmUser() {
      this.$refs["forms"] // 拿到表单输入的信息
        .validate((valid) => {
          // 检查表单，验证是否正确
          if (valid) {
            // 正确
            this.editLoading = true;
            if (this.confirmType == 1) {
              // 提交新增用户
              addUser(this.userForm)
                .then((res) => {
                  console.log(res);
                  this.editLoading = false;
                  this.showUser = false;
                  if (res.success) {
                    this.loading = true;
                    this.$message.info(res.err.msg);
                    getAllUser().then((res) => {
                      this.tableData = res.data.searchUsers;
                      this.roleOptions = res.data.roles;
                      this.loading = false;
                    });
                  } else {
                    this.$message.error(res.err.msg);
                  }
                })
                .catch((e) => {
                  this.loading = false;
                });
            } else if (this.confirmType == 2) {
              //提交编辑用户
              updateUser(this.userForm)
                .then((res) => {
                  this.editLoading = false;
                  this.showUser = false;
                  if (res.success) {
                    this.loading = true;
                    this.$message.info(res.err.msg);              
                    getAllUser().then((res) => {
                      this.tableData = res.data.searchUsers;
                      this.roleOptions = res.data.roles;
                      this.loading = false;
                    });
                  } else {
                    this.$message.error(res.err.msg);
                  }
                })
                .catch((e) => {
                  this.loading = false;
                });
            } else if (this.confirmType == 3) {
              //提交搜索用户
              searchUser(this.userForm)
                .then((res) => {
                  console.log(res);
                  this.editLoading = false;
                  this.showUser = false;
                  if (res.success) {
                    this.loading = true;
                    this.tableData = res.data.searchUsers;
                    this.roleOptions = res.data.roles;
                    this.loading = false;
                    this.$message.info(res.err.msg);
                  } else {
                    this.$message.error(res.err.msg);
                  }
                })
                .catch((e) => {
                  this.loading = false;
                });
            } else {
              this.$message.error("提交失败");
            }
          }
        });
    },
  },
  mounted: function () {
    getAllUser().then((res) => {
      console.log(res);
      this.tableData = res.data.searchUsers;
      this.roleOptions = res.data.roles;
      this.loading = false;
    });
  },
};
</script>