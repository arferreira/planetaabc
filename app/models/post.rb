class Post < ActiveRecord::Base
  has_many :post_comments
  belongs_to :category
  mount_uploader :picture, PictureUploader
  attr_accessible :author, :category_id, :content, :excerpt, :title, :picture
end
