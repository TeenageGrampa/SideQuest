class Game < ApplicationRecord
  has_one :dungeon_master 
  has_many :party_members
  has_many :messages
  has_many :characters, through: :party_members
  has_many :requests
end
