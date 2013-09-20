class ContactController < ApplicationController

  def new
    #@menu = true
   # @message = Message.new
    @banners = Banner.all
  end

  def create

  end
end
