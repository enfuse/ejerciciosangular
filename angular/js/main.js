angular.module("ejercicio1app", [])
.controller("ctrlEjercicio1", 
	function($scope){
		$scope.personas = [];
		$scope.profesiones = [{titulo : 'Desarrollador' , especialidades : ['php', 'java','.net']}, 
							{titulo : 'Ingeniero' , especialidades :  ['técnico', 'industrial']}];


		$scope.profesiones = {								'Desarrollador' : {'php' :'PhP', 'java' : 'java','.net' ,'.net'}, 
								'Ingeniero' : {'técnico':'tecnico', 'industrial':'industrial'} 
							};
		$scope.personaNueva = {};
		$scope.personaNueva.nombre = "";
		$scope.personaNueva.profesion = "";

		$scope.nuevo = function(){
			console.log($scope.presonaNueva);
			$scope.personas.push(angular.copy($scope.personaNueva));
		}
		
	}
);


