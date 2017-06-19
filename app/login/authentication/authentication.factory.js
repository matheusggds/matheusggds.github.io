module.exports = function(Base64, $http, $cookies, $rootScope, $timeout){

        var service = {};
 
        service.Login = function (username, password, callback) {
 
            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            $timeout(function(){
                var response = { success: username === 'test' && password === 'test' };
                if(!response.success) {
                    response.message = 'Usuário ou senha incorretos.';
                }
                callback(response);
            }, 1000);
 
 
            /* Use this for real authentication
             ----------------------------------------------*/
            //$http.post('/api/authenticate', { username: username, password: password })
            //    .success(function (response) {
            //        callback(response);
            //    });
 
        };
  
        service.SetCredentials = function (username, password) {
            var authdata = Base64.encode(username + ':' + password);
  
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };
  
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookies.putObject('globals', $rootScope.globals);
        };
  
        service.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookies.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        };
  
        return service;
}