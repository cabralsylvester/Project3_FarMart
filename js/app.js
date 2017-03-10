
let vendor = [
  {name: "Cest la Pommes", city: "Bayville", state: "VA", website: "#" , image: "http://cdn.rosannadavisonnutrition.com/wp-content/uploads/2015/12/apples.jpeg"  }
]


angular
  .module("farmart", [
    "ui.router",
    "ngResource"
  ])
.config([
  "$stateProvider",
  RouterFunction
])
// .factory("FarmartFactory", [
//   "$resource",
//   FarmartFactoryFunction
// ])
.controller("FarmartIndexController", [
  FarmartIndexControllerFunction
])


function RouterFunction($stateProvider) {
  $stateProvider
  .state("welcome", {
    url: "/farmart",
    templateUrl: "js/ng-views/welcome.html"
  })
  .state("farmartIndex", {
    url: "/farmart/vendors",
    templateUrl: "js/ng-views/index.html",
    controller: "FarmartIndexController",
    controllerAs: "vm"
  })
}

// function FarmartFactoryFunction($resource) {
//   return $resource("#")
// }

function FarmartIndexControllerFunction() {
  this.vendors = vendor
}
