class Product < ActiveRecord::Base
  belongs_to :vendor
  belongs_to :order
  has_many :orders
  has_many :consumers, through: :orders
end
