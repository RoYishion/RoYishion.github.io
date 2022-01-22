const http =require('http');

const tools = require('./module/tools');
console.log(tools);
//http://www.itying.com/api/plist

// function formatApi(api){
//     return "http://www.itying.com/"+api;
// }
// 把这个函数封装到modules/tools里

http.createServer((req,res)=>{
    res.writeHead(200,{"Content-type":"text/html;charset='utf-8'"});
    res.write("<head> <meta charset='UTF-8'></head>");
    res.write('你好 nodejs<br>');
    var api = tools.formatApi('api/plist亚拉索');
    res.write(api);  
    res.end();
}).listen(3000);