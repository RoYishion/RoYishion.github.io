<template>
    <div>
        <el-row class="tac">
            <el-col :span="2">
                <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo">
                        <el-menu-item index="1">
                            <el-button @click="MyBooks" size="large" type="primary" icon="el-icon-reading">我的书籍</el-button>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <el-button @click="MyAddress" size="large" type="primary" icon="el-icon-s-home">我的地址</el-button>
                        </el-menu-item>
                        <el-menu-item index="3" v-if="roles == 'admin'">
                            <el-button @click="ManageUsers" size="large" type="primary" icon="el-icon-user">用户管理</el-button>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <el-button @click="ShoppingCar" size="large" type="primary" icon="el-icon-goods">购物车篮</el-button>
                        </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
        <router-view></router-view>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: 'mine',
        data: function() {
            return {}
        },
        computed: {
            ...mapState('account', ['roles'])
        },
        methods: {
            MyBooks() {
                this.$router.push('/Mine/mybooks')
            },
            MyAddress() {
                this.$router.push('/Mine/myaddress')
            },
            ManageUsers() {
                this.$router.push('/Mine/ManageUsers')
            },
            ShoppingCar() {
                this.$router.push('/Mine/shoppingCar')
            }
        }
    }
</script>