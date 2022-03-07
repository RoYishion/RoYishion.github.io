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
        label="新闻id"
        width="300"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="news_title"
        label="新闻标题"
        width="300"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="news_content"
        label="新闻内容"
        width="300"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="news_date"
        label="新闻时间"
        width="300"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="news_type.newsTypeName"
        label="新闻类型"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="user.createNewsUser"
        label="新闻作者"
        width="200"
        align="center"
      ></el-table-column>

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="info" size="mini" @click="updateNew(scope.row)"
            >编辑</el-button
          >
          <el-button
            prop="id"
            @click="deleteNew(scope.row)"
            type="danger"
            size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-button type="primary" icon="el-icon-edit" @click="addNew">
      添加新闻
    </el-button>

    <el-dialog
      :title="showTitle"
      :visible.sync="showNew"
      width="40%"
      :before-close="handleClose"
    >
      <el-form :model="newsForm" ref="forms" :rules="rules">
        <el-form-item
          label="新闻标题"
          prop="news_title"
          :label-width="formLabelWidth"
        >
          <el-input v-model="newsForm.news_title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="新闻内容"
          prop="news_content"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="newsForm.news_content"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="新闻时间"
          prop="news_date_obj"
          :label-width="formLabelWidth"
        >
          <el-date-picker
            v-model="newsForm.news_date_obj"
            type="date"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item
          label="新闻类型"
          prop="news_type"
          :label-width="formLabelWidth"
        >
          <el-select v-model="newsForm.news_type_id" placeholder="请选择">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="新闻作者"
          prop="createNewsUser"
          :label-width="formLabelWidth"
        >
          <el-select v-model="newsForm.userId" placeholder="请选择">
            <el-option
              v-for="item in userOptions"
              :key="item.value"
              :label="item.username"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showNew = false">取消</el-button>
        <el-button type="primary" @click="confirmNews" :loading="editLoading"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllNews, addNew, deleteNew, updateNew } from "@/services/news";

export default {
  data() {
    return {
      tableData: [],
      loading: true,
      formLabelWidth: "100px",
      showNew: false,
      editLoading: false,
      showTitle: "",
      confirmType: "",
      newsForm: {
        news_title: "",
        news_content: "",
        news_date_obj: "",
        news_type_id: "",
        userId: "",
      },
      rules: {
        news_title: [
          { required: true, message: "新闻标题不能为空", trigger: "blur" },
        ],
        news_content: [
          { required: true, message: "新闻内容不能为空", trigger: "blur" },
        ],
        news_date_obj: [
          { required: true, message: "新闻时间不能为空", trigger: "blur" },
        ],
        news_type_id: [
          { required: true, message: "新闻类型不能为空", trigger: "blur" },
        ],
        userId: [
          { required: true, message: "新闻作者不能为空", trigger: "blur " },
        ],
      },
      userOptions: [],
      typeOptions: [],
      idDisabled: false,
    };
  },

  methods: {
    // 删除新闻
    deleteNew(row) {
      deleteNew(row.id).then((res) => {
        console.log(res);
        if (res.success) {
          this.loading = true;
          this.$message.info(res.err.msg);
          getAllNews().then((res) => {
            for (let i of res.data.result) {
              i.news_date_obj = new Date(parseInt(i.news_date));
              i.news_date =
                i.news_date.getFullYear() +
                "年" +
                (i.news_date.getMonth() + 1) +
                "月" +
                i.news_date.getDate() +
                "日";
            }
            this.tableData = res.data.result;
            this.userOptions = res.data.users;
            this.typeOptions = res.data.types;
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
    // 打开编辑新闻的弹窗
    updateNew(newsItem) {
      this.showTitle = "编辑新闻";
      this.showNew = true;
      console.log(newsItem);
      this.newsForm.id = newsItem.id;
      this.newsForm.news_title = newsItem.news_title;
      this.newsForm.news_content = newsItem.news_content;
      this.newsForm.news_date = newsItem.news_date;
      this.newsForm.news_type_id = newsItem.news_type_id;
      this.newsForm.userId = newsItem.userId;
      this.confirmType = 2;
      this.idDisabled = true;
    },
    // 打开添加新闻的弹窗
    addNew() {
      this.showTitle = "新增新闻";
      this.showNew = true;
      this.newsForm.news_title = "";
      this.newsForm.news_content = "";
      this.newsForm.news_date_obj = new Date();
      this.newsForm.news_type_id = "";
      this.newsForm.userId = "";
      this.confirmType = 1;
      this.idDisabled = false;
    },
    // 确认提交, 编辑和新增通过confirmType区分
    confirmNews() {
      this.$refs["forms"] // 拿到表单输入的信息
        .validate((valid) => {
          // 检查表单，验证是否正确
          if (valid) {
            // 正确
            this.editLoading = true;
            if (this.confirmType == 1) {
              // 提交新增新闻
              let data = {
                ...this.newsForm,
              };
              data.news_date = data.news_date_obj.getTime().toString();
              console.log(data.news_date);
              addNew(data)
                .then((res) => {
                  console.log(res);
                  this.editLoading = false;
                  this.showNew = false;
                  if (res.success) {
                    this.loading = true;
                    this.$message.info(res.err.msg);
                    getAllNews().then((res) => {
                      for (let i of res.data.result) {
                        i.news_date_obj = new Date(parseInt(i.news_date));
                        i.news_date =
                          i.news_date_obj.getFullYear() +
                          "年" +
                          (i.news_date_obj.getMonth() + 1) +
                          "月" +
                          i.news_date_obj.getDate() +
                          "日";
                      }
                      this.tableData = res.data.result;
                      this.userOptions = res.data.users;
                      this.typeOptions = res.data.types;
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
              let data = {
                ...this.newsForm,
              };
              data.news_date = data.news_date_obj.getTime().toString();
              //提交编辑新闻
              updateNew(data)
                .then((res) => {
                  console.log(res);
                  this.editLoading = false;
                  this.showNew = false;
                  if (res.success) {
                    this.loading = true;
                    this.$message.info(res.err.msg);
                    getAllNews().then((res) => {
                      for (let i of res.data.result) {
                        i.news_date_obj = new Date(parseInt(i.news_date));
                        i.news_date =
                          i.news_date_obj.getFullYear() +
                          "年" +
                          (i.news_date_obj.getMonth() + 1) +
                          "月" +
                          i.news_date_obj.getDate() +
                          "日";
                      }
                      this.tableData = res.data.result;
                      this.userOptions = res.data.users;
                      this.typeOptions = res.data.types;
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
    getAllNews().then((res) => {
      console.log(res);
      for (let i of res.data.result) {
        i.news_date_obj = new Date(parseInt(i.news_date));
        console.log(i.news_date);
        i.news_date =
          i.news_date_obj.getFullYear() +
          "年" +
          (i.news_date_obj.getMonth() + 1) +
          "月" +
          i.news_date_obj.getDate() +
          "日";
      }
      this.tableData = res.data.result;
      this.userOptions = res.data.users;
      this.typeOptions = res.data.types;
      this.loading = false;
    });
  },
};
</script>