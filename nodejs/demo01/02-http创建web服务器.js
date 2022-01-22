const http = require('http');

http.createServer((req, res) => {
  console.log(req.url);  // 获取url 

  res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
  // 设置响应头，状态码200，文件类型是html，字符集是utf-8

  res.write('this is nodejs');
  res.write('这是 nodejs');

  res.end();  // 结束响应

}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');