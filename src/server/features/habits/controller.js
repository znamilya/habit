const HttpError = require('../../errors').HttpError;
const Model = require('./model');


const controller = {
    getAll: (req, res, next) => {
        const { user, query: { year, month } } = req;

        if (!user) {
            next(new HttpError(401));
            return;
        }

        Model
            .find({
                $and: [
                    { owner: user._id },
                    { year: year },
                    { month: month },
                ]
            }, 'year month activities title')
            .then(result => {
                res.json({ ok: 1, result });
            })
            .catch(err => {
                console.log(err);
                next(new HttpError(500));
            });
    },

    addOne: (req, res) => {
        const { user, body: { title, year, month }} = req;

        const newHabit = new Model({
            title,
            year,
            month,
            owner: user._id,
        });


        controller._save(newHabit, 200, res);
    },

    fetchOne: (req, res, next) => {
        Model.findById(req.params.id)
            .then(habit => {
                if (!habit) {
                    next(new HttpError(404));
                    return;
                }

                req.habit = habit;
                next();
            })
            .catch(err => {
                console.log(err);
                next(new HttpError(500));
            });
    },

    updateOne: (req, res, next) => {
        const { habit, body } = req;

        // TODO: выглядит как говно!
        if (body.title) {
            habit.title = body.title;
        }

        if (body.dayNumber) {
            const { dayNumber } = body;
            const { activities } = habit;
            const activityIndex = activities.indexOf(dayNumber);

            if (activityIndex === -1) {
                activities.push(dayNumber)
            } else {
                activities.splice(activityIndex, 1);
            }
        }

        controller._save(habit, 200, res);
    },

    deleteOne: (req, res) => {
        const { habit } = req;

        habit.remove()
            .then(result => {
                res.json({ ok: 1, result: habit });
            })
            .catch(err => {
                console.log(err);
                next(new HttpError(500));
            })
    },

    _save: (entity, status, res) => {
        entity.save()
            .then(result => {
                res.status(status).json({ ok: 1, result })
            })
            .catch(err => {
                console.log(err);
                next(new HttpError(500));
            })
    }
};


module.exports = controller;
