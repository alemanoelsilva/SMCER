module.exports = function (app){ 
	
	var Usuario = app.models.usuario;

	var nodemailer = require('nodemailer');

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
			if (!req.body.email || !req.body.nome || req.body.senha){
				return resp.status(500).json('Dados incosistentes');
			}
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
		},
		forgot: function (req, resp) {

			console.log('SOLICITACAO PARA RECUPERAR EMAIL: '+req.params.email);

			Usuario.findOne( { where: { email: req.params.email } } )
			.then(function (success){
				if (success !== null && success !== undefined) {
					// SEND EMAIL ..

					var transporter = nodemailer.createTransport({
					    service: 'gmail',
					    auth: {
					        user: 'tcc10smcer@gmail.com',
					        pass: 'vamostirar10'
					    }
					}, {
					    // default values for sendMail method
					    from: 'tcc10smcer@gmail.com'
					});
					transporter.sendMail({
					    to: success.email,
					    subject: 'SMCER - Envio de senha',
					    text: 'Sua senha é: '+success.senha
					});


					resp.status(200).end();
				} else {

					resp.status(404).end();
					return console.error(error);
				}

			});
		}	
	};
	return controller;
}