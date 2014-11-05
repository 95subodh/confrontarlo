class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.string :brand
      t.integer :price
      t.text :description
      t.integer :rating

      t.timestamps
    end
  end
end
