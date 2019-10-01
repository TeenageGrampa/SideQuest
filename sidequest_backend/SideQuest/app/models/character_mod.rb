class CharacterMod < ApplicationRecord
    belongs_to :character

    validates :character_id, :strmod, :conmod, :dexmod, :intmod, :wismod, :chrmod, presence: true
end
