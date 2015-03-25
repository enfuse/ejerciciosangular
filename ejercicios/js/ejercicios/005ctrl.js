modulo.controller('ctrl1', ['$scope',"srv1", function($scope, srv1){
    $scope.nombre=srv1.mayusculas("fulano");
}])