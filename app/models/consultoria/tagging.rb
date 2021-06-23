module Consultoria
class Tagging < ApplicationRecord
  belongs_to :tag, foreign_key: :consultoria_tag_id
  belongs_to :card, foreign_key: :consultoria_card_id
  
  after_save :remove_duplicated

  def remove_duplicated
    Consultoria::Tagging.clear_duplications
  end

  def self.clear_duplications
    duplicated = Consultoria::Tagging.group(:consultoria_card_id, :consultoria_tag_id).having("count(consultoria_tag_id) > 1").count
    duplicated.each do |key,value|
      consultoria_card_id, consultoria_tag_id = key
      Consultoria::Tagging.where(consultoria_card_id: consultoria_card_id, consultoria_tag_id: consultoria_tag_id).limit(value - 1).delete_all
    end
  end

end
end