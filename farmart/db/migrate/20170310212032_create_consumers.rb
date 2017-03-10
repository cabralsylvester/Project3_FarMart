class CreateConsumers < ActiveRecord::Migration[5.0]
  def change
    create_table :consumers do |t|
      t.string :name
      t.string :city
      t.string :state

      t.timestamps
    end
  end
end
