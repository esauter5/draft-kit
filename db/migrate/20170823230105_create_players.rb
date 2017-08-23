class CreatePlayers < ActiveRecord::Migration[5.1]
  def change
    enable_extension 'pgcrypto'

    create_table :players, id: :uuid do |t|
      t.string :name
      t.string :team
      t.string :position

      t.timestamps
    end

    add_index :players, :name, unique: true
  end
end
