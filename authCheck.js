module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.erro = 'login failed';
    res.redirect('/login');
}