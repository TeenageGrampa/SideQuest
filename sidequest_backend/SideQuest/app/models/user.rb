class User < ApplicationRecord
    has_secure_password
    has_many :characters
    has_many :games
    has_many :messages
    has_many :dungeon_masters

    # PASSWORD_REQUIREMENTS = /\A
    # (?=.{8,})
    # (?=.*\d)
    # (?=.*\[a-z])
    # (?=.*\[A-Z])
    # /x

    validates :username, uniqueness: true
    # validates :password, format: PASSWORD_REQUIREMENTS
end
