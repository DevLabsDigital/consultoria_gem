module Consultoria
class Tag < ApplicationRecord
  belongs_to :board, foreign_key: :consultoria_board_id
  has_many :taggings, foreign_key: :consultoria_tag_id 
  has_many :cards, through: :taggings
  validates_uniqueness_of :name
end
end