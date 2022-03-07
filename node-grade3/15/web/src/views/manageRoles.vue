<template>
  <div>
    <el-table
      v-loading="loading"
      :key="1"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="序号"
        width="300"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="rolename"
        label="角色名"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="role_id"
        label="角色id"
        width="300"
        align="center"
      ></el-table-column>

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            type="info"
            size="mini"
            @click="editRole(scope.row)"
            >编辑</el-button
          >
          <el-button
            prop="id"
            @click="deleteRole(scope.row)"
            type="danger"
            size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-button type="primary" icon="el-icon-edit" @click="addRole">
      添加角色
    </el-button>

    <el-dialog
      :title="showTitle"
      :visible.sync="showRole"
      width="40%"
      :before-close="handleClose"
    >
      <el-form :model="roleForm" ref="forms" :rules="rules">
        <el-form-item
          label="角色名"
          prop="rolename"
          :label-width="formLabelWidth"
        >
          <el-input v-model="roleForm.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="角色id"
          prop="role_id"
          :label-width="formLabelWidth"
        >
          <el-input v-model="roleForm.role_id" autocomplete="off"></el-input>
        </el-form-item>

        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showRole = false">取消</el-button>
        <el-button type="primary" @click="confirmRole" :loading="editLoading"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllRoles, addRole, updateRole, deleteRole } from "@/services/role";

export default {
  data() {
    return {
      tableData: [],
      loading: true,
      formLabelWidth: "100px",
      showRole: false,
      editLoading: false,
      showTitle: "",
      confirmType: "",
      roleForm: {
        rolename: "",
        role_id: ""
      },
      rules: {},
      idDisabled: false
    };
  },

  methods: {
    // 删除角色
    deleteRole(row) {
      deleteRole(row.id).then((res) => {
        console.log(res);
        if (res.success) {
          this.loading = true;
          this.$message.info(res.err.msg);
          getAllRoles().then((res) => {
            this.tableData = res.data.result;
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
    // 打开添加角色的弹窗
    addRole() {
      this.showTitle = "新增角色";
      this.showRole = true;
      this.roleForm.rolename = "";
      this.roleForm.role_id = "";
      this.confirmType = 1;
      this.idDisabled = false;
    },
    // 打开编辑角色的弹窗
    editRole(roleItem) {
      this.showTitle = "编辑角色";
      this.showRole = true;
      this.roleForm.id = roleItem.id;
      this.roleForm.rolename = roleItem.rolename;
      this.roleForm.role_id = roleItem.role_id;
      this.confirmType = 2;
      this.idDisabled = true;
    },
    // 确认提交, 编辑和新增通过confirmType区分
    confirmRole() {
      this.$refs["forms"] // 拿到表单输入的信息
        .validate((valid) => {
          // 检查表单，验证是否正确
          if (valid) {
            // 正确
            this.editLoading = true;
            if (this.confirmType == 1) {
              // 提交新增角色
              addRole(this.roleForm)
                .then((res) => {
                  console.log(res);
                  this.editLoading = false;
                  this.showRole = false;
                  if (res.success) {
                    this.loading = true;
                    this.$message.info(res.err.msg);
                    getAllRoles().then((res) => {
                      this.tableData = res.data.result;
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
              //提交编辑角色
              updateRole(this.roleForm)
                .then((res) => {
                  this.editLoading = false;
                  this.showRole = false;
                  if (res.success) {
                    this.loading = true;
                    this.$message.info(res.err.msg);
                    getAllRoles().then((res) => {
                      this.tableData = res.data.result;
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
  mounted: function () {
    getAllRoles().then((res) => {
      console.log(res);
      this.tableData = res.data.result;
      this.loading = false;
    });
  },
};
</script>