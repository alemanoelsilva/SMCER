'use strict';

app.controller('AuthCtrl', ["$rootScope", "$scope", "$state", "ValidatorService", "Auth","SweetAlert", "User",
    function ($rootScope, $scope, $state, ValidatorService, Auth, SweetAlert, User) {

    $scope.init = function () { 
        if ($rootScope.user) {
            redirectApp();
        } else {
            Auth.query(
                function(res) {
                    console.log(JSON.stringify(res));
                    redirectApp();
                }, function(err) {
                    console.log('Auth.query: '+JSON.stringify(err))
                });
        }
            
        $scope.user = new Object();
        $scope.email = "";
    };

    $scope.init();

    $scope.forgot = function (Form) {

        if (ValidatorService.validateForm(Form, false)) {
            User.forgot({email: $scope.email},
                function (success){
                    SweetAlert.swal("Dados enviados", "Foi enviada a sua senha para o email cadastrado.", "success");
                }, function (error){
                    SweetAlert.swal("Dados incorretos", "O e-mail informado não existe. Tente novamente.", "error");
                }
            );
        }
    }    

    $scope.login = function (Form) {

        if (ValidatorService.validateForm(Form, false)) {

            Auth.login($scope.user,
                function user(user) {
                    User.getUserLogged({nome: $scope.user.login},
                        function (success){
                            var userSession = success;
                            $rootScope.user = userSession;
                            localStorage.setItem("userSession", JSON.stringify(userSession));
                            redirectApp();
                        }, function (error){
                            console.log('error User.getUserLogged', error)
                        }
                    );
                },
                function (erro) {
                    console.log(erro);
                    delete $scope.user.password;
                    SweetAlert.swal("Dados incorretos", "Usuário ou senha informados estão incorretos", "error");
                });

        }

    };
    
    function redirectApp() {
        $state.go('app.dashboard');
    }

}]);