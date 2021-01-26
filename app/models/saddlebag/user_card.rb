module Saddlebag
	class UserCard < ApplicationRecord
	  belongs_to :user, foreign_key: 'user_id'
	  belongs_to :card, foreign_key: 'saddlebag_card_id'
	end
end