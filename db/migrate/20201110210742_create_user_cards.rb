class CreateUserCards < ActiveRecord::Migration[5.2]
  def change
    create_table :saddlebag_user_cards do |t|
      t.references :user, null: false, foreign_key: true
      t.references :saddlebag_card, null: false, foreign_key: true

      t.timestamps
    end
  end
end
