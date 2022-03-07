const router = require('koa-router')();
const newsController = require('../../controller/newsController');
router.prefix('/api/news');
router.get('/getNewsByTypeNum/:newsTypeId/:newsNum', newsController.getNewsByTypeNum);
// router.post('/news', newsController.addNews);
// router.delete('/news/:newsId', newsController.deleteNews);
// router.put('/news/:newsId', newsController.updateNews);

module.exports = router;