 class PagesController < ApplicationController
  def index
  	# action inicial

  end

  def about
  	@content = About.first
  end

  def products
  	# action products
  
  end

  def portfolio

  	# action portfolio
  	
  end

  def events

  	# action eventos
  	
  end

  def blog
  	# action blog 

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
    

  end

end
