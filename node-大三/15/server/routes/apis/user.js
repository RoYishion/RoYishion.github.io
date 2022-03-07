const router = require('koa-router')();
const userController = require('../../webController/userController');
const oauthCheck = require('../../middleware/oauthCheck');

router.prefix('/api/user');
router.post('/loginGetToken', userController.loginGetToken);

router.all('*', oauthCheck.apiJwtCheck);
router.get('/userInfo/:id', userController.getUserInfoById);

// 增
router.post('/saveUser', userController.saveUser);

// 删
router.delete('/deleteUser/:id', userController.deleteUser);

// 改
router.post('/updateUser', userController.updateUser);

// 查
router.post('/searchUser', userController.searchUser);

module.exports = router;