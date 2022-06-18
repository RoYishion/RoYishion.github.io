const router = require('koa-router')();
const scoreController = require('../../webController/scoreController');
const oauthCheck = require('../../middleware/oauthCheck');

router.prefix('/api/score');

router.all('*', oauthCheck.apiJwtCheck);

router.post('/saveScore', scoreController.addScore);
router.delete('/deleteScore/:username', scoreController.deleteScore);
router.post('/updateScore', scoreController.updateScore);
router.get('/getScoreList', scoreController.getScoreList);

module.exports = router;