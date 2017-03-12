
let vendor = [
  {name: "Cest la Pommes", city: "Bayville", state: "VA", website: "http://www.apple.com/" , image: "http://cdn.rosannadavisonnutrition.com/wp-content/uploads/2015/12/apples.jpeg"  },
  {name: "Cest la Apples", city: "Bayville", state: "VA", website: "http://www.apple.com/" , image: "http://cdn.rosannadavisonnutrition.com/wp-content/uploads/2015/12/apples.jpeg"  }
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
  .factory("FarmartFactory", [
    "$resource",
    FarmartFactoryFunction
  ])
  .controller("FarmartIndexController", [
    "FarmartFactory",
    FarmartIndexControllerFunction
  ])
  .controller("FarmartShowController", [
    "FarmartFactory",
    "$stateParams",
    FarmartShowControllerFunction
  ])




function RouterFunction($stateProvider) {
  $stateProvider
  .state("farmartIndex", {
    url: "/farmart",
    templateUrl: "js/ng-views/index.html",
    controller: "FarmartIndexController",
    controllerAs: "vm"
  })
  .state("farmartShow", {
    url: "/farmart/:id",
    templateUrl: "js/ng-views/show.html",
    controller: "FarmartShowController",
    controllerAs: "vm"
  })
  }

function FarmartFactoryFunction($resource){
  return $resource("http://localhost:3000/vendors/:id.json")
}

function FarmartIndexControllerFunction(FarmartFactory) {
  this.vendors = FarmartFactory.query();
}

function FarmartShowControllerFunction(FarmartFactory, $stateParams) {
  this.vendor = FarmartFactory.get({id: $stateParams.id});
}
