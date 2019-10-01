class User < ApplicationRecord
    has_secure_password
    has_many :characters
    has_many :games
    has_many :messages
    has_many :dungeon_masters
end
