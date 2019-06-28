var express = require('express');
var router = express.Router();

/* Require controllers module. */
var tour_controller = require('../../controllers/backend/tourController');

/* GET tour listing. */
router.get('/tour-manage', tour_controller.get_manage);
router.get('/tour-add', tour_controller.get_add);
router.get('/tour-edit/:id', tour_controller.get_edit);

/* POST tour action. */
router.post('/tour-add', tour_controller.post_add);
router.post('/tour-manage-search', tour_controller.post_manage_search);

module.exports = router;
