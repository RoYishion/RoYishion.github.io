const router = require('koa-router')();
const indexController = require('../controller/indexController');
const userController = require('../controller/userController');
const oauthCheck = require('../middleware/oauthCheck');

router.get('/', indexController.index);
router.get('/login', indexController.login);
router.post('/checkLogin', indexController.checkLogin);

router.get('/home', oauthCheck.sessionCheck);
router.get('/home', indexController.home);
router.get('/logout', indexController.logout);
router.get('/error', indexController.error);

router.get('/userManage', userController.userManage);

module.exports = router;