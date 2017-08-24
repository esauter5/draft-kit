class CreateLeagueRules < ActiveRecord::Migration[5.1]
  def change
    create_table :league_rules do |t|
      t.string :league_name
      t.integer :num_qbs
      t.integer :num_rbs
      t.integer :num_wrs
      t.integer :num_tes
      t.integer :num_flex
      t.integer :num_def
      t.integer :num_st
      t.integer :num_bench
      t.float :points_per_passing_yard
      t.float :points_per_int
      t.float :points_per_passing_td
      t.float :points_per_2pc
      t.float :points_per_rushing_yard
      t.float :points_per_rushing_td
      t.float :points_per_receiving_yard
      t.float :points_per_reception
      t.float :points_per_receiving_td
      t.float :points_per_fumble
      t.float :points_per_other_td

      t.timestamps
    end

    add_index :league_rules, :league_name, unique: true
  end
end
