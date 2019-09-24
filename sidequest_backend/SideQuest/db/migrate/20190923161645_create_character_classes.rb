class CreateCharacterClasses < ActiveRecord::Migration[5.2]
  def change
    create_table :character_classes do |t|
      t.references :character
      t.string :name
      t.string :desc
      t.string :hit_dice
      t.string :armor_prof
      t.string :prof_weapons
      t.string :prof_tools
      t.string :prof_saving_throws
      t.string :prof_skills
      t.string :equipment
      t.string :spellcast_ability

      t.timestamps
    end
  end
end
