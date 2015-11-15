module.exports = function (app){ 
	
	var Usuario = app.models.usuario;

	var controller = {
		getAll: function (req, resp){
			Usuario.findAll()
			.then(function (success) {
				var returN = success;
				if( !(Object.prototype.toString.call(success) === '[object Array]') ) {
					returN = new Array();
					returN.push(success);
				}
				resp.json(returN);
				resp.status(204).end();				
			}, function (error){
				resp.status(500).end();
				return console.error(error);
			})
		},
		getUsuario: function (req, resp){
			Usuario.findOne( { where: { id: req.params.id } } )
			.then(function (success){
				resp.json(success);
				resp.status(204).end();				
			}, function (error){
				resp.status(500).end();
				return console.error(error);
			})
		},		
		getUsuarioByNome: function (req, resp){
			Usuario.findOne( { where: { nome: req.params.nome } } )
			.then(function (success){
				resp.json(success);
				resp.status(204).end();				
			}, function (error){
				resp.status(500).end();
				return console.error(error);
			})
		},
		saveUsuario: function (req, resp){
			var usuario = {
				nome: req.body.nome
				, senha: req.body.senha
				, email: req.body.email
			};
			Usuario.build( usuario )
			.save()
			.then(function (success){
				resp.json(success);
			}, function (error){
				resp.status(500).end();
				return console.error(error);
			})
		},
		updateUsuario: function (req, resp) {
			var usuario = {
				nome: req.body.nome
				, senha: req.body.senha
				, email: req.body.email
			};
			Usuario.update(usuario, { where: { id: req.params.id } } )
			.then(function (success){
				resp.status(204).end();
			}, function (error){
				resp.status(500).end();
				return console.error(error);
			})
		},
		deleteUsuario: function (req, resp){
			Usuario.destroy( { where: { id: req.params.id } } )
			.then(function (success){
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