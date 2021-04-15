module Consultoria
	class UserCard < ApplicationRecord
	  belongs_to :user, foreign_key: 'user_id'
	  belongs_to :card, foreign_key: 'consultoria_card_id'
	  
	  before_save :setup_main

	  def setup_main
		if self.is_main
			self.card.user_cards.update_all(is_main: false)
		end
	  end
	end
end