module Consultoria
	class CardHistory < ApplicationRecord
	  belongs_to :user
	  belongs_to :card, foreign_key: 'consultoria_card_id'
	end
end