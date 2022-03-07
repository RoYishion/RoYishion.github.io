<template id="my-address">
    <div>
        <h2>地址列表</h2>
        <myTable
        v-bind:table-head="addressHead"
        v-bind:table-body="address"
        v-bind:new-add="newaddress"
        >
            <template v-slot:item="slotProps">
                <button type="button" @click="delAddress(slotProps.item)">删除</button>
                <button class="button-color1" @click="change(slotProps.item)" v-show="!slotProps.item.isEdit">编辑</button>
                <button class="button-color2" @click="change(slotProps.item)" v-show="slotProps.item.isEdit">完成</button>
            </template>

            <template v-slot:add="slotProps">
                <input type="text" v-model="newaddress.author" placeholder="请输入收货人">
                <input type="text" v-model="newaddress.address" placeholder="请输入地址">
                <input type="text" v-model="newaddress.phone" placeholder="请输入电话">
                <button @click="addAddress()">添加</button>
            </template>
        </myTable>
    </div>
</template>

<script>
import myTable from '../components/myTable'

export default {
    name: 'myaddress',
    data() {
        return {
            addressHead: {author:'收货人', address:'地址', phone:'电话'},
            newaddress: {
				id: 0,
                author: '',
				address: '',
				phone: '',
                isEdit: false
			},
            address: [{
                id: 1,
                author: '曹雪芹',
                address: '广东省广州市从化区经济开发区高技术产业园广从南路548号',
                phone: '138123456',
                isEdit: false
            }, {
                id: 2,
                author: '施耐庵',
                address: '广东省广州市从化区经济开发区高技术产业园广从南路548号',
                phone: '138123456',
                isEdit: false
            }, {
                id: 3,
                author: '罗贯中',
                address: '广东省广州市从化区经济开发区高技术产业园广从南路548号',
                phone: '138123456',
                isEdit: false
            }, {
                id: 4,
                author: '吴承恩',
                address: '广东省广州市从化区经济开发区高技术产业园广从南路548号',
                phone: '138123456',
                isEdit: false
            }]
        }
    },
    components:{
        myTable
    },
    methods: {
        delAddress(obj) {
            this.address.forEach((address, index) => {
                if(address.id == obj.id){
                    this.address.splice(index, 1)
                }
            });
        },
        change(obj) {
            this.address.forEach((address, index) => {
                if(address.id == obj.id){
                    this.address[index].isEdit=!this.address[index].isEdit
                }
            });
        },
        addAddress() {
            this.newaddress.id = this.address.length + 1;
            this.address.push(this.newaddress);
            this.newaddress = {
				id: 0,
                author: '',
				address: '',
				phone: '',
                isEdit: false
			};
        }
    }
}
</script>

<style>
    .button-color1 {
        color: red;
    }

    .button-color2 {
        color: blue;
    }
</style>