const router = require('koa-router')();
const newsController = require('../../webController/newsController');
router.prefix('/api/news');
router.get('/getNewsByTypeNum/:newsTypeId/:newsNum', newsController.getNewsByTypeNum);
router.get('/getAllNews', newsController.getAllNews);
router.post('/addNew', newsController.addNew);
router.delete('/deleteNew/:id', newsController.deleteNew);
router.put('/updateNew', newsController.updateNew);

module.exports = router;