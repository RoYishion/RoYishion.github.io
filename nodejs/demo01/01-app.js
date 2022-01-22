// 代码块：node-http-server
var http = require('http');  // 表示引入http模块

http.createServer(function (request, response) {  // request：获取url传过来的信息；response：给浏览器响应信息
  response.writeHead(200, {'Content-Type': 'text/plain'});  // 设置响应头
  response.end('Hello World');  // 表示给页面输出一句话并结束响应
}).listen(8081);  // 端口

console.log('Server running at http://127.0.0.1:8081/');