var chalk = require('chalk');

exports.printo = function (obj,header){
  var keys = Object.keys(obj);
  var str = "";
  keys.forEach( key=>{
    str += ",\n" + key + ":" + obj[key];
  });
  str = header + " {\n" + str.slice(2) + "\n}";
  console.log(chalk.magenta(str));

}

exports.validateurlTitle = function (newrow){
  if(newrow.urlTitle){
  newrow.urlTitle = newrow.urlTitle.replace(/\s/g,"_").replace(/\W/g,"");
  }
  else {
    newrow.urlTitle = "PIKAPIKA" + String(Math.floor(Math.random()*10000000000));
  }

  return newrow;
}

