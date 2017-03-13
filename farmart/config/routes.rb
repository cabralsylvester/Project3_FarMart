Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :vendors do
    resources :products do
      resources :orders
      # member do
      #   post "add_to_order"
      #   delete "delete_from_order"
      # end

    end
  end




  #
  # resources :orders do
  #   member do
  #     post "add_product"
  #     delete "delete_product"
  #   end
  # end

  # resources :products do
  #   member do
  #     post "add_to_order"
  #     delete "delete_to_order"
  #   end
  # end
  #
  # resources :orders do
  #   member do
  #     post "add_product"
  #     delete "delete_product"
  #   end
  # end
  root to: redirect("/vendors")

end
