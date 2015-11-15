'use strict';

/**
 * Config for the router
 */
app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'JS_REQUIRES',
function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, jsRequires) {

    app.controller = $controllerProvider.register;
    app.directive = $compileProvider.directive;
    app.filter = $filterProvider.register;
    app.factory = $provide.factory;
    app.service = $provide.service;
    app.constant = $provide.constant;
    app.value = $provide.value;

    // LAZY MODULES

    $ocLazyLoadProvider.config({
        debug: true,
        events: true,
        modules: jsRequires.modules
    });

    // APPLICATION ROUTES
    // -----------------------------------
    // For any unmatched url, redirect to /app/dashboard
    $urlRouterProvider.otherwise("/login/signin");
    //
    // Set up the states
    $stateProvider.state('app', {
        url: "/app",
        templateUrl: "assets/views/app.html",
        resolve: loadSequence('modernizr', 'moment', 'angularMoment', 'perfect-scrollbar-plugin', 'ngAside', 'sweet-alert', 'chartjs', 'tc.chartjs', 'oitozero.ngSweetAlert'),
        abstract: true
    }).state('app.dashboard', {
        url: "/dashboard",
        templateUrl: "assets/views/dashboard.html",
        resolve: loadSequence('dashboardCtrl'),
        title: 'Dashboard',
        ncyBreadcrumb: {
            label: 'Dashboard'
        }
    })
	// Login routes

	.state('login', {
	    url: '/login',
	    template: '<div ui-view class="fade-in-right-big smooth"></div>',
	    abstract: true
	}).state('login.signin', {
	    url: '/signin',
	    templateUrl: "assets/views/login_login.html",
        resolve: loadSequence('sweet-alert', 'oitozero.ngSweetAlert', 'authCtrl')
	}).state('login.forgot', {
	    url: '/forgot',
        resolve: loadSequence('sweet-alert', 'oitozero.ngSweetAlert', 'forgotCtrl'),
	    templateUrl: "assets/views/login_forgot.html"
	}).state('login.registration', {
	    url: '/registration',
	    templateUrl: "assets/views/login_registration.html"
	}).state('login.lockscreen', {
	    url: '/lock',
	    templateUrl: "assets/views/login_lock_screen.html"
	})
        
    // Page Manager
    .state('app.manager', {
        url: '/manager',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'Gerenciamento',
        ncyBreadcrumb: {
            label: 'Gerenciamento'
        }
    })

    // Alerts
    .state('app.manager.alerts', {
        url: '/alerts',
        templateUrl: "assets/views/alerts/alerts.html",
        title: 'Management of Alerts',
        icon: 'ti-layout-media-left-alt',
        controller:'AlertListCtrl',
        ncyBreadcrumb: {
            label: 'Alertas'
        },
        resolve: loadSequence('ngTable', 'alertCtrl')
    })
    .state('app.manager.newAlert', {
        url: '/alerts/new',
        templateUrl: "assets/views/alerts/alert_add.html",
        title: 'Create Alerts',
        icon: 'ti-layout-media-left-alt',
        controller:'AlertCreateCtrl',
        ncyBreadcrumb: {
            label: 'Save'
        },
        resolve: loadSequence('ui.select', 'alertCtrl')
    })    
    .state('app.manager.editAlert', {
        url: '/alerts/:id/edit',
        templateUrl: "assets/views/alerts/alert_edit.html",
        title: 'Update Alerts',
        icon: 'ti-layout-media-left-alt',
        controller:'AlertEditCtrl',
        ncyBreadcrumb: {
            label: 'Save'
        },
        resolve: loadSequence('ui.select', 'alertCtrl')
        
    })

    // Users
    .state('app.manager.users', {
        url: '/users',
        templateUrl: "assets/views/users/users.html",
        title: 'Management of Users',
        icon: 'ti-layout-media-left-alt',
        controller:'UserListCtrl',
        ncyBreadcrumb: {
            label: 'Usuários'
        },
        resolve: loadSequence('ngTable', 'userCtrl')
    })
    .state('app.manager.newUser', {
        url: '/users/new',
        templateUrl: "assets/views/users/user_add.html",
        title: 'Create User',
        icon: 'ti-layout-media-left-alt',
        controller:'UserCreateCtrl',
        ncyBreadcrumb: {
            label: 'Save'
        },
        resolve: loadSequence('userCtrl') 
   })
    .state('app.manager.editUser', {
        url: '/users/:id/edit',
        templateUrl: "assets/views/users/user_edit.html",
        title: 'Update User',
        icon: 'ti-layout-media-left-alt',
        controller:'UserEditCtrl',
        ncyBreadcrumb: {
            label: 'Save'
        },
        resolve: loadSequence('userCtrl')
    })
    
    // Circuits
    .state('app.manager.circuits', {
        url: '/circuits',
        templateUrl: "assets/views/circuits/circuits.html",
        title: 'Management of Circuits',
        icon: 'ti-layout-media-left-alt',
        controller:'CircuitListCtrl',
        ncyBreadcrumb: {
            label: 'Circuitos'
        },
        resolve: loadSequence('ngTable', 'circuitCtrl')
    })
    .state('app.manager.newCircuit', {
        url: '/circuits/new',
        templateUrl: "assets/views/circuits/circuit_add.html",
        title: 'Create Circuit',
        icon: 'ti-layout-media-left-alt',
        controller:'CircuitCreateCtrl',
        ncyBreadcrumb: {
            label: 'Save'
        },
        resolve: loadSequence('circuitCtrl') 
   })
    .state('app.manager.editCircuit', {
        url: '/circuits/:id/edit',
        templateUrl: "assets/views/circuits/circuit_edit.html",
        title: 'Update Circuit',
        icon: 'ti-layout-media-left-alt',
        controller:'CircuitEditCtrl',
        ncyBreadcrumb: {
            label: 'Save'
        },
        resolve: loadSequence('circuitCtrl')
    })

     // Page Monitoramento
    .state('app.chart', {
        url: '/chart',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'Monitoramento',
        ncyBreadcrumb: {
            label: 'Monitoramento'
        }
    })
    .state('app.chart.openHour', {
        url: '/openHour',
        templateUrl: "assets/views/chart/openHour.html",
        title: 'Por periodo de tempo',
        icon: 'ti-layout-media-left-alt',
        controller: 'ChartOpenHourCtrl',
        ncyBreadcrumb: {
            label: 'Monitor'
        },
        resolve: loadSequence('ui.select', 'chartCtrl')
    })
    .state('app.chart.now', {
        url: '/now',
        templateUrl: "assets/views/chart/now.html",
        title: 'Instantaneo',
        icon: 'ti-layout-media-left-alt',
        ncyBreadcrumb: {
            label: 'Monitor'
        },
        resolve: loadSequence('chartCtrl')
    })

    // Generates a resolve object previously configured in constant.JS_REQUIRES (config.constant.js)
    function loadSequence() {
        var _args = arguments;
        return {
            deps: ['$ocLazyLoad', '$q',
            function ($ocLL, $q) {
			    var promise = $q.when(1);
			    for (var i = 0, len = _args.length; i < len; i++) {
			        promise = promiseThen(_args[i]);
			    }
			    return promise;

			    function promiseThen(_arg) {
			        if (typeof _arg == 'function')
			            return promise.then(_arg);
			        else
			            return promise.then(function () {
			                var nowLoad = requiredData(_arg);
			                if (!nowLoad)
			                    return $.error('Route resolve: Bad resource name [' + _arg + ']');
			                return $ocLL.load(nowLoad);
			            });
			    }

			    function requiredData(name) {
			        if (jsRequires.modules)
			            for (var m in jsRequires.modules)
			                if (jsRequires.modules[m].name && jsRequires.modules[m].name === name)
			                    return jsRequires.modules[m];
			        return jsRequires.scripts && jsRequires.scripts[name];
			    }
			}]
        };
    }
}]);
