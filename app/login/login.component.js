var login = {
	templateUrl: './app/login/login.html',
	controller: function($scope, $rootScope, $location, AuthenticationService){

		vm = this;
		vm.title = 'Faça seu login';

		$scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function(response) {
                if(response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                    vm.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
	}
}

module.exports = login;