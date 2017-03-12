class CreateProducts < ActiveRecord::Migration[5.0]
  def change
    create_table :products do |t|
      t.string :category
      t.string :name
      t.integer :amount
      t.string :unit_of_measure
      t.string :image
      t.string :description
      t.timestamps null: false
      t.references :vendor, index: true, foreign_key: true
    end
  end
end
