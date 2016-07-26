const path           = require('path');
const express        = require('express');
const favicon        = require('serve-favicon');
const bodyParser     = require('body-parser');
const expressSession = require('express-session');
const morgan         = require('morgan');
const mongoose       = require('mongoose');
const passport       = require('passport');
const flash          = require('connect-flash');
const config         = require('config');

const app            = express();
const dbConfig       = config.get('db');


mongoose.connect(dbConfig.url, {
    user: dbConfig.username,
    pass: dbConfig.password
});


/* ---------------------------------------------------------------------------------------------- */
/* APP CONFIG                                                                                     */
/* ---------------------------------------------------------------------------------------------- */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(path.join(__dirname, '..', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
    secret: 'fucktheduck',
    resave: false,
    saveUninitialized: true,
}));
app.use(morgan('dev'));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


/* ---------------------------------------------------------------------------------------------- */
/* ROUTERS                                                                                        */
/* ---------------------------------------------------------------------------------------------- */
const auth = require('./features/auth');
app.use('/', auth.router);

const user = require('./features/users');
app.use('/api', user.router);

const habits = require('./features/habits');
app.use('/api', habits.router);

app.get('*', (req, res) => {
    res.render('index');
});


/* ---------------------------------------------------------------------------------------------- */
/* ERROR HANDLING                                                                                 */
/* ---------------------------------------------------------------------------------------------- */
const STATUS_CODES = require('http').STATUS_CODES;
const HttpError = require('./errors').HttpError;

app.use((err, req, res, next) => {
    if (err instanceof HttpError) {
        const message = err.message || STATUS_CODES[err.status] || 'Error';

        res.status(err.status).json({ ok: 0, message });
        return;
    }

    res.send(err.message);
});


/* ---------------------------------------------------------------------------------------------- */
/* RUN                                                                                            */
/* ---------------------------------------------------------------------------------------------- */
app.listen(7878, () => {
    console.log('App listening on port 7878');
});

