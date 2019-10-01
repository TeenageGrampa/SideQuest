class CreateRequests < ActiveRecord::Migration[5.2]
  def change
    create_table :requests do |t|
      t.references :game, foreign_key: true
      t.references :dungeon_master, foreign_key: true
      t.string :message
      t.references :character, foreign_key: true

      t.timestamps
    end
  end
end
