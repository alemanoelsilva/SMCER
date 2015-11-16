var connection = require('../../config/database');

var moment = require("moment");

function formatDate(data){
	var string = String(data)
	var arrayAll = string.split(" ");
	var hour = arrayAll[4];

	var dia = data.getDate();
	if (dia.toString().length == 1)
		dia = "0" + dia;
	var mes = data.getMonth() + 1;
	if (mes.toString().length == 1)
		mes = "0" + mes;
	var ano = data.getFullYear();
	return dia + "/" + mes + "/" + ano + " " + hour;
};

module.exports =  function (app){ 

	var HoraFechada = app.models.horaFechada; 
	var Circuito = app.models.circuito;

	var controller = {
		getAll: function (req, resp){
			var _id = req.body.id;
			HoraFechada.findAll()
			.then(function (success) {
				resp.json(success);
				resp.status(204).end();
			}, function (error){
				console.log(error);
				resp.status(500).end();
			})
		}, 
		getIntervalHoraFechada: function (req, resp){
			var consumo = {
				label: [],
				data: []
			};
			var _id = req.params.circuito,
				dataInicial = req.params.dataInicial,
				dataFinal = req.params.dataFinal;
				
			HoraFechada.findAll( 
				{ 
					include: [{
						model: Circuito
						, where: { id: _id }
					}],
					where: connection.and({ 
						dataHora: {
						   	$gte: moment(dataInicial, "YYYY-MM-DD HH:mm:ss").toDate(),
						  	$lte: moment(dataFinal, "YYYY-MM-DD HH:mm:ss").toDate()    
						}
					})
				}
			)
			.then(function (success) {
				for (var i = 0; i < success.length; i++) {
					var hora = formatDate(success[i].dataValues.dataHora);
					var	potencia = success[i].dataValues.potencia;
				    consumo.label.push(hora);
				    consumo.data.push(potencia);
				};
				console.log('SELECT', consumo)
				resp.json(consumo);
				resp.status(204).end();
			}, function (error){
				resp.status(500).end();
				return console.error(error);
			})
		}
	};
	return controller;
}