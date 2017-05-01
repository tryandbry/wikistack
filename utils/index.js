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

exports.magenta = function(){
  Array.prototype.slice.call(arguments).forEach(e=>{
    console.log(chalk.magenta(e));
  });
}

exports.printodeep = function(obj,header){
  var keys = Object.keys(obj);
  keys.forEach( (e)=>{
    var type = typeof e;
    switch(type){
      case "object":
        exports.printodeep(e,"");
	break;
      default:
        console.log(chalk.magenta(String(e)));
	break;
    }
  });
}

/*
var testobj = [1,2,3];
exports.printodeep(testobj,"one:");
var testobj = [[1],1,2,3];
exports.printodeep(testobj,"two:");
var testobj = [{name: "bob", content:"yo mama"},1,2,3];
exports.printodeep(testobj,"three:");
var testobj = {one:{name: "bob", content:"yo mama"},two:[1,2,[3]]};
exports.printodeep(testobj,"four:");
*/
