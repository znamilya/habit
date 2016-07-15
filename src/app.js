const path           = require('path');
const express        = require('express');
const bodyParser     = require('body-parser');
const expressSession = require('express-session');
const mongoose       = require('mongoose');
const passport       = require('passport');
const flash          = require('connect-flash');

const app = express();

mongoose.connect('mongodb://adminochka:123@ds017175.mlab.com:17175/habit');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
    secret: 'fucktheduck',
    resave: false,
    saveUninitialized: true,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

const api = require('./modules/api');
app.use('/api', api.router);

const auth = require('./modules/auth');
app.use('/', auth.router);

app.get('*', (req, res) => {
    console.log('* route', req.url);
    res.render('index');
});

app.use((err, req, res, next) => {
    res.send(err.message);
});

app.listen(7878, () => {
    console.log('App listening on port 7878');
});

