var express = require('express');
var multer  = require("multer");
var mkdirp  = require('mkdirp');
var router = express.Router();

/* Require controllers module. */
var tour_controller = require('../../controllers/backend/tourController');
let pathTour = 'public/uploads/tour';

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		mkdirp(pathTour, (err) => {
			if (!err) {
				cb(null, pathTour)
			}
		});
	},
	filename: (req, file, cb) => cb(null, 'ATL-' + Date.now() + '-' + file.originalname )
});
var upload = multer({ storage: storage });

/* GET tour listing. */
router.get('/tour-manage', tour_controller.get_manage);
router.get('/tour-add', tour_controller.get_add);
router.get('/tour-edit/:id', tour_controller.get_edit);

/* POST tour action. */
var cpUpload = upload.fields([{ name: 'featured', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])

router.post('/tour-add', cpUpload, tour_controller.post_add);
router.post('/tour-manage-search', tour_controller.post_manage_search);
router.post('/tour-manage-remove', tour_controller.post_manage_remove);

module.exports = router;
