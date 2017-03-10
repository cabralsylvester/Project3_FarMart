Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :vendors do
    resources :products
  end

  resources :consumers do
    resources :orders
  end

  root to: redirect("/vendors")
end
