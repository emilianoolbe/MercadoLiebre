function Error404(req, res, next) {
    res.status(404).render('404');
	next();
}

module.exports = Error404;