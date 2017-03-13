
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
  .controller("VendorIndexController", [
    "FarmartFactory",
    VendorIndexControllerFunction
  ])
  .controller("VendorShowController", [
    "FarmartFactory",
    "$stateParams",
    VendorShowControllerFunction
  ])
  // .controller("ProductsIndexController", [
  //   "FarmartFactory",
  //   ProductsIndexControllerFunction
  // ])


function RouterFunction($stateProvider) {
  $stateProvider
  .state("vendorIndex", {
    url: "/vendors",
    templateUrl: "js/ng-views/index.html",
    controller: "VendorIndexController",
    controllerAs: "vm"
  })
  .state("vendorShow", {
    url: "/vendors/:id",
    templateUrl: "js/ng-views/show.html",
    controller: "VendorShowController",
    controllerAs: "vm"
  })
  // .state("productsIndex", {
  //   url: "/farmart/vendors/:id/products",
  //   templateUrl: "js/ng-views/products-index.html",
  //   controller: "ProductsIndexController",
  //   controllerAs: "vm"
  // })
  }

function FarmartFactoryFunction($resource, $stateParams){
  return {
    vendors: $resource("http://localhost:3000/vendors/:id.json", {}, {
      query: {method: "GET", params: {}, isArray: true },
      get: {method: "GET", params: {}, isArray: false}
    }),
    products: $resource("http://localhost:3000/vendors/:vendor_id/products.json", {}, {
      query: {method: "GET", params: {}, isArray: true},
      get: {method: "GET", params: {}, isArray: false}
    })
  }
}

function VendorIndexControllerFunction(FarmartFactory) {
  this.vendors = FarmartFactory.vendors.query();
}

function VendorShowControllerFunction(FarmartFactory, $stateParams) {
  this.vendor = FarmartFactory.vendors.get({id: $stateParams.id})
  this.products = FarmartFactory.products.query({vendor_id: $stateParams.id});
  console.log(this.products)
}






// // eric create &edit vendor
// function FarmartIndexControllerFunction( FarmartFactory ) {
//   this.vendors = FarmartFactory.query();
//   this.newVendor = new FarmartFactory()
//   this.create = function() {
//     this.newVendor.$save(this.newVendor).then( () =>
//     this.newVendor = {} )
//   }
// }
// function FarmartShowControllerFunction(FarmartFactory, $stateParams) {
//   this.vendor = FarmartFactory.get({id: $stateParams.id});
//   this.delete = function(vendor){
//     this.vendor.$remove(vendor)
//     console.log("clicked")
//   }
// }
