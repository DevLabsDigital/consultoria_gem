class RemoveUserFromCards < ActiveRecord::Migration[5.2]
  def change
  	begin
  		remove_reference :consultoria_cards, :user, null: false, foreign_key: true	
  	rescue Exception => e
  		
  	end
    
  end
end
