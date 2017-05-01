const morgan = require('morgan');
const express = require('express');
const nunjucks = require('nunjucks');
const models = require('./models');
const bodyParser = require('body-parser');
const router = require('./routes');

// 
const app = express();

// **************
// BEGIN MIDDLEWARE SECTION
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));
// END MIDDLEWARE SECTION
// ***************

// set nunjucks as the render engine for all html files
app.engine('html',nunjucks.render);
// when no render engine is specified, default to the html renderer
app.set('view engine', 'html');
// set default templates directory to "views"
nunjucks.configure('views',{noCache: false});

// database postgres
models.db.sync() // {force: true}
.then(function () {
  // make sure to replace the name below with your express app
  app.listen(3000, function () {
    console.log('Server is listening on port 3000!');
  });
})
.catch(console.error);

// routes
app.use('/', router);

// error handler
app.use(function(err,req,res,next){
  res.render('error.html', {error:err});
});
