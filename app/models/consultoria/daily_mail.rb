module Consultoria
    class DailyMail < ApplicationRecord
        after_create :send_mail
        
        def self.add_mail(properties)
            user = properties[:user]
            alteration = properties[:alteration]
            card = properties[:card]

            daily_mail = current_mail_for_user(user)

            daily_mail.add_subject({card: card.title, alteration: alteration})
            daily_mail.save
        end

        def self.current_mail_for_user(user)
            @mail = self.where(email: user.email).where("created_at >= ?", Time.now.at_beginning_of_day).first
            if @mail
                return @mail
            else
                return DailyMail.create(email: user.email)
            end
        end

        def add_subject(subject)
            self.subjects.push(subject)
        end

        def send_mail
            seconds_to_wait = (Time.now.at_end_of_day - 6.hours) - Time.now 
            UserMailer.with(daily_mail_id: self.id).card_changed.deliver_later!(wait: seconds_to_wait.seconds) 
        end
      
    end
  end