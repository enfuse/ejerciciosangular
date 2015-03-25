angular.module("angularApp", ['ngRoute'])

.constant("baseUrl", "http://localhost:3000/")
.config(function($routeProvider, $locationProvider){
    $locationProvider.html5Mode({enabled:true,  
  requireBase: false});
    $routeProvider.when("/add", {
        templateUrl: '/plantillas/e2form.html'
    });
    $routeProvider.when("/ver-compra", {
        templateUrl: '/plantillas/e2compra.html'
    });
    $routeProvider.when("/list", {
        templateUrl: '/plantillas/e2lista.html'
    });
    $routeProvider.otherwise({
        templateUrl: '/plantillas/e2lista.html'
    });
})
.controller("controladorPersonas", 
  function($scope, $http, $log , $location, $window, servicioPersonas) {
    $scope.vistaLista = true;
    $scope.vistaFormulario = false;
    $scope.botonVistaFormulario = true;

    var peticion = servicioPersonas.listaPersonas();
    peticion.success(function(personas) {
        $scope.personas = personas
    });

	$scope.showForm = function(){
	   $location.path('/add');
	}
    $scope.showList = function(){
       $location.path('/');
    }

    $scope.nuevo = function() {    
        var peticion = servicioPersonas.addPersona($scope.personaNueva);
        peticion.success(function(persona) {
            $scope.personas.push(persona);
        });
        $scope.resetPersonaNueva();
        $location.path('/');
    }
    $scope.borrar = function(persona) {
    	if($window.confirm("¿Seguro que quieres borrar?")){
	        var peticion = servicioPersonas.removePersona(persona.nombre);
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

.service('servicioPersonas', function($http){
	this.listaPersonas = function(){
		return $http.get("personas");
	}
	this.addPersona = function(personaNueva){
		return $http.post("personas", personaNueva);
	}
	this.removePersona = function(nombre){
		return $http.delete("personas/nombre/" + nombre);;
	}
})
;