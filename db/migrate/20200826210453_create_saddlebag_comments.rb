class CreateSaddlebagComments < ActiveRecord::Migration[5.2]
  def change
    create_table :saddlebag_comments do |t|
      t.references :saddlebag_card, null: false, foreign_key: true
      t.text :description

      t.timestamps
    end
  end
end
