class AddDateConclusionToCard < ActiveRecord::Migration[5.2]
  def change
    add_column :consultoria_cards, :date_conclusion, :date
  end
end
