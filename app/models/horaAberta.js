var connection = require('../../config/database');
var Sequelize = require('sequelize');

module.exports = function() { 

	var Circuito, HoraAberta;

	Circuito = connection.import(__dirname + '/circuito');

	HoraAberta = connection.define('consumoHora', {
		dataHora: {
			type: Sequelize.DATE
			, field: 'data_hora'
			, primaryKey: true
		},
		potencia: {
			type: Sequelize.FLOAT
			, field: 'potencia'
		}		
	},	  
	{ 
		tableName: 'Consumo_Hora'
		, timestamps: false		
	});

	Circuito.hasMany(HoraAberta, { 
		foreignKey: { 
			name: 'idCircuito'
			, field: 'id_circuito_fk' 
			, primaryKey: true
		} 
	});
	HoraAberta.belongsTo(Circuito, { 
		foreignKey: { 
			name: 'idCircuito'
			, field: 'id_circuito_fk' 
			, primaryKey: true
		} 
	});

	return HoraAberta;
}