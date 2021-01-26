class CreateChecklists < ActiveRecord::Migration[5.2]
  def change
    create_table :saddlebag_checklists do |t|
      t.string :title
      t.references :saddlebag_card, null: false, foreign_key: true

      t.timestamps
    end
  end
end
