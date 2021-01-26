module Saddlebag
	class CardHistory < ApplicationRecord
	  belongs_to :user
	  belongs_to :card, foreign_key: 'saddlebag_card_id'
	end
end