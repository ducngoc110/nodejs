exports.index = (req, res, next) => {
    res.render('backend/home/index', { title: 'Express' });
}