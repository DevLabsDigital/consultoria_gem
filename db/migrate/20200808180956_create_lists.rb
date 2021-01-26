class CreateLists < ActiveRecord::Migration[5.2]
  def change
    create_table :saddlebag_lists do |t|
      t.references :saddlebag_board, null: false, foreign_key: true
      t.integer :status

      t.timestamps
    end
  end
end
