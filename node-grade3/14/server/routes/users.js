const router = require('koa-router')();
const userController = require('../controller/userController');

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

// 增
router.get('/addUser', userController.addUser);
router.post('/saveUser', userController.saveUser);

// 删
router.get('/opendeleteUser', userController.deleteUser);

// 改
router.get('/openUpdateUser', userController.openUpdateUser);
router.post('/updateUser', userController.updateUser);
router.post('/defaultPassworded', userController.defaultPassword);

// 查
router.post('/searchUser', userController.searchUser);

module.exports = router;