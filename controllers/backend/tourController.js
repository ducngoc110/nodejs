var tour_controller = {
    get_manage: (req, res, next) => {
        res.render('backend/tour/manage', {
            actionTab: 'tour-manage',
        });
    },
    get_add: (req, res, next) => {
        res.render('backend/tour/add',{
            actionTab: 'tour-add',
        });
    },
    get_edit: (req, res, next) => {
    },
    post_add: (req, res, next) => {
    },
    post_manage_search:(req, res, next) => {
    }
}

module.exports = tour_controller;
