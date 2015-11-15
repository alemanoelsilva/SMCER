module.exports = function(app){

 	var usuario = app.controllers.usuario;

	 app.route('/usuarios')
        .get(usuario.getAll)
        .post(usuario.saveUsuario);
        
    app.route('/usuarios/:id')
        .get(usuario.getUsuario)
        .put(usuario.updateUsuario)
        .delete(usuario.deleteUsuario);
    
    app.route('/usuarioLogado/:nome')
        .get(usuario.getUsuarioByNome);

    app.route('/usuarios/email/forgot/:email')
        .get(usuario.forgot);
}