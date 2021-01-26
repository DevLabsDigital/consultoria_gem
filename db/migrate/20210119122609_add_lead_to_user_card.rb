class AddLeadToUserCard < ActiveRecord::Migration[5.2]
  def change
    add_column :consultoria_user_cards, :lead, :boolean
  end
end
