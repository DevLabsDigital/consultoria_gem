class CreateDailyMail < ActiveRecord::Migration[5.2]
    def change
      create_table :consultoria_daily_mails do |t|
        
        t.string :email
        t.json :subjects, array: true, default: []
  
        t.timestamps
      end
    end
  end
  