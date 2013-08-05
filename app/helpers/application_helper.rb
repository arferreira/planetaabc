module ApplicationHelper
  def avatar_url(comment)  
    gravatar_id = Digest::MD5::hexdigest(comment.email).downcase  
    "http://gravatar.com/avatar/#{gravatar_id}.png"  
  end 
end
