class AddBoardToTag < ActiveRecord::Migration[5.2]
  def change
    add_reference :saddlebag_tags, :saddlebag_board, null: false, foreign_key: true
  end
end
