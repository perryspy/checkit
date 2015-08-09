var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/checkit');

// make the client stuff side public
app.use(express.static(__dirname + '/client'));

var morgan = require('morgan');
app.use(morgan('dev'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var methodOverride = require('method-override');
app.use(methodOverride());

var passport = require('passport');
require('./server/config/passport');
app.use(passport.initialize());

require('./server/config/routes.js')(app);

var port = process.env.PORT || 1337;
app.listen(port);
console.log('App listening on port ' + port);
