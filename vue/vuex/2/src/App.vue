<template>
    <div id="app">
        <h2>-----------App内容-----------</h2>
        <h2>{{message}}</h2>
        <h2>{{$store.state.counter}}</h2>
        <button @click="add">+</button>
        <button @click="sub">-</button>
        <button @click="addCount(5)">+5</button>

        <h2>-----------App内容：getters相关-----------</h2>
        <h2>{{$store.getters.powerCounter}}</h2>

        <h2>-----------HelloVuex内容-----------</h2>
        <hello-vuex/>
    </div>
</template>

<script>
    import HelloVuex from './components/HelloVuex'

    export default {
        name: 'App',
        data() {
            return {
                message: '我是App组件',
            }
        },
        components: {
            HelloVuex
        },
        methods: {
            add() {
                this.$store.commit('increment')  // 调用vuex里面mutations定义的increment方法
            },
            sub() {
                this.$store.commit('decrement')  // 调用vuex里面mutations定义的decrement方法
            },
            addCount(count) {
                this.$store.commit('addCount', count) // 调用方法的同时传递参数，参数被称为payload
            }
        }
    }
</script>