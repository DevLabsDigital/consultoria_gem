class AddUserToCard < ActiveRecord::Migration[5.2]
  def change
    add_reference :consultoria_cards, :user, null: true, foreign_key: true
  end
end
