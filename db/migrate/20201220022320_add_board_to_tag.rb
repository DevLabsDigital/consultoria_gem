class AddBoardToTag < ActiveRecord::Migration[5.2]
  def change
    add_reference :consultoria_tags, :consultoria_board, null: false, foreign_key: true
  end
end
