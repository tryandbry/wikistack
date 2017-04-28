var morgan = require('morgan');
var express = require('express');
var app = express();
var nunjucks = require('nunjucks');
var models = require('./models');
var bodyParser = require('body-parser');

//**************
//BEGIN MIDDLEWARE SECTION
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false});
app.use(bodyParser.json());
//END MIDDLEWARE SECTION
//***************

// set nunjucks as the render engine for all html files
app.engine('html',nunjucks.render);
// when no render engine is specified, default to the html renderer
app.set('view engine', 'html');
// set default templates directory to "views"
nunjucks.configure('views',{noCache: false});

models.db.sync({force: true})
.then(function () {
  // make sure to replace the name below with your express app
  app.listen(3000, function () {
    console.log('Server is listening on port 3000!');
  });
})
.catch(console.error);

