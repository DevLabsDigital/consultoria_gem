class AddRepliesToComment < ActiveRecord::Migration[5.2]
  def change
    add_column :consultoria_comments, :consultoria_comment_id, :integer
  end
end
