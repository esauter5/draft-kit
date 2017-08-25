class AddByeWeekToSeasonProjection < ActiveRecord::Migration[5.1]
  def change
    add_column :season_projections, :bye_week, :integer
  end
end
