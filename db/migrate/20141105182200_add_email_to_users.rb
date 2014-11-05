class AddEmailToUsers < ActiveRecord::Migration
  def change
      add_column :users, :email, :string
      add_column :users, :location, :text
      add_column :users, :company_name, :string
      add_column :users, :marketer, :boolean
      add_column :users, :rating, :integer
      add_column :users, :image_url, :string
  end
end
