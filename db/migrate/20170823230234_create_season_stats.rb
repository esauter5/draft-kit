class CreateSeasonStats < ActiveRecord::Migration[5.1]
  def change
    create_table :season_stats, id: :uuid do |t|
      t.uuid :player_id
      t.integer :season

      t.integer :passing_completions
      t.integer :passing_attempts
      t.integer :passing_yards
      t.integer :passing_tds
      t.integer :passing_ints

      t.integer :rushing_attempts
      t.integer :rushing_yards
      t.integer :rushing_tds

      t.integer :reception
      t.integer :receiving_yards
      t.integer :receiving_tds

      t.integer :targets
      t.integer :two_point_conversions
      t.integer :fumbles
      t.integer :other_tds

      t.timestamps
    end

    add_index :season_stats, [:player_id, :season], unique: true
    add_index :season_stats, :season
  end
end
