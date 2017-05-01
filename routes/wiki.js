const express = require('express');
const router = express.Router();
const utils = require('../utils');
const models = require('../models');

var Page = models.Page;
var User = models.User;

router.post('/', function (req, res) {
    utils.printo(req.body, "POSTY!");

    let page = {
        title: req.body.title, 
        content: req.body.content,
        status: req.body.content
    };
    Page.build(page)
        .save()
        .then(result => res.render(result))
        .catch(err => res.send('ERROR ON SAVING POST'));
});

router.get('/add', function (req, res) {
    res.render('../views/addpage.html', {});
});

// below '/add'
router.get('/:urlTitle', function (req, res) {
    Page
        .findAll({ where: {urlTitle: req.params.urlTitle} }) 
        .then(result => (console.log(result), res.render('wikipage.html', result[0])))
        .catch(err => console.log(err));
});

module.exports = router;
