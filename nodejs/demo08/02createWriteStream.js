const fs = require('fs');
var str = '';

for(var i=0;i<500;i++){
    str += '我是从数据库获取的数据，我要保存起来1111\n';
}

var writeStream = fs.createWriteStream('./data/output.txt');

writeStream.write(str);

//标记文件末尾
writeStream.end();  // 如果要监听写入完成（触发下面的finish事件），必须写上这行

writeStream.on('finish', () => {
    console.log('写入完成');
})