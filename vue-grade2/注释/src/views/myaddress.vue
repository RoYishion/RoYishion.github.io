<template>
  <div>
    <el-button type="primary" icon="el-icon-edit" @click="addAddress"
      >添加地址</el-button
    >
    <el-table v-loading="loading" :data="tableData" border style="width: 100%">
      <el-table-column
        fixed
        prop="name"
        label="姓名"
        width="120"
        align="center"
      >
      </el-table-column>

      <el-table-column prop="phone" label="电话" width="150" align="center">
      </el-table-column>

      <el-table-column prop="province" label="省份" width="120" align="center">
      </el-table-column>

      <el-table-column prop="city" label="地区" width="120" align="center">
      </el-table-column>

      <el-table-column prop="address" label="地址" width="300" align="center">
      </el-table-column>

      <el-table-column prop="zip" label="邮编" width="120" align="center">
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="info" size="mini" @click="editAddress(scope.row)"
            >编辑</el-button
          >
          <el-button
            @click.native.prevent="
              deleteAddress(scope.row.addressId, scope.$index, tableData)
            "
            type="danger"
            size="mini"
          >
            删除
          </el-button>
        </template>
      </el-table-column>

      <el-table-column prop="addressId" label="地址id" v-if="false">
      </el-table-column>

      <el-table-column prop="userId" label="用户id" v-if="false">
      </el-table-column>
    </el-table>

    <el-dialog
      :title="showTitle"
      :visible.sync="showAddress"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="addressForm" ref="forms" :rules="rules">
        <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="addressForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="addressForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="省份"
          prop="province"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="addressForm.province"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="地区" prop="city" :label-width="formLabelWidth">
          <el-input v-model="addressForm.city" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address" :label-width="formLabelWidth">
          <el-input v-model="addressForm.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮编" prop="zip" :label-width="formLabelWidth">
          <el-input v-model="addressForm.zip" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAddress = false">取消</el-button>
        <el-button type="primary" @click="confirmAddress" :loading="editLoading"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserAddress,
  deleteUserAddress,
  addAddress,
  editAddress,
} from "@/services/user";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      tableData: [],//表格数据
      loading: true,
      formLabelWidth: "100px",
      showAddress: false,
      editLoading: false,
      showTitle: "",
      confirmType: "",//判断是修改还是新增
      addressForm: {//地址信息
        addressId: "",
        userId: "",
        phone: "",
        name: "",
        province: "",
        city: "",
        address: "",
        zip: "",
      },
      rules: {//表单校验规则
        phone: [
          { required: true, message: "联系电话不能为空", trigger: "blur" },
          { len: 11, message: "手机号应为11位", trigger: "blur" },
        ],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        province: [
          { required: true, message: "省份不能为空", trigger: "blur" },
        ],
        city: [{ required: true, message: "地区不能为空", trigger: "blur" }],
        address: [
          { required: true, message: "详细地址不能为空", trigger: "blur" },
        ],
        zip: [{ required: true, message: "区号不能为空", trigger: "blur" }],
      },
    };
  },

  methods: {
    // 删除地址
    deleteAddress(addressId, index, rows) {//传入参数，根据id和index删除当前行
      this.loading = true;
      deleteUserAddress({ addressId: addressId }).then((res) => {
        if (res.success) {//根据返回信息做出相应提示
          this.$message.info(res.err.msg);
          rows.splice(index, 1);
          this.loading = false;
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
    // 编辑地址
    editAddress(addressItem) {//编辑地址，将当前地址信息显示在弹窗中
      this.showTitle = "编辑地址";
      this.showAddress = true;
      this.addressForm.addressId = addressItem.addressId;
      this.addressForm.phone = addressItem.phone;
      this.addressForm.name = addressItem.name;
      this.addressForm.province = addressItem.province;
      this.addressForm.city = addressItem.city;
      this.addressForm.address = addressItem.address;
      this.addressForm.zip = addressItem.zip;
      this.confirmType = 2;
    },
    // 添加地址，清除添加地址form表单中的信息
    addAddress() {//打开弹窗，清空信息
      this.showTitle = "新增地址";
      this.showAddress = true;
      let userId = Cookies.get("userId");
      this.addressForm.userId = userId;
      this.addressForm.addressId = "";
      this.addressForm.phone = "";
      this.addressForm.name = "";
      this.addressForm.province = "";
      this.addressForm.city = "";
      this.addressForm.address = "";
      this.addressForm.zip = "";
      this.confirmType = 1;
    },
    // 确认提交
    confirmAddress() {//获取到地址信息，提交添加地址表单
      this.$refs["forms"].validate((valid) => {//表单校验是否符合规则
        if (valid) {
          console.log("确认提交地址");
          this.editLoading = true;
          let userId = Cookies.get("userId");//获取cookie中userId
          if (this.confirmType == 1) {
            // 提交新增地址
            addAddress(this.addressForm).then((res) => {//提交新增地址接口调用，返回mock数据
              this.editLoading = false;
              this.showAddress = false;
              if (res.success) {
                this.loading = true;
                this.$message.info(res.err.msg);
                getUserAddress({ userId: userId }).then((res) => {
                  this.tableData = res.data.userAddressList;
                  this.loading = false;
                });
              } else {
                this.$message.error(res.err.msg);
              }
            });
          } else if (this.confirmType == 2) {//编辑地址
            // 提交编辑地址
            editAddress(this.addressForm).then((res) => {//调用编辑地址接口，将地址参数传入该函数
              this.editLoading = false;
              this.showAddress = false;
              if (res.success) {
                this.loading = true;
                this.$message.info(res.err.msg);
                getUserAddress({ userId: userId }).then((res) => {
                  this.tableData = res.data.userAddressList;
                  this.loading = false;
                });
              } else {
                this.$message.error(res.err.msg);
              }
            });
          } else {
            this.$message.error("提交失败");
          }
        }
      });
    },
  },
  mounted: function() {
    let userId = Cookies.get("userId");//获取当前cookie中userId
    getUserAddress({ userId: userId }).then((res) => {//调用获取地址列表信息接口
      this.tableData = res.data.userAddressList;
      this.loading = false;
    });
  },
};
</script>
