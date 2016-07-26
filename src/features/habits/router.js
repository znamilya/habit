const router          = require('express').Router();
const Model           = require('./model');
const controller      = require('./controller');
const usersController = require('../users').controller;


router.route('/habits')
    .all(usersController.requireLogin)
    .get(controller.getAll)
    .post(controller.addOne);

router.route('/habits/:id')
    .all(usersController.requireLogin, controller.fetchOne)
    .put(controller.updateOne)
    .delete(controller.deleteOne);


module.exports = router;
