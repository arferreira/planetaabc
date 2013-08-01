class Event < ActiveRecord::Base
  mount_uploader :picture, PictureUploader
  attr_accessible :category, :description, :end_date, :name, :start_date,:picture
end
