module Consultoria
class Tagging < ApplicationRecord
  belongs_to :tag, foreign_key: :consultoria_tag_id
  belongs_to :card, foreign_key: :consultoria_card_id
end
end