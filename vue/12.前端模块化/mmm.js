// 1.导入的对象中定义的变量
import {flag, Person, sum} from './aaa.js';

if (flag) {
    console.log('小明');
    console.log(sum(20,30));
}

// 2.直接导入export定义的变量
import {num, height} from './aaa.js';

console.log(num);
console.log(height);

// 3.导入export的function
import {mul} from './aaa.js';

console.log(mul(30,50));

const p = new Person();
p.run()

// 4.导入export default里的内容
// import addr from './aaa.js';
// console.log(addr);

import arg from './aaa.js';
arg('Hello');

// 5.统一全部导入
// import {flag, num, sum, height, mul, Person, arg} from './aaa.js'

import * as aaa from './aaa.js'

console.log(aaa.flag);
console.log(aaa.height);