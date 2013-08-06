class Banner < ActiveRecord::Base
  mount_uploader :picture, PictureUploader
  mount_uploader :icon1, Icon1Uploader
  mount_uploader :icon3, Icon3Uploader
  mount_uploader :icon2, Icon2Uploader
  attr_accessible :icon1, :icon2, :icon3, :name, :picture, :youtube_url
end
