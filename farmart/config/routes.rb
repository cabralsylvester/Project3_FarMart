Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :vendors do
    resources :products
  end

  resources :consumers do
    resources :orders
  end

  resources :products do
    member do
      post "add_order"
      delete "delete_order"
    end
  end

  resources :orders do
    member do
      post "add_product"
      delete "delete_product"
    end
  end
  root to: redirect("/vendors")

end
