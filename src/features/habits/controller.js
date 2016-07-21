const Model = require('./model');


module.exports = {
    fetchAll: (req, res) => {
        const { user, query: { year, month } } = req;

        if (!user) {
            res.status(401)
                .json({
                    ok: 0,
                    error: '',
                });

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
                res.json({
                    ok: 1,
                    result,
                });
            })
            .catch(err => {
                console.log('Error on fetch habits', err);
                res.status(500);
                res.json({
                    ok: 0,
                    err: err.errors,
                })
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

        newHabit
            .save()
            .then(result => {
                res.status(201)
                res.json({
                    ok: 1,
                    result,
                });
            })
            .catch(err => {
                console.log('Error on save', err);
                res.status(400);
                res.json({
                    err: err.errors,
                })
            })
    },

    updateOne: (req, res) => {
        Model
            .findById(req.params.id)
            .then(habit => {
                const { dayNumber } = req.body;
                const { activities } = habit;
                const activityIndex = activities.indexOf(dayNumber);

                if (activityIndex === -1) {
                    activities.push(dayNumber)
                } else {
                    activities.splice(activityIndex, 1);
                }

                habit.save()
                    .then(result => {
                        console.log('Habit was successfully updated');
                        res.json({
                            ok: 1,
                            result,
                        })
                    })
                    .catch(err => {
                        console.log('Can`t save updated habit', err);
                    })

            }, err => {
                console.log('Can`t find habit');
                res.status(404)
                res.json({
                    error: err,
                });
            })
            .catch(err => {
                res.status(500);
                res.json({
                    error: err,
                });
            })
    },

    deleteOne: (req, res) => {
        const habitToRemoveId = req.params.id;

        Model
            .findByIdAndRemove(habitToRemoveId)
            .then(result => {
                res.json({
                    ok: 1,
                    result
                })
            }, err => {
                res.status(404);
                res.json({
                    ok: 0,
                })
            });
    },
}
