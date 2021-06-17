class AddDeletedAtToBoards < ActiveRecord::Migration[5.2]
    def change
        ## Required
        add_column :consultoria_boards, :deleted_at, :timestamp
        
      end
  end
  