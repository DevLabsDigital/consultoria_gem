module Consultoria
class Checklist < ApplicationRecord
  belongs_to :card, foreign_key: 'consultoria_card_id'
  has_many :tasks, dependent: :destroy, foreign_key: 'consultoria_checklist_id'
  default_scope ->(){order(:created_at)}
  validates :title, presence: true
end
end