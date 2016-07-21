const router     = require('express').Router();
const Model      = require('./model');
const controller = require('./controller');


router.route('/habits')
    .get(controller.fetchAll)
    .post(controller.addOne);

router.route('/habits/:id')
    .put(controller.updateOne)
    .delete(controller.deleteOne);


module.exports = router;
