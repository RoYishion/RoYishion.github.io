var name = '小明';
var age = 18;
var flag = true;

function sum(num1, num2) {
    return num1 + num2;
}

if (flag) {
    console.log(sum(20, 30));
}

// 1.导出方式一
export {
    flag, sum
}

// 2.导出方式二
export var num = 1000;
export var height = 1.8;

// 3.导出函数/类
export function mul(num1, num2) {
    return num1 + num2
}

export class Person{
    run() {
        console.log('奔跑');
    }
}

// 5.export default  这种导出方式，可以让别的模块导入的时候重命名，且同一个模块只能有一个export default

// const address = '广州';
// export default address

export default function(argument) {
    console.log(argument);
}