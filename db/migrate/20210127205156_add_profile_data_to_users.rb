class AddProfileDataToUsers < ActiveRecord::Migration[5.2]
  def change
    ## Required
    add_column :users, :avatar, :string, default: ""
    #add_column :users, :uid, :string, :null => false, :default => ""
#    
    #add_column :users, :encrypted_password, :string, :null => false, :default => ""
#    
    #add_column :users, :reset_password_token, :string
    #add_column :users, :reset_password_sent_at, :datetime
    #add_column :users, :allow_password_change, :boolean, :default => false
#    
    #add_column :users, :remember_created_at, :datetime
#    
    #add_column :users, :confirmation_token, :string
    #add_column :users, :confirmed_at, :datetime
    #add_column :users, :confirmation_sent_at, :datetime
    #add_column :users, :unconfirmed_email, :string # Only if using reconfirmable
#    
    #add_column :users, :name, :string
    #add_column :users, :nickname, :string
    #add_column :users, :image, :string
    #add_column :users, :email, :string
#    
    #add_column :users, :tokens, :json
  end
end


