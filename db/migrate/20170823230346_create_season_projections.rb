class CreateSeasonProjections < ActiveRecord::Migration[5.1]
  def change
    create_table :season_projections, id: :uuid do |t|
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

      t.integer :receptions
      t.integer :receiving_yards
      t.integer :receiving_tds

      t.timestamps
    end

    add_index :season_projections, [:player_id, :season], unique: true
    add_index :season_projections, :season
  end
end
