class Comment < ActiveRecord::Base
  attr_accessible :user_name, :email, :site, :post_id
  belongs_to :post
end
