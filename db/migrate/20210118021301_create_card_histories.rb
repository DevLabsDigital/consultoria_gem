class CreateCardHistories < ActiveRecord::Migration[5.2]
  def change
    create_table :consultoria_card_histories do |t|
      t.references :user, null: false, foreign_key: true
      t.references :consultoria_card, null: false, foreign_key: true
      t.string :kind
      t.string :alteration

      t.timestamps
    end
  end
end
