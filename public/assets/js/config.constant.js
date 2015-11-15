'use strict';

/**
 * Config constant
 */
app.constant('APP_MEDIAQUERY', {
    'desktopXL': 1200,
    'desktop': 992,
    'tablet': 768,
    'mobile': 480
});
app.constant('JS_REQUIRES', {
    //*** Scripts
    scripts: {
        //*** Javascript Plugins
        'modernizr': ['vendor/components-modernizr/modernizr.js'],
        'moment': ['vendor/moment/min/moment.min.js'],
        'spin': 'vendor/spin.js/spin.js',

        //*** jQuery Plugins
        'perfect-scrollbar-plugin': ['vendor/perfect-scrollbar/js/min/perfect-scrollbar.jquery.min.js', 'vendor/perfect-scrollbar/css/perfect-scrollbar.min.css'],
        'ladda': ['vendor/ladda/dist/ladda.min.js', 'vendor/ladda/dist/ladda-themeless.min.css'],
        'sweet-alert': ['vendor/sweetalert/lib/sweet-alert.min.js', 'vendor/sweetalert/lib/sweet-alert.css'],
        'chartjs': 'vendor/chartjs/Chart.js',
        'jquery-sparkline': 'vendor/jquery.sparkline.build/dist/jquery.sparkline.min.js',
        'ckeditor-plugin': 'vendor/ckeditor/ckeditor.js',
        'jquery-nestable-plugin': ['vendor/jquery-nestable/jquery.nestable.js'],
        'touchspin-plugin': ['vendor/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js', 'vendor/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css'],

        //*** Controllers
        'authCtrl' : 'assets/js/controllers/SMCER/authCtrl.js',
        'forgotCtrl' : 'assets/js/controllers/SMCER/forgotCtrl.js',
        'userCtrl' : 'assets/js/controllers/SMCER/userCtrl.js',
        'circuitCtrl' : 'assets/js/controllers/SMCER/circuitCtrl.js',
        'alertCtrl' : 'assets/js/controllers/SMCER/alertCtrl.js',
        'chartCtrl' : 'assets/js/controllers/SMCER/chartCtrl.js',
        'dashboardCtrl': 'assets/js/controllers/dashboardCtrl.js',
        'validationCtrl': ['assets/js/controllers/validationCtrl.js'],
        
        //*** Filters
        'htmlToPlaintext': 'assets/js/filters/htmlToPlaintext.js',
        
        //*** Services
        'interceptor' : 'assets/js/services/InterceptorService.js',
    },
    //*** angularJS Modules
    modules: [{
        name: 'angularMoment',
        files: ['vendor/angular-moment/angular-moment.min.js']
    }, {
        name: 'ngTable',
        files: ['vendor/ng-table/dist/ng-table.min.js', 'vendor/ng-table/dist/ng-table.min.css']
    }, {
        name: 'ui.select',
        files: ['vendor/angular-ui-select/dist/select.min.js', 'vendor/angular-ui-select/dist/select.min.css', 'vendor/select2/dist/css/select2.min.css', 'vendor/select2-bootstrap-css/select2-bootstrap.min.css', 'vendor/selectize/dist/css/selectize.bootstrap3.css']
    }, {
        name: 'ngAside',
        files: ['vendor/angular-aside/dist/js/angular-aside.min.js', 'vendor/angular-aside/dist/css/angular-aside.min.css']
    }, {
        name: 'oitozero.ngSweetAlert',
        files: ['vendor/angular-sweetalert-promised/SweetAlert.min.js']
    }, {
        name: 'tc.chartjs',
        files: ['vendor/tc-angular-chartjs/dist/tc-angular-chartjs.min.js']
    }]
});
