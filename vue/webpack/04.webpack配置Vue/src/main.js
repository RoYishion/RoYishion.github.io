// 1.使用commonjs的模块化规范
const {add, mul} = require('./js/mathUtil.js')

console.log(add(20, 30));
console.log(mul(20, 30));

// 2.使用ES6的模块化规范
import {name, age, height} from './js/info.js';

console.log(name);
console.log(age);
console.log(height);

// 3.依赖css文件
require('./css/normal.css')

// 4.依赖less文件
require('./css/special.less')
document.writeln('<h2>你好</h2>')


// 5.使用Vue进行开发
import Vue from 'vue'

import App from './vue/App.vue'

new Vue({           //把里面的数据通过template抽离出来。并放入单独的App.vue文件里
    el: '#app',
    // template: `
    //     <div>
    //         <h2>{{message}}</h2>
    //         <button @click="btnClick">按钮</button>
    //         <h2>{{name}}</h2>
    //     </div>
    // `,
    template: '<App/>',
    // data: {
    //     message: 'Hello Webpack',
    //     name: 'RoYishion'
    // },
    // methods: {
    //     btnClick() {

    //     }
    // }
    components: {
        App
    }
})