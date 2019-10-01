class CreateCharacterSkills < ActiveRecord::Migration[5.2]
  def change
    create_table :character_skills do |t|
      t.references :character
      t.integer :acrobatics
      t.integer :animal_handling
      t.integer :arcana
      t.integer :athletics
      t.integer :deception
      t.integer :history
      t.integer :insight
      t.integer :intimidation
      t.integer :investigation
      t.integer :medicine
      t.integer :nature
      t.integer :perception
      t.integer :performance
      t.integer :persuasion
      t.integer :religion
      t.integer :sleight_of_hand
      t.integer :stealth
      t.integer :survival

      t.timestamps
    end
  end
end
