module Consultoria
	class Board < ApplicationRecord
	  has_many :lists, dependent: :destroy, foreign_key: 'consultoria_board_id'
	  has_many :tags, dependent: :destroy, foreign_key: 'consultoria_board_id'
	  has_many :protocols, foreign_key: 'consultoria_board_id'
	end
end