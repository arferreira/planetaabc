class Portfolio < ActiveRecord::Base
  belongs_to :category
  mount_uploader :picture, PictureUploader
  attr_accessible :description, :picture, :title, :category_id
end
