class Event < ActiveRecord::Base
  mount_uploader :picture, PictureUploader
  belongs_to :category
  attr_accessible :category_id, :description, :end_date, :name, :start_date,:picture
end
