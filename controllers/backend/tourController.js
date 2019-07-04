var Tour = require('../../models/tour');
var tour_controller = {
    get_manage: (req, res, next) => {
        Tour.find(function (err, tours) {
            res.render('backend/tour/manage', {
                pageTitle: 'Management tour',
                actionTab: 'tour-manage',
                tours
            });
        });
    },
    get_add: (req, res, next) => {
        let errors = req.flash('error');
        res.render('backend/tour/add', {
            pageTitle: 'Create tour',
            actionTab: 'tour-add',
            errors,
            hasErros: errors.length > 0
        });
    },
    get_edit: (req, res, next) => {
        let id = req.params.id;
        if (id) {
            Tour.findOne({
                '_id': id
            }, (err, data) => {
                if (err) {
                    res.redirect('/tour-manage');
                } else {
                    if (data) {
                        let errors = req.flash('error');
                        // console.log(errors);
                        let success = req.flash('success');
                        let tour = {
                            _id: data._id,
                            name: data.name,
                            status: data.status,
                            age: data.age,
                            style: data.style,
                            destination: (data.destination) ? JSON.parse(data.destination) : '',
                            start: data.start,
                            name: data.name,
                            end: data.end,
                            day: data.day,
                            night: data.night,
                            pricebase: data.pricebase,
                            priceperson: data.priceperson,
                            meta: {
                                description: data.meta.description,
                                youtube: data.meta.youtube,
                                featured: data.meta.featured,
                                gallery: (data.meta.gallery) ? JSON.parse(data.meta.gallery) : '',
                                transport: (data.meta.transport) ? JSON.parse(data.meta.transport) : '',
                                highlight: (data.meta.highlight) ? JSON.parse(data.meta.highlight) : '',
                                itinerary: (data.meta.itinerary) ? JSON.parse(data.meta.itinerary) : '',
                                question: (data.meta.question) ? JSON.parse(data.meta.question) : '',
                                more: data.meta.more
                            }
                        }
                        res.render('backend/tour/add', {
                            pageTitle: 'Edit tour',
                            errors,
                            hasErros: errors.length > 0,
                            success,
                            hasSuccess: success.length > 0,
                            tour,
                            actionTab: 'tour-add'
                        });
                    }
                }
            });
        }
    },
    post_add: (req, res, next) => {
        let featured = req.body.featured_hidden;
        if (req.files['featured']) {
            if (req.files['featured'][0].filename) {
                featured = req.files['featured'][0].filename;
            }
        }

        let argsGallery = (req.body.gallery_hidden) ? req.body.gallery_hidden : new Array();
        if (req.files['gallery']) {
            req.files['gallery'].forEach((item) => {
                argsGallery.push(item.filename);
            });
        }

        var id = req.body._id;
        if (id) {
            Tour.findById(id, (err, tour) => {
                if (err) {
                    req.flash('error', '404 Error, please again');
                    res.redirect('/tour-manage');
                }
                tour.name = req.body.name;
                tour.status = (req.body.status) ? req.body.status : 'off';
                tour.age = req.body.age;
                tour.style = req.body.style;
                tour.destination = (req.body.destination) ? JSON.stringify(req.body.destination) : '';
                tour.start = req.body.start;
                tour.end = req.body.end;
                tour.day = req.body.day;
                tour.night = req.body.night;
                tour.pricebase = req.body.pricebase;
                tour.priceperson = req.body.priceperson;
                tour.meta.featured = featured;
                tour.meta.gallery = JSON.stringify(argsGallery);
                tour.meta.youtube = req.body.youtube;
                tour.meta.description = req.body.description;
                tour.meta.transport = (req.body.transport) ? JSON.stringify(req.body.transport) : '';
                tour.meta.highlight = (req.body.highlight) ? JSON.stringify(req.body.highlight) : '';
                tour.meta.itinerary = (req.body.itinerary) ? JSON.stringify(req.body.itinerary) : '';
                tour.meta.question = (req.body.question) ? JSON.stringify(req.body.question) : '';
                tour.meta.more = (req.body.more) ? req.body.more : '';
                tour.save();
                req.flash('success', 'Updated tour successfully!');
                res.redirect('/tour-edit/' + id);
            });
        } else {
            let item = {
                name: req.body.name,
                status: (req.body.status) ? req.body.status : 'off',
                age: req.body.age,
                style: req.body.style,
                destination: (req.body.destination) ? JSON.stringify(req.body.destination) : '',
                start: req.body.start,
                name: req.body.name,
                end: req.body.end,
                day: req.body.day,
                night: req.body.night,
                pricebase: req.body.pricebase,
                priceperson: req.body.priceperson,
                meta: {
                    description: req.body.description,
                    youtube: req.body.youtube,
                    featured: featured,
                    gallery: JSON.stringify(argsGallery),
                    transport: (req.body.transport) ? JSON.stringify(req.body.transport) : '',
                    highlight: (req.body.highlight) ? JSON.stringify(req.body.highlight) : '',
                    itinerary: (req.body.itinerary) ? JSON.stringify(req.body.itinerary) : '',
                    question: (req.body.question) ? JSON.stringify(req.body.question) : '',
                    more: (req.body.more) ? req.body.more : '',
                }
            }
            var data = new Tour(item);
            data.save((err, result) => {
                if (err) {
                    req.flash('error', 'Created tour failed!, please again');
                    res.redirect('/tour-add');
                } else {
                    req.flash('success', 'Created tour successfully!');
                    res.redirect('/tour-edit/' + result._id);
                }
            });
        }
    },
    post_manage_search: (req, res, next) => {
        let input = req.body.input;
        let data = {};
        input = new RegExp(input, "i");
        data = { name : input };

        Tour.find(data, (err, tours) => {
            if (tours) {
                res.render('backend/tour/manage-js',
                    { layout: false, tours },
                    (err, html) => res.json(html)
                );
            }
        });
    },

    post_manage_remove: (req, res, next) => {
        let status = true,
        id = req.body.id;
        Tour.findByIdAndRemove(id, (err) => {
            if (err) { status = false; }
            let data = { status };
            res.json(data);
        });
    },
}

module.exports = tour_controller;
