 class PagesController < ApplicationController
  def index
    @events = Event.limit(4)
    @products = Product.limit(3)
    @services = Service.limit(3)
    @content = About.first
    @banners = Banner.all

    # Feed do blog 

    @feed_posts_blog = feed_blog

    #final feed blog
  end

  def feed_blog
    
    posts = Post.limit(2)

  end

  def about
  	@content = About.first
    @banners = Banner.all
  end

  def products
  	@products = Product.all
    @banners = Banner.all
  end

  def portfolio
    @portfolios = Portfolio.all
    @banners = Banner.all
  end

  def events
    @events = Event.all
    @banners = Banner.all
  end

  def blog
  	# action blog 
    @posts = Post.all
    @banners = Banner.all
  end

  def contact
  	# action contact
 
  end

end
