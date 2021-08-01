import Vue from 'vue'
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex)

//2.创建对象
const store = new Vuex.Store({
    state: {
        counter: 1000
    },
    mutations: {  //定义方法
        increment(state) {  //会自动拿到上面的state对象
            state.counter ++
        },
        decrement(state) {
            state.counter --
        },
        addCount(state, count) {
            return state.counter += count
        }
    },
    actions: {  //用于异步操作（例如发送网络请求）

    },
    getters: {  //定义方法
        powerCounter(state) {
            return state.counter * state.counter
        }
    },
    modules: {

    }
})

//3.导出
export default store