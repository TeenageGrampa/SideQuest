class DungeonMaster < ApplicationRecord
  belongs_to :user
  belongs_to :game
  has_many :requests
end
