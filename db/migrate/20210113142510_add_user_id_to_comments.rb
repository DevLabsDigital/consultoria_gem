class AddUserIdToComments < ActiveRecord::Migration[5.2]
  def change
    unless column_exists? :consultoria_comments, :user_id
      add_reference :consultoria_comments, :user, null: true, foreign_key: true
    end
  end
end
