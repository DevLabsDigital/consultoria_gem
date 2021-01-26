class RemoveMeetingResponsibleFromProtocols < ActiveRecord::Migration[5.2]
  def change
  	begin
  		remove_column :saddlebag_protocols, :meeting_reponsible	
  	rescue Exception => e
  		
  	end
    
  end
end
