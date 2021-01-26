module Saddlebag
class Tag < ApplicationRecord
  belongs_to :board, foreign_key: :saddlebag_board_id
  has_many :taggings, foreign_key: :saddlebag_tag_id 
  has_many :cards, through: :taggings
  validates_uniqueness_of :name
end
end