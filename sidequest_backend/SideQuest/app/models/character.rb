class Character < ApplicationRecord
    belongs_to :user
    has_many :character_classes
    has_many :character_races
    has_many :character_skills
    has_many :character_stats
    has_many :character_mods
    has_many :party_members
    has_many :games, through: :party_members
    has_many :requests

    validates :name, :level, :alignment, :user_id, presence: true
end
