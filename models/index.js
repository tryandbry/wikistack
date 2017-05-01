var Sequelize = require('sequelize');
var utils = require('../utils');
var db = new Sequelize('postgres://localhost:5432/wikistack');

// DEFINE MODELS
var Page = db.define('page', {
    title: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
    urlTitle: {type: Sequelize.STRING, allowNull: false},
    content: {type: Sequelize.TEXT, defaultValue: ''},
    status: {type: Sequelize.ENUM('open','closed')},
    date: {type: Sequelize.DATE, defaultValue: Sequelize.NOW} 
} , {
    getterMethods : {
        route: function () { return '/wiki/' + this.urlTitle }
    },
    hooks : {
        beforeValidate : function(page) {
            // test if title is unique
            
            // populate non-null title, urlTitle
            if (page.title) {
                let newUT = page.title.replace(/\s/g,"_").replace(/\W/g,"");
                page.set('urlTitle', newUT);
            } else {
                let newTitle = String(Math.floor(Math.random()*10000000000));
                page.set('title', newTitle);
                page.set('urlTitle', newTitle);
            }
        }
    }
});

var User = db.define('user',{
  name: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
  email: {type: Sequelize.STRING, allowNull: false, validate: {isEmail: true} }
});

module.exports = {
  Page: Page,
  User: User,
  db: db
};