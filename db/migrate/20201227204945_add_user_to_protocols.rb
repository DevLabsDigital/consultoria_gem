class AddUserToProtocols < ActiveRecord::Migration[5.2]
  def change
    add_reference :saddlebag_protocols, :user, null: false, foreign_key: true
  end
end
