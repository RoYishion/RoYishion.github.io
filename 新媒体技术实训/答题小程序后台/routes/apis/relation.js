const router = require('koa-router')();
const relationsController = require('../../webController/relationsController');
const oauthCheck = require('../../middleware/oauthCheck');

router.prefix('/api/relation');

router.all('*', oauthCheck.apiJwtCheck);

router.get('/getAllRelations/:id', relationsController.getAllRelations);
router.post('/addRelation', relationsController.addRelation);
router.delete('/deleteRelation/:id', relationsController.deleteRelation);

module.exports = router;