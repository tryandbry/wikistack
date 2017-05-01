const express = require('express');
const router = express.Router();
const utils = require('../utils');
const models = require('../models');

var Page = models.Page;
var User = models.User;

router.get('/', function (req, res) {
    res.redirect('/')
});

router.post('/', function (req, res) {
  utils.printo(req.body,"POSTY!");

  var newrow = {   title: req.body.title,
                 content: req.body.content,
	       };

  utils.printo(newrow,"Normalized: ");

  Page.build(newrow).save(); 

  res.json(newrow);
});

router.get('/add', function (req, res) {
    res.render('../views/addpage.html', {});
});

module.exports = router;
