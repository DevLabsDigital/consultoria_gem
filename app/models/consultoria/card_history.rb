module Consultoria
	class CardHistory < ApplicationRecord
	  belongs_to :user
	  belongs_to :card, foreign_key: 'consultoria_card_id'

	  after_save :send_mail_to_users

	  def send_mail_to_users
		card.users.each do |notify_user|
			if (notify_user.id != user.id) || notify_user.email.include?("benhur.onrails")
				begin 
					DailyMail.add_mail(user: notify_user, company: user.user_profile.user.company, alteration: self.alteration, created_at: self.created_at, card: self.card)
				rescue => e
					puts e
				end
			end
			# UserMailer.with(user: user, alteration: self.alteration, card: self.card).card_changed.deliver_now
		end
	  end
	end
end