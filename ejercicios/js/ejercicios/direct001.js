angular.module("angularApp", [])

.controller('ctrlUno',  function($scope){
    $scope.persona = {};
    $scope.persona.nombre = "Fulano";
    $scope.persona.apellidos = "Detal";
})


.controller('ctrlDos',  function($scope){
    $scope.persona = {};
    $scope.persona.nombre = "Ana";
    $scope.persona.apellidos = "Pérez";
})

.directive("directv1", 
    function(){
        return {
            /**
             * AEC => La directiva se puede aplicar como Elemento, atributo, clase. 
            */
            //restrict:"AEC", 
            //template: "Kaixo directiva!!"
            templateUrl: "plantillas/e2form.html",
            link: function(scope, element, attrs){ //Para modificar el DOM
                //element.text("Hola");
                //element.css("background-color", "red");
                //console.log(attrs.misdatos); // <<-- se pondría <p directiv1 misdatos="loquesea"></p>
                //console.log(scope);
                //element.text(scope.nombre + " " + scope.apellidos);



                element.empty();
                var persona = scope[attrs["directv1"]];
                var propiedadExpersion=attrs["propiedad"];
                console.log(persona);
                //element.text(persona[propiedadExpersion]);
                element.text( //para que funcionen los filtros... un poco guarro
                    scope.$eval(propiedadExpersion,persona));
            }
        }
    })

;