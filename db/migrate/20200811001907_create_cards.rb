class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :saddlebag_cards do |t|
      t.references :saddlebag_list, null: false, foreign_key: true
      t.string :title
      t.string :status
      t.text :description
      t.string :files
      t.integer :position, default: 0, null: false
      t.date :start_date
      t.date :finish_date

      t.timestamps
    end
  end
end
