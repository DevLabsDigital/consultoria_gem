class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :consultoria_tasks do |t|
      t.references :consultoria_checklist, null: false, foreign_key: true
      t.text :description
      t.boolean :completed
      t.integer :position

      t.timestamps
    end
  end
end
