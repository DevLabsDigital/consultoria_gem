class CreateUserCards < ActiveRecord::Migration[5.2]
  def change
    create_table :consultoria_user_cards do |t|
      t.references :user, null: false, foreign_key: true
      t.references :consultoria_card, null: false, foreign_key: true

      t.timestamps
    end
  end
end
