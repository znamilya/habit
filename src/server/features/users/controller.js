const HttpError = require('../../errors').HttpError;


const controller = {
    get: (req, res) => {
        const { user } = req;

        if (!user) {
            res.status(401)
                .json({
                    ok: 0
                });

            return;
        }

        res.json({
            ok: 1,
            result: {
                _id: user._id,
                email: user.email,
            },
        });
    },

    requireLogin: (req, res, next) => {
        if (!req.isAuthenticated()) {
            next(new HttpError(401));
            return;
        }

        next();
    }
};


module.exports = controller;
