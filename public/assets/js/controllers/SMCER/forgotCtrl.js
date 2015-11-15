'use strict';

app.controller('ForgotCtrl', ["$rootScope", "$scope", "$state", "ValidatorService","SweetAlert", "User",
    function ($rootScope, $scope, $state, ValidatorService, SweetAlert, User) {

    $scope.init = function () { 
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

}]);