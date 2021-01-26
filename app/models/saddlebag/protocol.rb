module Saddlebag
class Protocol < ApplicationRecord
  belongs_to :board, foreign_key: 'saddlebag_board_id'
  belongs_to :user
end
end