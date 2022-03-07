<template>
  <div>
    <el-button type="primary" icon="el-icon-edit" @click="addUser">
      添加用户
    </el-button>
    <el-table v-loading="loading" :data="tableData" border style="width: 100%">
      <el-table-column prop="userId" label="用户id" width="300" align="center">
      </el-table-column>
      <el-table-column prop="userName" label="姓名" width="300" align="center">
      </el-table-column>
      <el-table-column prop="userNo" label="学号" width="300" align="center">
      </el-table-column>
      <el-table-column prop="userRole" label="角色" width="200" align="center">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="info" size="mini" @click="editUser(scope.row)">
            编辑
          </el-button>
          <el-button
            @click.native.prevent="deleteUser(scope.row.userId, scope.$index, tableData)"
            type="danger"
            size="mini">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="showTitle"
      :visible.sync="showUser"
      width="40%"
      :before-close="handleClose">
      <el-form :model="userForm" ref="forms" :rules="rules">
        <el-form-item
          label="用户id"
          prop="userId"
          :label-width="formLabelWidth">
          <el-input
            v-model="userForm.userId"
            autocomplete="off"
            :disabled="userIdDisabled">
          </el-input>
        </el-form-item>
        <el-form-item
          label="姓名"
          prop="userName"
          :label-width="formLabelWidth">
          <el-input v-model="userForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="学号"
          prop="userNo"
          :label-width="formLabelWidth">
          <el-input v-model="userForm.userNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="角色"
          prop="userRole"
          :label-width="formLabelWidth">
          <el-select v-model="userForm.userRole" placeholder="请选择">
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
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
import {getAllUser, addUser, editUser, deleteUser} from "@/services/user"
import Cookies from 'js-cookie'

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
        userId: "",
        userNo: "",
        userName: "",
        userRole: "",
      },
      rules: {
        userId: [{required: true, message: "用户id不能为空", trigger: "blur"}],
        userName: [{required: true, message: "姓名不能为空", trigger: "blur"}],
        userNo: [{required: true, message: "学号不能为空", trigger: "blur"}],
        userRole: [{required: true, message: "角色不能为空", trigger: "blur "}]
      },
      roleOptions: [
        {
          value: "admin",
          label: "admin"
        },
        {
          value: "user",
          label: "user"
        },
      ],
      userIdDisabled: false
    };
  },

  methods: {
    // 删除用户
    // 根据业务需求完成自己的删除操作
    // this.$message.info("写此方法时，不能把自己给删了!!!");
    deleteUser(userId, index) {
      let userId2 = Cookies.get("userId");
      if(this.tableData[index].userId == userId2) {
        this.$message.info("删除失败，不能删除自己");
      } else {
          this.$confirm("确认删除?")
          .then((_) => {
            this.loading = true;
            deleteUser({userId, index})
              .then((res) => {
                this.loading = false;
                if (res.success) {
                  this.loading = true;
                  this.$message.info(res.err.msg);
                  getAllUser().then((res) => {
                    this.tableData = res.data.allUserList;
                    this.loading = false;
                  });
                } else {
                  this.$message.error(res.err.msg);
                }
              })
              .catch((e) => {
                this.loading = false;
              });
          })
          .catch((_) => {});
      }
    },
    // 关闭弹窗
    handleClose(done) {
      this.$confirm("确认关闭?")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // 打开编辑用户的弹窗
    editUser(userItem) {
      this.showTitle = "编辑用户";
      this.showUser = true;
      this.userForm.userId = userItem.userId;
      this.userForm.userNo = userItem.userNo;
      this.userForm.userName = userItem.userName;
      this.userForm.userRole = userItem.userRole;
      this.confirmType = 2;
      this.userIdDisabled = true;
    },
    // 打开添加用户的弹窗
    addUser() {
      this.showTitle = "新增用户";
      this.showUser = true;
      this.userForm.userId = "";
      this.userForm.userNo = "";
      this.userForm.userName = "";
      this.userForm.userRole = "";
      this.confirmType = 1;
      this.userIdDisabled = false;
    },
    // 确认提交, 编辑和新增通过confirmType区分
    confirmUser() {
      this.$refs["forms"]  // 拿到表单输入的信息
      .validate((valid) => {  // 检查表单，验证是否正确
        if (valid) {  // 正确
          this.editLoading = true;
          if (this.confirmType == 1) {
            // 提交新增用户
            addUser(this.userForm)
              .then((res) => {
                this.editLoading = false;
                this.showUser = false;
                if (res.success) {
                  this.loading = true;
                  this.$message.info(res.err.msg);
                  getAllUser().then((res) => {
                    this.tableData = res.data.allUserList;
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
            editUser(this.userForm)
              .then((res) => {
                this.editLoading = false;
                this.showUser = false;
                if (res.success) {
                  this.loading = true;
                  this.$message.info(res.err.msg);
                  getAllUser().then((res) => {
                    this.tableData = res.data.allUserList;
                    this.loading = false;
                  });
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
  mounted: function() {
    console.log("获取用户列表");
    getAllUser().then((res) => {
      this.tableData = res.data.allUserList;
      this.loading = false;
    });
  },
};
</script>