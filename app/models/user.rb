class User < ActiveRecord::Base
  has_many :reviewses
  has_many :products
  #has_attached_file :avatar, :styles => { :medium => "300x300", :thumb => "100x100" }, :default_url => "/images/:styles/missing.png"
  #validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

  def self.create_with_omniauth(auth)
    create! do |user|
      user.provider = auth['provider']
      user.uid = auth['uid']
      if auth['info']
         user.name = auth['info']['name'] || ""
         user.email = auth['info']['email'] || ""
      end
    end
  end
end
