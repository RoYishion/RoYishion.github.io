var http = require('http');  // 获取http模块
var fs = require('fs');  // 获取fs模块
var querystring = require('querystring'); 
const hostname = '127.0.0.1';
const port = 3010;
var documentRoot = './';

var server = http.createServer();  // 创建服务器
server.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});

var handRequest = function (req, res) {
  let urlname = req.url;  // 接受请求的url
  if (urlname == '/') {
    if (req.method == 'GET') {
      res.writeHeader(200, {  // 向请求的客户端发送响应头，说明响应类型为html
        'content-type': 'text/html'  // 可识别html
      });
      let data = fs.readFileSync('index.html', 'utf8')  // 通过fs.readFileSync模块读取index.html文件（同步）
      res.write(data);
      fs.readdir(documentRoot, function (err, files) {
        if (err) {
          console.log('files err');
          res.write('<h1>文件读取错误</h1>');
          res.end();
        } else {
          for (let i = 0; i < files.length; i++) {
            res.write(files[i]);
            res.write('<br>');
          }
          res.write('</body></html>');
          res.end();
        }
      });
    } else {
      var body = '';
      req.on("data", function (data) {  // 接收客户端发送的数据
        console.log(data)
        body += data;  // 把接收到的data赋值给body
      })
      req.on("end", function () {  // 读取完客户端发送的数据后，产生end事件，执行function
        let pathObj = querystring.parse(body);
        let path = pathObj.filename;
        console.log("filename:" + path);
        fs.stat(path, (err, data) => {  // 通过fs.stat检测是否存在path文件夹，如果不存在，则使用fs.mkdir创建path文件夹
          if (err) {
            fs.mkdir(path, (err) => {
              if (err) {
                console.log(err);
                return;
              }
            });
            return;
          }
          if (data.isDirectory()) {
            console.log(path + '目录存在');
          } else {
            if (!err) {
              fs.mkdir(path, (err) => {
                if (err) {
                  console.log(err);
                  return;
                }
              });
            } else {
              console.log('请检测传入的数据是否正确');
            }
          }
        })
      })
    }
  } else {
    res.writeHeader(404, {
      'content-type': 'text/html;charset="utf-8"'
    });
    res.write('没有该路径可以访问');
    res.end();
  }
};

server.on('request', handRequest)