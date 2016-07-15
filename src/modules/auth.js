const express   = require('express');
const UserModel = require('../models/user');
const passport  = require('passport');
require('../config/passport');

const router    = express.Router();

router.route('/login')
    .get((req, res) => {
        res.render('index', {
            signupErrorMessage: req.flash('signupErrorMessage'),
            loginErrorMessage: req.flash('loginErrorMessage'),
        });
    })
    .post((req, res, next) => {
        // Email validation
        if (!req.body.email) {
            req.flash('loginErrorMessage', 'Email is required');
            res.redirect('/login');
            return;
        }

        // Password validation
        if (!req.body.password) {
            req.flash('loginErrorMessage', 'Password is required');
            res.redirect('/login');
            return;
        }

        next();
    }, passport.authenticate('login', {
        successRedirect: '/2016',
        failureRedirect: '/login',
        failureFlash: true,
    }));


router.route('/signup')
    .post((req, res, next) => {
        // Email validation
        if (!req.body.email) {
            req.flash('signupErrorMessage', 'Email is required');
            res.redirect('/login');
            return;
        }

        // Password validation
        if (!req.body.password) {
            req.flash('signupErrorMessage', 'Password is required');
            res.redirect('/login');
            return;
        }

        next();
    }, passport.authenticate('signup', {
        successRedirect: '/2016',
        failureRedirect: '/login',
        failureFlash : true,
    }));

router.route('/logout')
    .get((req, res) => {
        req.logout()
        res.redirect('/login');
    })


module.exports = {
    router: router,
};
