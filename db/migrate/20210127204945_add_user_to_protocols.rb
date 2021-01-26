class AddUserToProtocols < ActiveRecord::Migration[5.2]
  def change
    add_reference :consultoria_protocols, :user, null: false, foreign_key: true
  end
end
