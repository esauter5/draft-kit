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

ActiveRecord::Schema.define(version: 20170823230346) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "pgcrypto"

  create_table "players", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.string "team"
    t.string "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_players_on_name", unique: true
  end

  create_table "season_projections", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "player_id"
    t.integer "season"
    t.integer "passing_completions"
    t.integer "passing_attempts"
    t.integer "passing_yards"
    t.integer "passing_tds"
    t.integer "passing_ints"
    t.integer "rushing_attempts"
    t.integer "rushing_yards"
    t.integer "rushing_tds"
    t.integer "reception"
    t.integer "receiving_yards"
    t.integer "receiving_tds"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["player_id", "season"], name: "index_season_projections_on_player_id_and_season", unique: true
    t.index ["season"], name: "index_season_projections_on_season"
  end

  create_table "season_stats", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "player_id"
    t.integer "season"
    t.integer "passing_completions"
    t.integer "passing_attempts"
    t.integer "passing_yards"
    t.integer "passing_tds"
    t.integer "passing_ints"
    t.integer "rushing_attempts"
    t.integer "rushing_yards"
    t.integer "rushing_tds"
    t.integer "reception"
    t.integer "receiving_yards"
    t.integer "receiving_tds"
    t.integer "targets"
    t.integer "two_point_conversions"
    t.integer "fumbles"
    t.integer "other_tds"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["player_id", "season"], name: "index_season_stats_on_player_id_and_season", unique: true
    t.index ["season"], name: "index_season_stats_on_season"
  end

end
