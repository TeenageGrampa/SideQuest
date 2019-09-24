class CreateCharacterStats < ActiveRecord::Migration[5.2]
  def change
    create_table :character_stats do |t|
      t.references :character
      t.integer :strength
      t.integer :dexterity
      t.integer :constitution
      t.integer :intelligence
      t.integer :wisdom
      t.integer :charisma
      t.integer :armor_class
      t.integer :hp
      t.integer :initiative
      t.integer :passive_perception
      t.integer :proficiency_mod

      t.timestamps
    end
  end
end
