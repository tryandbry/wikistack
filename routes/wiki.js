const express = require('express');
const router = express.Router();
const utils = require('../utils');
const models = require('../models');

var Page = models.Page;
var User = models.User;

router.get('/', function (req, res, next) {
    Page.findAll()
        .then(result => res.render('index', { pages : result } ))
        .catch(next);
});

router.post('/', function (req, res, next) {
    let page = {
        title: req.body.title, 
        content: req.body.content,
        status: req.body.status
    };
    let user = { 
        where: {
            name: req.body.name, 
            email: req.body.email
        }
    };

    utils.printo(req.body, "POSTY!"); 
    
    // first promise: returns [user instance, booleanOnCreated?]
    // second line/promise: returns page instance
    // third promise: returns page instance
    // fourth: returns a render!
    
    User.findOrCreate(user)
        .then(user => Page.build(page)
                          .save()
                          .then(page => page.setAuthor(user[0]))
        ).then(page => res.redirect(page.route))
        .catch(next);
});

router.get('/add', function (req, res, next) {
    res.render('../views/addpage.html', {});
});

// below '/add'
router.get('/:urlTitle', function (req, res, next) {
    Page.findAll({ where: {urlTitle : req.params.urlTitle} }) 
        .then(result => res.render('wikipage', result[0].dataValues))
        .catch(next);
});

module.exports = router;
