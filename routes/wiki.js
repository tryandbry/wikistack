const express = require('express')
const router = express.Router();
const chalk = require('chalk')

router.get('/', function (req, res) {
    res.redirect('/')
});

router.post('/', function (req, res) {
  printo(req.body,"POSTY!");
  res.json(req.body)
});

router.get('/add', function (req, res) {
    res.render('../views/addpage.html', {});
});

module.exports = router;


function printo(obj,header){
  var keys = Object.keys(obj);
  var str = "";
  keys.forEach( key=>{
    str += ",\n" + key + ":" + obj[key];
  });
  str = header + " {\n" + str.slice(2) + "\n}";
  console.log(chalk.magenta(str));

}
