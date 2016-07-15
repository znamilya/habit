const uuid       = require('node-uuid');
const express    = require('express');
const HabitModel = require('../models/habit');

const router = express.Router();


router.route('/user')
    .get((req, res) => {
        const { user } = req;

        if (user) {
            res.json({
                ok: 1,
                result: {
                    _id: user._id,
                    email: user.email,
                },
            });

            return;
        }

        return res.json({
            ok: 0,
        })
    });

router.route('/habits')
    .get((req, res) => {
        const year = req.query.year;
        const month = req.query.month;

        HabitModel
            .find({
                // $and: [
                //     { 'activities.year': year },
                //     { 'activities.month': month }
                // ]
            })
            .then(result => {
                res.json({
                    ok: 1,
                    result,
                });
            });
    })
    .post((req,res) => {
        const title = req.body.title;
        const newHabit = new HabitModel({
            title,
            activities: [],
        });

        newHabit
            .save()
            .then(result => {
                res.json({
                    ok: 1,
                    result,
                });
            });
    });

router.route('/habits/:id')
    .delete((req, res) => {
        const habitToRemoveId = req.params.id;

        HabitModel
            .findByIdAndRemove(habitToRemoveId)
            .then(result => {
                res.json({
                    ok: 1,
                    result
                })
            });
    });


module.exports = {
    router,
};
