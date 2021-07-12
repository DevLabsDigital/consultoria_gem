class AddIsInactiveToBoard < ActiveRecord::Migration[5.2]
    def change
        ## Required
        add_column :consultoria_boards, :is_inactive, :boolean, default: false
      end
  end
  