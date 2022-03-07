<template>
    <div>
        <el-row>
            <el-col :span='2' :offset='18'>
                <el-link type="primary" @click="openLogin">登陆</el-link>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span='24'>
                <div class="block">
                    <span class="demonstration">My Index</span>
                    <el-carousel height="350px">
                        <el-carousel-item v-for="item in 4" :key="item">
                            <h3 class="small">{{item}}</h3>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </el-col>
        </el-row>

        <el-dialog title="登陆" :visible.sync="dialogFormVisible">
            <el-form :model="loginForm">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="loginForm.name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="loginForm.password" autocomplete="off" show-password></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="checkLogin()" :loading='loginLoding'>确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default({
        data() {
            return {
                loginForm: {
                    name: '',
                    password: ''
                },
                formLabelWidth: '120px',
                dialogFormVisible: false,
                loginLoding: false
            }
        },
        methods: {
            openLogin() {
                this.dialogFormVisible = true
            },
            checkLogin() {
                this.$message('loding')
                this.loginLoding = true
                setTimeout(() => {
                    if(this.loginForm.name == '123' && this.loginForm.password == '123') {
                        this.$router.push({
                            name: 'Mine'
                        })
                    }
                    else{
                        this.$message('密码错误');
                    }
                    this.loginLoding = false  //控制转圈圈
                }, 3000)
            }
        }
    })
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
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: goldenrod;
  }
</style>