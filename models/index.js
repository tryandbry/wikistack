var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

// DEFINE MODELS
var Page = db.define('page',{
  title: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
  urlTitle: {type: Sequelize.STRING, allowNull: false},
  content: {type: Sequelize.TEXT, allowNull: false},
  status: {type: Sequelize.ENUM('open','closed')},
  date: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}
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
