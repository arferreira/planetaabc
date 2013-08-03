class Post < ActiveRecord::Base
  mount_uploader :picture, PictureUploader
  attr_accessible :author, :category_id, :content, :excerpt, :title, :picture
end
