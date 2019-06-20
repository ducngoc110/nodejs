
var settings = require('../../config/settings');
var User = require('../../models/user');

var user_controller = {
    get_manage: (req, res, next) => {
        User.find(function (err, users) {
            res.render('backend/user/manage', {
                pageTitle: 'Management user',
                actionTab: 'user-manage',
                users
            });
        });
    },
    get_add: (req, res, next) => {
        let errors = req.flash('error');
        res.render('backend/user/add', {
            pageTitle: 'Create user',
            actionTab: 'user-add',
            errors,
            hasErros: errors.length > 0
        });
    },
    get_edit: (req, res, next) => {
        let id = req.params.id;
        if (id) {
            User.findOne({
                '_id': id
            }, (err, user) => {
                if (err) {
                    res.redirect('/user-manage');
                } else {
                    if (user) {
                        let errors = req.flash('error');
                        let success = req.flash('success');
                        res.render('backend/user/add', {
                            pageTitle: 'Edit user',
                            errors,
                            hasErros: errors.length > 0,
                            success ,
						    hasSuccess: success.length > 0,
                            user,
                            actionTab: 'user-add'
                        });
                    }
                }
            });
        }
    },
    post_add: (req, res, next) => {
        req.checkBody('email', 'Email address invalid, please check again').isEmail();
        req.checkBody('password', 'Password invalid, password must be at least ' + settings.passwordLength + ' characters or more').isLength({ min: settings.passwordLength });
        req.checkBody('password_cf', 'Confirm password is not the same, please check again').equals(req.body.password);

        var errors = req.validationErrors();
        var id = req.body._id;
        if (errors) {
            let messages = new Set();
            errors.forEach((error) => {
                messages.add(error.msg);
            });
            req.flash('error', [...messages]);
            if (id) {
                res.redirect('/user-edit/' + id);
            } else {
                res.redirect('/user-add');
            }
        } else {
            if (id) {
                User.findById(id, (err, user) => {
                    if (err) {
                        req.flash('error', '404 Error, please again');
                        return res.redirect('/user-edit/' + id);
                    }
                    user.email = req.body.email;
                    user.status = (req.body.status) ? req.body.status : 'off';
                    user.roles = req.body.roles;
                    user.meta.name = req.body.name;
                    user.meta.avatar = (req.file) ? req.file.filename : '';
                    user.meta.birthday = req.body.birthday;
                    user.meta.more = req.body.more;
                    if (req.body.password !== user.password) {
                        user.password = user.encryptPassword(req.body.password);
                    }
                    user.save();
                    req.flash('success', 'Updated user successfully!');
                    res.redirect('/user-edit/' + id);
                });
            } else {
                User.findOne({
                    'email': req.body.email
                }, (err, user) => {
                    if (err) {
                        req.flash('error', '404 Error, please again');
                        res.redirect('/user-add');
                    }
                    if (user) {
                        req.flash('error', 'Email address used, please enter another');
                        res.redirect('/user-add');
                    } else {
                        var newUser = new User();
                        newUser.email = req.body.email;
                        newUser.password = newUser.encryptPassword(req.body.password);
                        newUser.status = (req.body.status) ? req.body.status : 'off';
                        newUser.roles = req.body.roles;
                        newUser.meta.name = req.body.name;
                        newUser.meta.avatar = (req.file) ? req.file.filename : '';
                        newUser.meta.birthday = req.body.birthday;
                        newUser.meta.more = req.body.more;
                        newUser.save((err, result) => {
                            if (err) {
                                req.flash('error', '404 Error, please again');
                                res.redirect('/user-add');
                            } else {
                                req.flash('success', 'Created user successfully!');
                                res.redirect('/user-edit/' + result._id);
                            }
                        });
                    }
                });
            }
        }
    },
    post_manage_search:(req, res, next) => {
        let input = req.body.input;
        let data = {};
        input = new RegExp(input, "i");
        data = { email : input };

        User.find(data, (err, users) => {
            if (users) {
                res.render('backend/user/manage-js',
                    { layout: false, users },
                    (err, html) => res.json(html)
                );
            }
        });
    }
}

module.exports = user_controller;
