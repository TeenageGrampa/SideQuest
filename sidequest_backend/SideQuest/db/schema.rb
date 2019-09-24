# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_09_23_174153) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "character_classes", force: :cascade do |t|
    t.bigint "character_id"
    t.string "name"
    t.string "desc"
    t.string "hit_dice"
    t.string "armor_prof"
    t.string "prof_weapons"
    t.string "prof_tools"
    t.string "prof_saving_throws"
    t.string "prof_skills"
    t.string "equipment"
    t.string "spellcast_ability"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["character_id"], name: "index_character_classes_on_character_id"
  end

  create_table "character_mods", force: :cascade do |t|
    t.bigint "character_id"
    t.integer "strmod"
    t.integer "dexmod"
    t.integer "conmod"
    t.integer "intmod"
    t.integer "wismod"
    t.integer "chrmod"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["character_id"], name: "index_character_mods_on_character_id"
  end

  create_table "character_races", force: :cascade do |t|
    t.bigint "character_id"
    t.string "name"
    t.string "desc"
    t.string "age"
    t.string "aignment"
    t.string "size"
    t.integer "speed"
    t.string "speed_desc"
    t.string "languages"
    t.string "vision"
    t.string "traits"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["character_id"], name: "index_character_races_on_character_id"
  end

  create_table "character_skills", force: :cascade do |t|
    t.bigint "character_id"
    t.integer "acrobatics"
    t.integer "animal_handling"
    t.integer "arcana"
    t.integer "athletics"
    t.integer "deception"
    t.integer "history"
    t.integer "insight"
    t.integer "intimidation"
    t.integer "investigation"
    t.integer "medicine"
    t.integer "nature"
    t.integer "perception"
    t.integer "performance"
    t.integer "persuasion"
    t.integer "religion"
    t.integer "sleight_of_hand"
    t.integer "stealth"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["character_id"], name: "index_character_skills_on_character_id"
  end

  create_table "character_stats", force: :cascade do |t|
    t.bigint "character_id"
    t.integer "strength"
    t.integer "dexterity"
    t.integer "constitution"
    t.integer "intelligence"
    t.integer "wisdom"
    t.integer "charisma"
    t.integer "armor_class"
    t.integer "hp"
    t.integer "initiative"
    t.integer "passive_perception"
    t.integer "proficiency_mod"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["character_id"], name: "index_character_stats_on_character_id"
  end

  create_table "characters", force: :cascade do |t|
    t.integer "user_id"
    t.string "name"
    t.integer "level"
    t.string "alignment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
