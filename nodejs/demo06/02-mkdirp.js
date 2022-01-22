// 创建多级目录
var mkdirp = require('mkdirp');

// mkdirp('./upload', function(err) {
//   if(err) {
//     console.error(err);
//   }    
// });

// mkdirp('./uploadDir');

mkdirp('./upload/aaa/xxxx', function(err) {
  if(err) {
    console.error(err);
  }    
});