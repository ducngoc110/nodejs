var express = require('express');
var router = express.Router();

/* Require controllers module. */
var user_controller = require('../../controllers/backend/userController');

/* GET users listing. */
router.get('/user-manage', user_controller.manage);
router.get('/user-add', user_controller.add);

module.exports = router;
