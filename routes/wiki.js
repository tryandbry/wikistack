const express = require('express');
const router = express.Router();
const utils = require('../utils');
const models = require('../models');

var Page = models.Page;
var User = models.User;

router.post('/', function (req, res,next) {
    utils.printo(req.body, "POSTY!");

    let page = {
        title: req.body.title, 
        content: req.body.content,
        status: req.body.status
    };
    Page.build(page)
        .save()
        .then(result => res.render(result))
        .catch(next);
});

router.get('/add', function (req, res, next) {
    res.render('../views/addpage.html', {});
});

// below '/add'
router.get('/:urlTitle', function (req, res,next) {
  console.log(req.params);
    Page
        .findAll({ where: {urlTitle: req.params.urlTitle} }) 
        .then(result => {
	  console.log(result[0].dataValues);
	  res.render('wikipage.html',result[0].dataValues);
	})
        .catch(next);
});

module.exports = router;
