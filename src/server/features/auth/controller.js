module.exports = {
    render: (req, res) => {
        res.render('index', {
            signupErrorMessage: req.flash('signupErrorMessage'),
            loginErrorMessage: req.flash('loginErrorMessage'),
        });
    },

    validateLogin: (req, res, next) => {
        // Email validation
        if (!req.body.email) {
            req.flash('loginErrorMessage', 'Email является обязательным');
            res.status(400);
            res.redirect('/login');
            return;
        }

        // Password validation
        if (!req.body.password) {
            req.flash('loginErrorMessage', 'Пароль обязателен');
            res.status(400);
            res.redirect('/login');
            return;
        }

        next();
    },

    validateSignup: (req, res, next) => {
        // Email validation
        if (!req.body.email) {
            req.flash('signupErrorMessage', 'Email является обязательным');
            res.status(400);
            res.redirect('/login');
            return;
        }

        // Password validation
        if (!req.body.password) {
            req.flash('signupErrorMessage', 'Пароль обязателен');
            res.status(400);
            res.redirect('/login');
            return;
        }

        next();
    },

    logout: (req, res) => {
        req.logout();
        res.redirect('/login');
    }
}
