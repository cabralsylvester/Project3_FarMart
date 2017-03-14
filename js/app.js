
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
    "$stateParams",
    VendorIndexControllerFunction
  ])
  .controller("VendorNewController", [
    "FarmartFactory",
    "$state",
    VendorNewControllerFunction
  ])
  .controller("VendorShowController", [
    "FarmartFactory",
    "$stateParams",
    "$state",
    VendorShowControllerFunction
  ])
  .controller("OrdersIndexController", [
     "FarmartFactory",
     "$stateParams",
     OrdersIndexControllerFunction
   ])




function RouterFunction($stateProvider) {
  $stateProvider
  .state("vendorIndex", {
    url: "/vendors",
    templateUrl: "js/ng-views/index.html",
    controller: "VendorIndexController",
    controllerAs: "vm"
  })
  .state("vendorNew", {
    url: "/vendors/new",
    templateUrl: "js/ng-views/new.html",
    controller: "VendorNewController",
    controllerAs: "vm"
  })
  .state("vendorShow", {
    url: "/vendors/:id",
    templateUrl: "js/ng-views/show.html",
    controller: "VendorShowController",
    controllerAs: "vm"
  })
  .state("ordersIndex", {
    url: "/vendors/:vendor_id/products/:product_id/orders",
    templateUrl: "js/ng-views/orders-index.html",
    controller: "OrdersIndexController",
    controllerAs: "vm"
  })
  }
  // .state("productsIndex", {
  //   url: "/farmart/vendors/:id/products",
  //   templateUrl: "js/ng-views/products-index.html",
  //   controller: "ProductsIndexController",
  //   controllerAs: "vm"
  // })

function FarmartFactoryFunction($resource, $stateParams){
  return {
    vendors: $resource("http://localhost:3000/vendors/:id.json", {id: "@id"}, {
      query: {method: "GET", params: {}, isArray: true },
      create: {method: "POST"},
      get: {method: "GET", params: {id: "@id"}, isArray: false},
      update: {method: "PUT", params: {id: "@id"}, isArray: false},
      remove: {method: "DELETE", params: {id: "@id"}}
    }),
    products: $resource("http://localhost:3000/vendors/:vendor_id/products/:id.json", {}, {
      query: {method: "GET", params: {}, isArray: true},
      get: {method: "GET", params: {}, isArray: false}
    }),
    orders: $resource("http://localhost:3000/vendors/:vendor_id/products/:product_id/orders.json", {vendor_id: "@vendor_id", product_id: "@product_id"}, {
      query: {method: "GET", params: {vendor_id: "@vendor_id", product_id: "@product_id"}, isArray: true},
      get: {method: "GET", params: {vendor_id: "@vendor_id", product_id: "@product_id"}, isArray: false}
    })
  }
}

function VendorIndexControllerFunction(FarmartFactory, $stateParams) {
  this.vendors = FarmartFactory.vendors.query();
}

function VendorNewControllerFunction(FarmartFactory, $state) {
  this.vendor = new FarmartFactory.vendors
  this.create = function() {
      this.vendor.$save(function(vendor){
        $state.go("vendorShow", {id: vendor.id})
      })
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
    this.vendor.$remove({id: $stateParams.id}, function () {
      $state.go("vendorIndex")
    })
  
  }
}


function OrdersIndexControllerFunction(FarmartFactory, $stateParams) {
  // this.vendor = FarmartFactory.vendors.get({id: $stateParams.id})
  this.products = FarmartFactory.products.query({vendor_id: $stateParams.vendor_id})
  this.orders = FarmartFactory.orders.query({vendor_id: $stateParams.vendor_id, product_id: $stateParams.product_id});

}
