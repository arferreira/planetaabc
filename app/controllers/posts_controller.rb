class PostsController < InheritedResources::Base
  def show
    @post = Post.find(params[:id])
    @comment = @post.comments.build(params[:comment])
  end
end
