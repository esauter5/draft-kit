class AddConsistencyRatingsToSeasonStats < ActiveRecord::Migration[5.1]
  def change
    add_column :season_stats, :consistency_rating, :float
    add_column :season_stats, :start_percent, :float
    add_column :season_stats, :ppr_start_percent, :float
    add_column :season_stats, :start, :integer
    add_column :season_stats, :stud, :integer
    add_column :season_stats, :stiff, :integer
    add_column :season_stats, :sat, :integer
  end
end
