class AddIsMainToUsers < ActiveRecord::Migration[5.2]
    def change
      ## Required
      add_column :consultoria_user_cards, :is_main, :boolean, default: false
      
    end
  end
  
  
  