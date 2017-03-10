class CreateVendors < ActiveRecord::Migration[5.0]
  def change
    create_table :vendors do |t|
      t.string :name
      t.string :city
      t.string :state
      t.string :website
      t.string :image
      t.timestamp
    end
  end
end
