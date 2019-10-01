class CreateDungeonMasters < ActiveRecord::Migration[5.2]
  def change
    create_table :dungeon_masters do |t|
      t.references :user, foreign_key: true
      t.references :game, foreign_key: true
      t.string :name

      t.timestamps
    end
  end
end
