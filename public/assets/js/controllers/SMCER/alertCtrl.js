'use strict';

app.controller('AlertListCtrl', ["$scope", "$state", "$filter", "ngTableParams", "SweetAlert", "Alert", "$rootScope",
    function($scope, $state, $filter, ngTableParams, SweetAlert, Alert, $rootScope){

    $scope.filtro = '';
    
    $scope.init = function() {
        searchAlerts();
    };
    
    $scope.init();

    function searchAlerts() {  
        $scope.alerts = Alert.getAlertByUser( { idUser: JSON.parse(localStorage.getItem("userSession")).id },
            function (alerts){
                for (var i = 0; i < alerts.length; i++) {
                    $scope.alerts[i].circuito = alerts[i].circuito.nome;
                };
                $scope.tableParams = createTable($scope.alerts);
            }
        );
    };

    function createTable(data) {
        return new ngTableParams({
            page: 1, 
            count: 10 
        }, {
            total: data.length, 
            getData: function ($defer, params) {
                var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });
    };    

    $scope.deleteAlert = function(alert){
        alert.$delete({ id: alert.id }, 
            function (alert){
                SweetAlert.swal("Sucesso", "Alerta excluido com sucesso", "success");
            }, function (erro){
                SweetAlert.swal("Erro", "Aconteceu um erro inesperado", "error");
            });
    };

}]);
app.controller('AlertCreateCtrl', ["$scope", "$rootScope", "$state", "$stateParams", "Alert", "Circuit", "SweetAlert",
    function($scope, $rootScope, $state, $stateParams, Alert, Circuit, SweetAlert){

    $scope.init = function(){
        $scope.alert = new Alert();
        searchCircuitos();
    }

    $scope.init();

    function searchCircuitos() {
        Circuit.query(   
            function(circuitos) {
                $scope.circuitos = circuitos;
                $scope.alert.circuito = circuitos[0];
            }, 
            function(erro) {
                console.log(erro);                               
            }
        );
    };      

    $scope.addAlert = function(){
        $scope.alert.usuario = {
            id: JSON.parse(localStorage.getItem("userSession")).id
        };    
        $scope.alert.$save(
            function (alert){
                $state.go('app.manager.alerts');
        }, function (erro){
                console.log(erro);
                SweetAlert.swal("Ocorreu um erro", erro.data, "error");
        });
    }

}]);
app.controller('AlertEditCtrl', ["$scope", "$rootScope", "$state", "$stateParams", "Alert", "Circuit", "SweetAlert",
    function($scope, $rootScope, $state, $stateParams, Alert, Circuit, SweetAlert){

    $scope.init = function(){
        searchCircuitos();
        $scope.alert = Alert.get( { id: $stateParams.id } );
    }

    $scope.init();

    function searchCircuitos() {
        Circuit.query(   
            function(circuitos) {
                $scope.circuitos = circuitos;
            }, 
            function(erro) {
                console.log(erro);                               
            }
        );
    };   

    $scope.updateAlert = function() {
        $scope.alert.usuario = {
            id: JSON.parse(localStorage.getItem("userSession")).id
        };
        $scope.alert.$update({id: $scope.alert.id},
            function (alert){
                $state.go('app.manager.alerts');
        }, function (erro){
                console.log(erro);
                SweetAlert.swal("Dados incorretos", "Verifique os dados digitados", "error");
        });        
    };

}]);