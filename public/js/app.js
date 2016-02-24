var app = angular.module("GamifyDevMountain", ['ui.router'])

    .config(function ($stateProvider, $urlRouterProvider) {

        var adminState = {
            name: 'admin',
            url: '/administrator',
            templateUrl: 'html/admin.html',
            controller: 'adminCtrl'
        };

        var studentState = {
            name: 'student',
            url: '/student',
            templateUrl: 'html/student.html',
            controller: 'studentCtrl'
        };

        var mainState = {
            name: 'main',
            url: '/main',
            templateUrl: 'html/main.html',
            controller: 'mainCtrl',
            resolve: {
                user: function (authService, $state) {
                    return authService.getCurrentUser().then(function (response) {
                        if (response.status != 200) {
                            $state.go('login')
                        }
                        console.log(response);
                        return response.data;
                    })
                    console.log('Resolve in "order"');
                }
            }
        };

$stateProvider
    .state(mainState)
    .state(adminState)
    .state(studentState)

$urlRouterProvider.otherwise('/main');
    });