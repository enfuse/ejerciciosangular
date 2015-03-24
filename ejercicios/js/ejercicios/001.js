angular.module("angularApp", []).controller("controladorPersonas", function($scope, $http, $log , $window ) {
    $scope.vistaLista = true;
    $scope.vistaFormulario = false;
    $scope.botonVistaFormulario = true;


    var peticion = $http.get("personas");
    peticion.success(function(personas) {
        $scope.personas = personas
    });

	$scope.showForm = function(){
		$scope.vistaFormulario = true;
		console.log("dale");
		$scope.botonVistaFormulario = false;
	}

    $scope.nuevo = function() {
        //$scope.personas.push($scope.personaNueva);
        $scope.personas
        var peticion = $http.post("personas", $scope.personaNueva);
        peticion.success(function(persona) {
            $scope.personas.push(persona);
        });
        $scope.resetPersonaNueva();
    }
    $scope.borrar = function(persona) {
    	if($window.confirm("¿Seguro que quieres borrar?")){
	        var peticion = $http.delete("personas/nombre/" + persona.nombre);
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
});