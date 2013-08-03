class Category < ActiveRecord::Base
  attr_accessible :name
  has_many :events
  has_many :posts
end