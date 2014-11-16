var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
//var cors = require('cors');

var app = express();

var routes_index = require('./routes/index');
var routes_lobby = require('./routes/lobby');
var routes_login = require('./routes/login');
//app.use(cors());

//console.log(app.get('port'));
//process.kill(process.pid, 'SIGHUP');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:"1234567890",
    resave: true,
    saveUninitialized: true
}));


app.use('/', routes_index);
app.use('/lobby', routes_lobby);
app.use('/login', routes_login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
