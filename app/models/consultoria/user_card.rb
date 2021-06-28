module Consultoria
	class UserCard < ApplicationRecord
	  belongs_to :user, foreign_key: 'user_id'
	  belongs_to :card, foreign_key: 'consultoria_card_id'
	  
	  before_save :setup_main
	  after_create :remove_duplicated
	  
	  def setup_main
		if self.is_main
			self.card.user_cards.update_all(is_main: false)
		end
	  end

	  def remove_duplicated
		Consultoria::UserCard.clear_duplications
	  end
	
	  def self.clear_duplications
		duplicated = Consultoria::UserCard.group(:consultoria_card_id, :user_id).having("count(user_id) > 1").count
		duplicated.each do |key,value|
		  consultoria_card_id, user_id = key
		  Consultoria::UserCard.where(consultoria_card_id: consultoria_card_id, user_id: user_id).limit(value - 1).delete_all
		end
	  end
	end
end