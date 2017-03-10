class Vendor < ActiveRecord::Base
  has_many :products
  has_many :orders, through :products , dependent: :destroy

end
