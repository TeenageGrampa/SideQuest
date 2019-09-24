class CreateCharacters < ActiveRecord::Migration[5.2]
  def change
    create_table :characters do |t|
      t.integer :user_id
      t.string :name
      t.integer :level
      t.string :alignment

      t.timestamps
    end
  end
end
