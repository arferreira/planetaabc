class PostsController < InheritedResources::Base
  def show
    @post = Post.find(params[:id])
    @comment = @post.post_comments.build(params[:post_comment])
  end
end
