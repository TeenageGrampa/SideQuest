class CharacterClass < ApplicationRecord
    belongs_to :character

    # validates :character_id, :name, :desc, :hit_dice, :armor_prof, :prof_tools, :prof_weapons, :prof_saving_throws, :prof_skills, :equipment, :spellcast_ability, presence: true
end
