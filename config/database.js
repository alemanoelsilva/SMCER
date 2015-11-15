var Sequelize = require('sequelize');
var connection = new Sequelize('tcc', 'root', 'root', {
	host: 'localhost'
	, port: 3306
	, dialect: 'mysql'
});

connection.sync().then(function (success){
	//console.log('conectou', success)

}, function (error){
	//console.log('ERRO DATABASE', error, connection)
});

module.exports = connection;
