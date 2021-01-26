module Saddlebag
class Checklist < ApplicationRecord
  belongs_to :card, foreign_key: 'saddlebag_card_id'
  has_many :tasks, dependent: :destroy, foreign_key: 'saddlebag_checklist_id'
  
  validates :title, presence: true
end
end