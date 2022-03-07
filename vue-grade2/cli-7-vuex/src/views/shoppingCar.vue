<template>
  <div>
    <table>
        <thead>
            <tr>
                <th></th>
                <th>书籍名称</th>
                <th>出版日期</th>
                <th>价格</th>
                <th>购买数量</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(book, index) in books">
                <td>{{book.id}}</td>
                <td>{{book.name}}</td>
                <td>{{book.date}}</td>
                <td>{{'￥' + book.price}}</td>
                <td>
                    <button @click="sub(index); getAllPrice()" :disabled="book.count <= 0">-</button>
                        {{book.count}}
                    <button @click="add(index); getAllPrice()">+</button>
                </td>
            </tr>
        </tbody>
    </table>
    <h1>总价格：{{'￥' + AllPrice}}</h1>
    </div>
</template>

<script>
    import {mapMutations} from "vuex";
    import {mapState} from "vuex";

    export default {
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            ...mapMutations("account", ["add", "sub", "getAllPrice"])
        },
        computed: {
            ...mapState("account", ["books", "AllPrice"])
        }
    }
</script>

<style>
    table {
        margin: 0 auto;
        border: 1px solid #e9e9e9;
        border-collapse: collapse;
        border-spacing: 0;
    }

    th, td {
        padding: 8px 16px;
        border: 1px solid #e9e9e9;
        text-align: center;
    }

    th {
        background-color: #f7f7f7;
        color: #5c6b77;
        font-weight: 600;
    }
</style>