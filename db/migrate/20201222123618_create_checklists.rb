class CreateChecklists < ActiveRecord::Migration[5.2]
  def change
    create_table :consultoria_checklists do |t|
      t.string :title
      t.references :consultoria_card, null: false, foreign_key: true

      t.timestamps
    end
  end
end
