module Saddlebag
class List < ApplicationRecord
  belongs_to :board, foreign_key: 'saddlebag_board_id'
  has_many :cards, -> { order(position: :asc) }, foreign_key: 'saddlebag_list_id'

  enum status: %i[scheduled delayed in_progress completed]
end
end