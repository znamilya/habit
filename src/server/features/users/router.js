const router     = require('express').Router();
const controller = require('./controller');


router.route('/user')
    .get(controller.get);


module.exports = router;
