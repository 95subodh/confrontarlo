class CreateProductsreviews < ActiveRecord::Migration
  def change
    create_table :productsreviews do |t|
      t.string :title
      t.text :description
      t.integer :rating
      t.integer :product_id

      t.timestamps
    end
  end
end
