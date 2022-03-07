const router = require('koa-router')();
const indexController = require('../controller/indexController');
const oauthCheck = require('../middleware/oauthCheck');

router.get('/', indexController.index);
router.get('/login', indexController.login);
router.post('/checkLogin', indexController.checkLogin);

router.get('/home', oauthCheck.sessionCheck);
router.get('/home', indexController.home);
router.get('/fileView', indexController.fileView);
router.get('/logout', indexController.logout);

module.exports = router;