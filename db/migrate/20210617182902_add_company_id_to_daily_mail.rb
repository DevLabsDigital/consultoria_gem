class AddCompanyIdToDailyMail < ActiveRecord::Migration[5.2]
    def change
        ## Required
        add_column :consultoria_daily_mails, :company_id, :integer
      end
  end
  