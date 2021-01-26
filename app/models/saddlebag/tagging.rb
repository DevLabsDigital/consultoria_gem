module Saddlebag
class Tagging < ApplicationRecord
  belongs_to :tag, foreign_key: :saddlebag_tag_id
  belongs_to :card, foreign_key: :saddlebag_card_id
end
end