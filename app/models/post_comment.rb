class PostComment < ActiveRecord::Base
  attr_accessible :user_name, :email, :site, :post_id, :body
  belongs_to :post
end
