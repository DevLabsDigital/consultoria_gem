module Saddlebag
	class Board < ApplicationRecord
	  has_many :lists, dependent: :destroy, foreign_key: 'saddlebag_board_id'
	  has_many :tags, dependent: :destroy, foreign_key: 'saddlebag_board_id'
	  has_many :protocols, foreign_key: 'saddlebag_board_id'
	end
end