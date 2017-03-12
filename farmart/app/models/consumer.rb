class Consumer < ActiveRecord::Base
  has_many :orders, dependent: :destroy
  has_many :products, through: :orders , dependent: :destroy
end
