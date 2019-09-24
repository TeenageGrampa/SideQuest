class CreateCharacterMods < ActiveRecord::Migration[5.2]
  def change
    create_table :character_mods do |t|
      t.references :character
      t.integer :strmod
      t.integer :dexmod
      t.integer :conmod
      t.integer :intmod
      t.integer :wismod
      t.integer :chrmod

      t.timestamps
    end
  end
end
