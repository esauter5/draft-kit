class CreateRankings < ActiveRecord::Migration[5.1]
  def change
    create_table :rankings do |t|
      t.integer :season
      t.integer :ranking
      t.string :position_ranking
      t.integer :average_draft_position
      t.uuid :player_id

      t.timestamps
    end

    add_index :rankings, [:season, :player_id], unique: true
  end
end
