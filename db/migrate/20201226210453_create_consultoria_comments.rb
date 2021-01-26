class CreateConsultoriaComments < ActiveRecord::Migration[5.2]
  def change
    create_table :consultoria_comments do |t|
      t.references :consultoria_card, null: false, foreign_key: true
      t.text :description

      t.timestamps
    end
  end
end
