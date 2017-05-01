const express = require('express')
const router = express.Router();

router.get('/', function (req, res) {
    res.redirect('/')
});

router.post('/', function (req, res) {
    res.sendStatus(201);
});

router.get('/add', function (req, res) {
    res.render('../views/addpage.html', {});
});

module.exports = router;