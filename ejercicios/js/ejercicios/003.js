angular.module("angularApp", ['ngRoute'])

.constant("baseUrl", "http://localhost:3000/mantenimientoPersonas003.html")
.config(function($routeProvider, $locationProvider){
    $routeProvider.when("/add", {
        templateUrl: '/plantillas/e3form.html'
    });
    $routeProvider.when("/show/cart/:nombre", {
        controller: 'ctrlCart',
        resolve: {
            async : ['$route', 'srvCompras',
            function($route, srvCompras){
                return srvCompras.listaCompras($route.current.params.nombre);
            }]
        },
        templateUrl: '/plantillas/e3cart.html'
    });
    $routeProvider.when("/list", {
        templateUrl: '/plantillas/e3lista.html'
    });
    $routeProvider.otherwise({
        templateUrl: '/plantillas/e3lista.html'
    });
})
.controller("ctrlPersonas", 
  function($scope, $http, $log , $location, $window, srvPersonas) {
    $scope.vistaLista = true;
    $scope.vistaFormulario = false;
    $scope.botonVistaFormulario = true;

    var peticion = srvPersonas.listaPersonas();
    peticion.success(function(personas) {
        $scope.personas = personas
    });

    $scope.showCart = function(persona){
        $location.path('/show/cart/' + persona.nombre);
    }

	$scope.showForm = function(){
	   $location.path('/add');
	}
    $scope.showList = function(){
       $location.path('/');
    }

    $scope.nuevo = function() {    
        var peticion = srvPersonas.addPersona($scope.personaNueva);
        peticion.success(function(persona) {
            $scope.personas.push(persona);
        });
        $scope.resetPersonaNueva();
        $location.path('/');
    }
    $scope.borrar = function(persona) {
    	if($window.confirm("¿Seguro que quieres borrar?")){
	        var peticion = srvPersonas.removePersona(persona.nombre);
	        peticion.success(function(nombre) {         
	            $scope.personas = $scope.personas.filter(function(persona){            	
	            	return persona.nombre!=nombre;
	            });
	        });
        }
    }
    $scope.resetPersonaNueva = function() {
        $scope.personaNueva = {nombre: '', apellidos: '', edad: ''};
    }
    $scope.resetPersonaNueva();
})

.controller('ctrlCart',  function($scope, $log, $routeParams, async, srvCompras){
   /* var peticion = srvCompras.listaCompras($routeParams.nombre);
    peticion.success(function(cart) {
           $log.log(cart);
        });*/
    $scope.concepto = async.data[0].concepto;
    
})


.service('srvPersonas', function($http){
	this.listaPersonas = function(){
		return $http.get("/personas");
	}
	this.addPersona = function(personaNueva){
		return $http.post("/personas", personaNueva);
	}
	this.removePersona = function(nombre){
		return $http.delete("/personas/nombre/" + nombre);;
	}
})

.service('srvCompras',  function($http){
    this.listaCompras = function(nombre){        
        return $http.get("/personas/cart/" + nombre);    
    }
})

;