class CreateOrders < ActiveRecord::Migration[5.0]
  def change
    create_table :orders do |t|
      t.string :date
      t.string :time
      t.integer :num_of_products
      t.integer :total_price
      t.references :product, index: true, foreign_key: true
      t.references :consumer, index: true, foreign_key: true
      t.timestamps
    end
  end
end
