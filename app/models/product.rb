class Product < ActiveRecord::Base
  belongs_to :user
  has_many :reviewses

  def self.search(query)
    where("name like ?", "%#{query}%")
  end
end


