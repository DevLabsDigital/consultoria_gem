class CreateTaggings < ActiveRecord::Migration[5.2]
  def change
    create_table :saddlebag_taggings do |t|
      t.references :saddlebag_tag, null: false, foreign_key: true
      t.references :saddlebag_card, null: false, foreign_key: true

      t.timestamps
    end
  end
end
