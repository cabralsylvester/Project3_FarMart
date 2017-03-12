
let vendor = [
  {name: "Cest la Pommes", city: "Bayville", state: "VA", website: "http://www.apple.com/" , image: "http://cdn.rosannadavisonnutrition.com/wp-content/uploads/2015/12/apples.jpeg"  }
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

  .controller("FarmartIndexController", [
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
  }


// function FarmartFactoryFunction($resource){
//   return $resource()
// }

function FarmartIndexControllerFunction() {
  this.vendors = vendor
}
