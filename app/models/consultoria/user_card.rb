module Consultoria
	class UserCard < ApplicationRecord
	  belongs_to :user, foreign_key: 'user_id'
	  belongs_to :card, foreign_key: 'consultoria_card_id'
	end
end