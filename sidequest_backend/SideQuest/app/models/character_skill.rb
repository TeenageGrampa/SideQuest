class CharacterSkill < ApplicationRecord
    belongs_to :character

    validates :character_id, :acrobatics, :animal_handling, :arcana, :athletics, :deception, :history, :insight, :intimidation, :investigation, :medicine, :nature, :perception, :performance, :persuasion, :religion, :sleight_of_hand, :stealth,  presence: true
end
