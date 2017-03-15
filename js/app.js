
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
  .controller("ProductShowController", [
     "FarmartFactory",
     "$stateParams",
     "$state",
     ProductShowControllerFunction
   ])
  .controller("OrderShowController", [
    "FarmartFactory",
    "$stateParams",
    OrderShowControllerFunction
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
  .state("productShow", {
    url: "/vendors/:vendor_id/products/:product_id",
    templateUrl: "js/ng-views/product-show.html",
    controller: "ProductShowController",
    controllerAs: "vm"
  })
  .state("orderShow", {
    url: "/vendors/:vendor_id/products/:product_id/orders/:order_id",
    templateUrl: "js/ng-views/orders-show.html",
    controller: "OrderShowController",
    controllerAs: "vm"
  })
}

function FarmartFactoryFunction($resource, $stateParams){
  return {
    vendors: $resource( "http://localhost:3000/vendors/:id.json", {id: "@id"}, {
      query: {method: "GET", params: {}, isArray: true },
      create: {method: "POST"},
      get: {method: "GET", params: {id: "@id"}, isArray: false},
      update: {method: "PUT", params: {id: "@id"}, isArray: false},
      remove: {method: "DELETE", params: {id: "@id"}}
    }),
    products: $resource( "http://localhost:3000/vendors/:vendor_id/products/:product_id.json", {vendor_id:"@vendor_id", product_id: "@product_id"}, {
      query: {method: "GET", params: {}, isArray: true},
      get: {method: "GET", params: {vendor_id: "@vendor_id", product_id: "@product_id"}, isArray: false},
      create: {method: "POST", params: {vendor_id: "@vendor_id"}},
      remove: {method: "DELETE", params: {vendor_id: "@vendor_id", product_id: "@product_id"}},
      update: {method: "PUT", params: {vendor_id: "@vendor_id", product_id: "@product_id"}}
    }),
    orders: $resource("http://localhost:3000/vendors/:vendor_id/products/:product_id/orders/:order_id.json", {vendor_id: "@vendor_id", product_id: "@product_id", order_id: "@order_id"}, {
      query: {method: "GET", params: {vendor_id: "@vendor_id", product_id: "@product_id"}, isArray: true},
      get: {method: "GET", params: {vendor_id: "@vendor_id", product_id: "@product_id", order_id: "@order_id"}, isArray: false},
      create: {method: "POST",params: {vendor_id: "@vendor_id", product_id: "@product_id"}},
      remove: {method: "DELETE", params: {vendor_id: "@vendor_id", product_id: "@product_id", order_id: "@order_id"}},
      update: {method: "PUT", params: {vendor_id: "@vendor_id", product_id: "@product_id", order_id: "order_id"}}
    })
  }
}

function VendorIndexControllerFunction(FarmartFactory, $state) {
  this.vendors = FarmartFactory.vendors.query();
}

 // create new vendor
function VendorNewControllerFunction(FarmartFactory, $state) {
  this.vendor = new FarmartFactory.vendors()
  this.create = function() {
      this.vendor.$save(function(vendor){
      $state.go("vendorShow", {id: vendor.id})
    })
  }
}


function VendorShowControllerFunction(FarmartFactory, $stateParams, $state) {
  this.vendor = FarmartFactory.vendors.get({id: $stateParams.id})
  this.products = FarmartFactory.products.query({vendor_id: $stateParams.id});

  //edit vendor functionality
 this.update = function(vendor){
   this.vendor.$update({id: $stateParams.id}, function(vendor) {
     $state.go($state.current, {}, {reload: true})
   })
 }

 // delete vendor functionality
   this.remove = function(){
     this.vendor.$remove({id: $stateParams.id}, function(){
       $state.go("vendorIndex")
     })
   }

// add product functionality
  this.newProduct = new FarmartFactory.products
   this.create = function() {
     this.newProduct.$save({vendor_id: $stateParams.id}, function(){
       $state.reload()
     })
   }
}


function ProductShowControllerFunction(FarmartFactory, $stateParams, $state) {
  this.vendor = FarmartFactory.vendors.get({id: $stateParams.vendor_id})
  // this.products = FarmartFactory.products.query({vendor_id: $stateParams.vendor_id})
  this.product = FarmartFactory.products.get({vendor_id: $stateParams.vendor_id, product_id: $stateParams.product_id})
  this.orders = FarmartFactory.orders.query({vendor_id: $stateParams.vendor_id, product_id: $stateParams.product_id})


  // delete product functionality
    this.remove = function(vendor, product){
      this.product.$remove({vendor_id: $stateParams.vendor_id, product_id: $stateParams.product_id},
        function(){
          $state.go("vendorShow",{})
        })
    }

  // edit product functionality
    this.update = function(vendor, product){
      this.product.$update({vendor_id: $stateParams.vendor_id, product_id: $stateParams.product_id}, function(){
        $state.go("vendorShow",{vendor_id: this.vendor.id, product_id: this.product.id})
      })
    }

  // add order functionality
    this.newOrder = new FarmartFactory.orders
    this.create = function() {
      this.newOrder.$save({vendor_id: $stateParams.vendor_id, product_id: $stateParams.product_id}). then(() =>
      this.newOrder = {}
    )}
}


function OrderShowControllerFunction(FarmartFactory, $stateParams) {
  this.vendor = FarmartFactory.vendors.get({id: $stateParams.vendor_id})
  this.product = FarmartFactory.products.get({vendor_id: $stateParams.vendor_id, product_id: $stateParams.product_id})
  this.order = FarmartFactory.orders.get({vendor_id: $stateParams.vendor_id, product_id: $stateParams.product_id, order_id: $stateParams.order_id})

  // edit order functionality
    this.update = function(vendor, product, order) {
      this.order.$update({vendor_id: $stateParams.vendor_id, product_id: $stateParams.product_id, order_id: $stateParams.order_id}).then(() =>
        $location.path("productShow(this.product.id)")
      )}

  // delete order functionality
    this.remove = function(vendor, product, order){
      this.order.$remove({vendor_id: $stateParams.vendor_id, product_id: $stateParams.product_id, order_id: $stateParams.order_id}).then(() =>
      $location.path("productShow(this.product.id)")
    )}
}
