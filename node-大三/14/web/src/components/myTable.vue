<template>
    <div>
        <table>
            <thead>
                <th v-for="(value,key,index) in tableHead">{{value}}</th>
                <th>操作</th>
            </thead>
            <tbody>
                <tr v-for="(item,key1,index1) in tableBody">
                    <td v-for="(value2,key2,index2) in tableHead">
                        <input v-show="item.isEdit" v-model="item[key2]" />
                        <p v-show="!item.isEdit">{{item[key2]}}</p>
                    </td>
                    <td>
                        <slot name="item" :item="item">无操作</slot>
                    </td>
                </tr>
            </tbody>
            <div>
                <slot name="add">无操作</slot>
            </div>
        </table>
    </div>
</template>

<script>
export default {
  name: 'myTable',
  props: ['tableHead', 'tableBody']
}
</script>

<style scoped>
    table {
        margin: 0 auto;
        border: 1px solid #e9e9e9;
        border-collapse: collapse;
        border-spacing: 0;
    }

    td,th{
        padding: 8px 16px;
        border: 1px solid #e9e9e9;
        text-align: center;
    }

    tbody tr:hover{
        background-color: gray
    }
</style>