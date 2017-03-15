class CreateOrders < ActiveRecord::Migration[5.0]
  def change
    create_table :orders do |t|
      t.string :customer_name
      t.string :contact_num
      t.datetime :pick_up_time, :null => false, :default => Time.now
      t.integer :reserve_amount
      t.references :product, index: true, foreign_key: true
      t.timestamps null: false
    end
  end
end
