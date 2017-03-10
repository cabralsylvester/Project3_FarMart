class Order < ApplicationRecord::Base
  has_many :products
  has_many :vendors, through: :products, dependent: :destroy
end
