
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
    "$state",
    VendorIndexControllerFunction
  ])
  .controller("VendorShowController", [
    "FarmartFactory",
    "$stateParams",
    "$state",
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
    vendors: $resource("http://localhost:3000/vendors/:id.json", {id: "@id"}, {
      query: {method: "GET", params: {}, isArray: true },
      create: {method: "POST"},
      get: {method: "GET", params: {}, isArray: false},
      update: {method: "PUT", params: {id: "@id"}, isArray: false},
      remove: {method: "DELETE", params: {id: "@id"}}
    }),
    products: $resource("http://localhost:3000/vendors/:vendor_id/products.json", {}, {
      query: {method: "GET", params: {}, isArray: true},
      get: {method: "GET", params: {}, isArray: false}
    })
  }
}

function VendorIndexControllerFunction(FarmartFactory, $state) {
  this.vendors = FarmartFactory.vendors.query();
  this.newVendor = new FarmartFactory.vendors
  this.create = function() {
      this.newVendor.$save(this.newVendor).then( () =>
      this.newVendor = {}, $state.go("vendorIndex") )
      }
}

function VendorShowControllerFunction(FarmartFactory, $stateParams, $state) {
  this.vendor = FarmartFactory.vendors.get({id: $stateParams.id})
  this.products = FarmartFactory.products.query({vendor_id: $stateParams.id});
  console.log(this.products)

  //edit vendor functionality
  this.update = function(vendor){
    this.vendor.$update({id: $stateParams.id}).then( () =>
      $location.path("vendorShow(vendor.id)")
    )
  }

// `delete vendor functionality
  this.vendor.remove = function(vendor){
    this.vendor.$remove({id: $stateParams.id}).then(
     function(vendor) {
    $state.go("vendorIndex")
    })
  }
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
