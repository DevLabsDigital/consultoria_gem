module Consultoria
    class DailyMail < ApplicationRecord
        after_create :send_mail
        belongs_to :company
        
        def self.add_mail(properties)
            user = properties[:user]
            alteration = properties[:alteration]
            card = properties[:card]
            created_at = properties[:created_at]

            daily_mail = current_mail_for_user(user)

            daily_mail.add_subject({card: card.title, alteration: alteration, created_at: created_at})
            daily_mail.save
        end

        def self.current_mail_for_user(user)
            debugger
            company = user.user_profile.user.company

            @mail = self.where(email: user.email, company_id: company.id).where("created_at >= ?", Time.now.at_beginning_of_day).first
            if @mail
                return @mail
            else
                return DailyMail.create(email: user.email, company_id: company.id, company_name: company.razao_social)
            end
        end

        def add_subject(subject)
            self.subjects.push(subject)
        end

        def send_mail
            seconds_to_wait = (Time.now.at_beginning_of_day + 7.hours) - Time.now
            UserMailer.with(daily_mail_id: self.id).card_changed.deliver_later!(wait: seconds_to_wait.seconds) 
        end
      
    end
  end