 class PagesController < ApplicationController
  def index
    @events = Event.limit(4)
    @products = Product.limit(3)
    @services = Service.limit(3)
    @content = About.first
    @banners = Banner.all
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
   
    @message = Message.new(params[:message])
    if @message.valid?

      if UserMailer.new_message(@message).deliver
        UserMailer.new_message_confirmation(@message).deliver
        redirect_to(request.path, :notice => "Seu e-mail fo enviado com sucesso, aguarde, que muito breve vamos te retornar!")
      end
      
    else
      flash.now.alert = "Por favor preencha todos os campos"
      render :new
    end
    
     @banners = Banner.all
  end

end
