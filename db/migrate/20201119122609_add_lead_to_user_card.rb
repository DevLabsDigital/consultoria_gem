class AddLeadToUserCard < ActiveRecord::Migration[5.2]
  def change
    add_column :saddlebag_user_cards, :lead, :boolean
  end
end
