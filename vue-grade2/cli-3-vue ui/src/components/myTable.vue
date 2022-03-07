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
  props: ['tableHead', 'tableBody', 'newAdd']
}
</script>

<style scoped>
    table {
        width: 800px;
        border: 2px solid black;
        margin: 0 auto;
        border-collapse: separate;
        border-spacing: 0;
    }

    td,th{
        border: thin solid greenyellow;
        padding: 10px;
        text-align: center;
    }

    tbody tr:hover{
        background-color: yellow
    }
</style>