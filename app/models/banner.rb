class Banner < ActiveRecord::Base
  mount_uploader :picture, PictureUploader
  attr_accessible :icon1, :icon2, :icon3, :name, :picture
end
