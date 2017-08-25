class AddWatchToPlayers < ActiveRecord::Migration[5.1]
  def change
    add_column :players, :watch, :boolean, default: false
  end
end
