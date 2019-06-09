var express = require('express');
var router = express.Router();

/* Require controllers module. */
var home_controller = require('../../controllers/backend/homeController');

/* GET home page. */
router.get('/', home_controller.index);

module.exports = router;
