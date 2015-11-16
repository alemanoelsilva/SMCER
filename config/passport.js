var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy

var app = require('./express')();

module.exports = function() {

    var User = app.models.usuario;

    passport.use(new LocalStrategy({
        usernameField : 'login',
        passwordField : 'password',
        session : true
    },
    function(login, password, done) {
          
        console.log("Login -> User: "+login+", Password: "+password);

        User.findOne( { where: { nome: login, senha : password } })
        .then(function (success){
            console.log('Usuário autenticado com sucesso!');
            console.log(success);
            return done(null, success);
        }, function (error){
            console.error("Erro no login: "+error);
            return done(error);
        });

    }));
    
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
    
};