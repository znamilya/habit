const passport      = require('passport');
const LocalStrategy = require('passport-local');
const UserModel     = require('../../features/users').Model;

const signupStrategy = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    (req, email, password, done) => {
        findOrCreateUser = () => {
            UserModel.findOne({ email: email }, (err, user) => {
                if (err) {
                    console.log(`Error in SignUp: ${err}`);
                    return done(err);
                }

                if (user) {
                    console.log('User already exists');
                    return done(null, false,  req.flash('signupErrorMessage', 'User already exists'));
                } else {
                    const newUser = new UserModel({
                        email: email,
                        password: UserModel.createHash(password)
                    });

                    newUser
                        .save()
                        .then(() => {
                            done(null, newUser);
                        })
                        .catch(err => {
                            done(err, false, req.flash('signupErrorMessage', 'Oooops...'));
                        });
                }
            });
        };

        process.nextTick(findOrCreateUser);
    });


const loginStrategy = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    }, (req, email, password, done) => {
        UserModel.findOne({ email })
            .then(user => {
                if (user.password === UserModel.createHash(password)) {
                    done(null, user);
                    return;
                }

                done(null, false, req.flash('loginErrorMessage', 'Wrong password'));
            })
            .catch(err => {
                done(err, null, req.flash('loginErrorMessage', 'User not found'));
            })
    })

passport.serializeUser((user, done) => {
    done(null, user._id)
});

passport.deserializeUser((id, done) => {
    UserModel
        .findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err);
        });
});

passport.use('signup', signupStrategy);
passport.use('login', loginStrategy);
