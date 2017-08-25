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

ActiveRecord::Schema.define(version: 20170825202706) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "pgcrypto"

  create_table "league_rules", force: :cascade do |t|
    t.string "league_name"
    t.integer "num_qbs"
    t.integer "num_rbs"
    t.integer "num_wrs"
    t.integer "num_tes"
    t.integer "num_flex"
    t.integer "num_def"
    t.integer "num_st"
    t.integer "num_bench"
    t.float "points_per_passing_yard"
    t.float "points_per_int"
    t.float "points_per_passing_td"
    t.float "points_per_2pc"
    t.float "points_per_rushing_yard"
    t.float "points_per_rushing_td"
    t.float "points_per_receiving_yard"
    t.float "points_per_reception"
    t.float "points_per_receiving_td"
    t.float "points_per_fumble"
    t.float "points_per_other_td"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["league_name"], name: "index_league_rules_on_league_name", unique: true
  end

  create_table "players", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.string "team"
    t.string "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "drafted", default: false
    t.boolean "owned", default: false
    t.boolean "keeper", default: false
    t.boolean "watch", default: false
    t.index ["name"], name: "index_players_on_name", unique: true
  end

  create_table "rankings", force: :cascade do |t|
    t.integer "season"
    t.integer "ranking"
    t.string "position_ranking"
    t.integer "average_draft_position"
    t.uuid "player_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["season", "player_id"], name: "index_rankings_on_season_and_player_id", unique: true
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
    t.integer "receptions"
    t.integer "receiving_yards"
    t.integer "receiving_tds"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "outlook"
    t.integer "bye_week"
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
    t.integer "receptions"
    t.integer "receiving_yards"
    t.integer "receiving_tds"
    t.integer "targets"
    t.integer "two_point_conversions"
    t.integer "fumbles"
    t.integer "other_tds"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "consistency_rating"
    t.float "start_percent"
    t.float "ppr_start_percent"
    t.integer "start"
    t.integer "stud"
    t.integer "stiff"
    t.integer "sat"
    t.index ["player_id", "season"], name: "index_season_stats_on_player_id_and_season", unique: true
    t.index ["season"], name: "index_season_stats_on_season"
  end

end
