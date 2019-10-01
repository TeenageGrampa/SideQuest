class Request < ApplicationRecord
  belongs_to :game
  belongs_to :dungeon_master
  belongs_to :character
end
