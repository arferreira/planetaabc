class PostCommentsController < InheritedResources::Base
  def new
    @comment = PostComment.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @comment }
    end
  end

  # POST /badges
  # POST /badges.json
  def create
    @post = Post.find(params[:post_comment][:post_id])
    @comment = @post.post_comments.build(params[:post_comment])

    respond_to do |format|
      if @comment.save
        format.html { redirect_to @post, notice: 'Badge was successfully created.' }
        format.json { render json: @comment, status: :created, location: @comment }
      else
        format.html { render action: "new" }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end
end
