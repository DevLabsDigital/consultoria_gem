class CreateTaggings < ActiveRecord::Migration[5.2]
  def change
    create_table :consultoria_taggings do |t|
      t.references :consultoria_tag, null: false, foreign_key: true
      t.references :consultoria_card, null: false, foreign_key: true

      t.timestamps
    end
  end
end
