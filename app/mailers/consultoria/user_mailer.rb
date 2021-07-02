
module Consultoria
  class UserMailer < ApplicationMailer
    def card_changed
      @daily_mail = DailyMail.find(params[:daily_mail_id])
      @email = @daily_mail.email
      @subjects = @daily_mail.subjects
      
      mail(to: @email, subject: "CleverView - Alteração #{@daily_mail.company_name}")
    end
  end
end
