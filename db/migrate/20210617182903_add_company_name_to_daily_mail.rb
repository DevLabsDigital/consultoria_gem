class AddCompanyNameToDailyMail < ActiveRecord::Migration[5.2]
    def change
        ## Required
        add_column :consultoria_daily_mails, :company_name, :string, default: ""
      end
  end
  