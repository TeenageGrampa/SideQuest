class User < ApplicationRecord
    has_secure_password
    has_many :characters
    has_many :games
    has_many :messages
    has_many :dungeon_masters

    # PASSWORD_FORMAT = /\A
    # (?=.{8,})
    # (?=.*\d)
    # (?=.*\[a-z])
    # (?=.*\[A-Z])
    # /x

    validates :username, uniqueness: true
    validates :password, presence: true
end
