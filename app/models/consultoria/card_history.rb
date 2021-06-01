module Consultoria
	class CardHistory < ApplicationRecord
	  belongs_to :user
	  belongs_to :card, foreign_key: 'consultoria_card_id'

	  after_save :send_mail_to_users

	  def send_mail_to_users
		card.users.each do |user|
			UserMailer.with(user: user, alteration: self.alteration, card: self.card).card_changed.deliver_now
		end
	  end
	end
end