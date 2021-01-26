class CreateProtocols < ActiveRecord::Migration[5.2]
  def change
    create_table :saddlebag_protocols do |t|
      t.references :saddlebag_board, null: false, foreign_key: true
      t.date :meeting_date
      t.string :meeting_time
      t.string :meeting_place
      t.string :meeting_reponsible
      t.string :meeting_goal
      t.text :description

      t.timestamps
    end
  end
end
