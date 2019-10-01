class CharacterStat < ApplicationRecord
    belongs_to :character

    validates :character_id, :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma, :initiative, :hp, :passive_perception, :proficiency_mod, :armor_class, presence: true
end
