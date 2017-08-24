class AddOutlookToSeasonProjections < ActiveRecord::Migration[5.1]
  def change
    add_column :season_projections, :outlook, :string
  end
end
