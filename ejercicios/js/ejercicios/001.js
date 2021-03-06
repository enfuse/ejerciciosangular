angular.module("angularApp", [])

.controller("controladorPersonas", 
  function($scope, $http, $log , $window, servicioPersonas) {
    $scope.vistaLista = true;
    $scope.vistaFormulario = false;
    $scope.botonVistaFormulario = true;


    var peticion = servicioPersonas.listaPersonas();

    peticion.success(function(personas) {
        $scope.personas = personas
    });

	$scope.showForm = function(){
		$scope.vistaFormulario = true;
		$scope.botonVistaFormulario = false;
	}

    $scope.nuevo = function() {
        //$scope.personas.push($scope.personaNueva);        
        var peticion = servicioPersonas.addPersona($scope.personaNueva);
        peticion.success(function(persona) {
            $scope.personas.push(persona);
        });
        $scope.resetPersonaNueva();
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
        $scope.personaNueva = {
            nombre: '',
            apellidos: '',
            edad: '',
        };
    }
    $scope.resetPersonaNueva();
    //$log.log("hola");
    //$window.alert("alert hola");
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