var express = require('express');
var multer  = require("multer");
var mkdirp  = require('mkdirp');
var router = express.Router();

/* Require controllers module. */
var user_controller = require('../../controllers/backend/userController');
let pathUser = 'public/uploads/user';

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		mkdirp(pathUser, (err) => {
			if (!err) {
				cb(null, pathUser)
			}
		});
	},
	filename: (req, file, cb) => cb(null, 'ATL-' + Date.now() + '-' + file.originalname )
});
var upload = multer({ storage: storage });
/* GET users listing. */
router.get('/user-manage', user_controller.get_manage);
router.get('/user-add', user_controller.get_add);
router.get('/user-edit/:id', user_controller.get_edit);

/* POST users action. */
router.post('/user-add', upload.single('chosse-avatar'), user_controller.post_add);
router.post('/user-manage-search', user_controller.post_manage_search);
router.post('/user-manage-remove', user_controller.post_manage_remove);
module.exports = router;
