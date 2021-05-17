module Consultoria
  class UserMailer < ApplicationMailer
    def card_changed
      @user = params[:user]
      @alteration = params[:alteration]
      @card = params[:card]
      mail(to: @user.email, subject: "CleverView - Alteração #{@card.title}")
    end
  end
end
