const router = require('koa-router')();
const rolesController = require('../../webController/rolesController');
const oauthCheck = require('../../middleware/oauthCheck');

router.prefix('/api/role/');

router.all('*', oauthCheck.apiJwtCheck);

router.post('/saveRole', rolesController.addRole);
router.delete('/deleteRole/:id', rolesController.deleteRole);
router.post('/updateRole', rolesController.updateRole);
router.get('/getAllRoles', rolesController.getAllRoles);

module.exports = router;