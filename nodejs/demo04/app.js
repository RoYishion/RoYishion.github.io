/*
1、https://www.npmjs.com/package/silly-datetime  查找包
2、npm install silly-datetime --save
   npm install md5 --save
3、var sd = require('silly-datetime');
4、指定包的版本（非常重要）
    npm install node-media-server@2.1.0 --save
    npm install jquery@1.8.0
5、 npm i 表示 如果删掉node_modules可以通过此命令找到 package.json对应的所有的包信息
*/

var sd = require('silly-datetime');
var md5 = require('md5');
var d = sd.format(new Date(), 'YYYY-MM-DD HH:mm');

console.log(d);
console.log(md5('123456'));