var user = {
    manage : (req, res, next) => {
        res.render('backend/user/manage', {
            pageTitle: 'Manage User',
            actionTab: 'user-manage'
        });
    },
    add : (req, res, next) => {
        res.render('backend/user/add', { 
            pageTitle: 'Create User',
            actionTab: 'user-add'
        });
    }
}

module.exports = user;
