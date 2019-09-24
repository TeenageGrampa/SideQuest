class CreateCharacterRaces < ActiveRecord::Migration[5.2]
  def change
    create_table :character_races do |t|
      t.references :character
      t.string :name
      t.string :desc
      t.string :age
      t.string :aignment
      t.string :size
      t.integer :speed
      t.string :speed_desc
      t.string :languages
      t.string :vision
      t.string :traits

      t.timestamps
    end
  end
end
