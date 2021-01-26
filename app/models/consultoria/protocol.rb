module Consultoria
class Protocol < ApplicationRecord
  belongs_to :board, foreign_key: 'consultoria_board_id'
  belongs_to :user
end
end