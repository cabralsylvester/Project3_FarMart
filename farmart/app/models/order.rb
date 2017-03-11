class Order < ApplicationRecord::Base
  has_many :products
  has_many :vendors, through: :products
  belongs_to :consumer
  belong_to :product
end
