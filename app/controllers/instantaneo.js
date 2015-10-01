module.exports =  function (app){ 

	var Instantaneo = app.models.instantaneo; 

	var controller = {
		getAll: function (req, resp){
			Instantaneo.findOne( { where: { idCircuito: 0 } } )
			.then(function (success) {
				resp.json(success);
				resp.status(204).end();
			}, function (error){
				resp.status(500).end();
				return console.error(error);
			})
		}
	};
	return controller;
}