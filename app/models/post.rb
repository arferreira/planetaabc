class Post < ActiveRecord::Base
  attr_accessible :author, :category_id, :content, :excerpt, :title
end
