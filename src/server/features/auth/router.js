const passport   = require('passport');
const router     = require('express').Router();
const controller = require('./controller');
const datePath   = require('../../../common/helpers/datePath');
require('../../config/passport');


router.route('/login')
    .get(controller.render)
    .post(controller.validateLogin, passport.authenticate('login', {
        successRedirect: datePath.getNow(),
        failureRedirect: '/login',
        failureFlash: true,
    }));

router.route('/signup')
    .post(controller.validateSignup, passport.authenticate('signup', {
        successRedirect: datePath.getNow(),
        failureRedirect: '/login',
        failureFlash : true,
    }));

router.route('/logout')
    .get(controller.logout)


module.exports = router;
