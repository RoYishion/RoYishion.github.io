var http = require('http');  // 获取http模块
var fs = require('fs');  // 获取fs模块
var querystring = require('querystring');  // 获取querystring模块，对http请求所带的数据进行解析
const users = new Map([["tom", "123456"], ["jack", "654321"]])  // Map可以接受多个数组作为参数，赋值给users

var server = http.createServer();  // 创建服务器
server.listen(3000, function() {
  console.log('Server running at http://127.0.0.1:3000/');
});

var handRequest = function(req, res) {
  var url = req.url;  // 接受请求的url
  if(url == '/') {
    res.writeHeader(200, {  // 向请求的客户端发送响应头，说明响应类型为html
      'content-type': 'text/html'  // 可识别html
    });
    fs.readFile('index.html', 'utf8', function(err, data) {  // 通过fs.readFile模块读取index.html文件（异步）
      if(err) {
        throw err;
      }
      res.end(data);
    });
  }
  else if(url == '/login') {
    res.writeHeader(200, {  // 向请求的客户端发送响应头，说明响应类型为html
      'content-type': 'text/html'
    });
    fs.readFile('login.html', 'utf8', function(err, data) {  // 通过fs.readFile模块读取login.html文件（异步）
      if(err) {
        throw err;
      }
      res.end(data);
    });
  }
  else if(url == '/checklogin') {
    var body = '';
    req.on("data", function(data) {  // 接收客户端发送的数据
      body += data;  // 把接收到的data赋值给body
    })
    req.on("end", function() {  // 读取完客户端发送的数据后，产生end事件，执行function
      let userdata = querystring.parse(body);  // 解析body并赋给userdata
      console.log("username:" + userdata.username + "password:" + userdata.password);
      let userps = users.get(userdata.username);  // 获取users里面数组的键值对的值
      let content = fs.readFileSync("loginstatus.html");  // 通过fs.readFileSync模块读取loginstatus.html文件（同步）
      if(userps && (userps == userdata.password)) {
        console.log("验证通过");
        content = content.toString().replace("{{loginstatus}}", userdata.username + "已登录");
        // 用userdata.username + "已登录"替换loginstatus
      } else {
          console.log("账号密码错误");
          content = content.toString().replace("{{loginstatus}}", "账号密码错误");
          // 用"账号密码错误"替换loginstatus
      }
      res.end(content);
    })
  } else {
    res.writeHeader(404, {  // 向请求的客户端发送响应头，说明响应类型为html
      'content-type': 'text/html;charset="utf-8"'
    });
    res.write("没有该路径可以访问");
    res.end();
  }
};

server.on('request', handRequest)