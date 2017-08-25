class AddOwnedToPlayer < ActiveRecord::Migration[5.1]
  def change
    add_column :players, :owned, :boolean, default: false
  end
end
