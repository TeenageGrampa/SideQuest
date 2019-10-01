class CharacterRace < ApplicationRecord
    belongs_to :character

    # validates :character_id, :name, :desc, :age, :alignment, :size, :speed, :speed_desc, :languages, :vision, :traits, presence: true
end
