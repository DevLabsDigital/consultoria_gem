class AddCompanyIdToBoards < ActiveRecord::Migration[5.2]
  def change
    ## Required
    add_column :consultoria_boards, :company_id, :integer
    
  end
end


