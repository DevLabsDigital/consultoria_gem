class AddRepliesToComment < ActiveRecord::Migration[5.2]
  def change
    add_column :saddlebag_comments, :saddlebag_comment_id, :integer
  end
end
