
let vendor = [
  {name: "Cest la Pommes", city: "Bayville", state: "VA", website: "http://www.apple.com/" , image: "http://cdn.rosannadavisonnutrition.com/wp-content/uploads/2015/12/apples.jpeg"  },
  {name: "Cest la Apples", city: "Bayville", state: "VA", website: "http://www.apple.com/" , image: "http://cdn.rosannadavisonnutrition.com/wp-content/uploads/2015/12/apples.jpeg"  }
]

 // need to add FarmartFactoryController once RAILS API is ready
angular
  .module("farmart", [
    "ui.router",
    "ngResource"
  ])
  .config([
  "$stateProvider",
  RouterFunction
  ])
  .controller("FarmartIndexController", [
    FarmartIndexControllerFunction
  ])
  .controller("FarmartShowController", [
    "$stateParams",
    FarmartIndexControllerFunction
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

// function FarmartFactoryFunction($resource){
//   return $resource()
// }

function FarmartIndexControllerFunction() {
  this.vendors = vendor
}

function FarmartShowControllerFunction($stateParams) {
  this.vendor = vendor.get({id: $stateParams.id});
}
