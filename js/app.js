
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
// .factory("FarmartFactory", [
//   "$resource",
//   FarmartFactoryFunction
// ])
.controller("FarmartIndexCustomerController", [
  FarmartIndexCustomerControllerFunction
])


function RouterFunction($stateProvider) {
  $stateProvider
  .state("welcome", {
    url: "/farmart",
    templateUrl: "js/ng-views/welcome.html"
  })
  .state("farmartIndexCustomer", {
    url: "/farmart/vendors",
    templateUrl: "js/ng-views/index-customerpage.html",
    controller: "FarmartIndexCustomerController",
    controllerAs: "vm"
  })
}

// function FarmartFactoryFunction($resource) {
//   return $resource("#")
// }

function FarmartIndexCustomerControllerFunction() {
  this.vendors = vendor
}
