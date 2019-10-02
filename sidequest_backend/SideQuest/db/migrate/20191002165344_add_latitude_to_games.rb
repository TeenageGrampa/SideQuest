class AddLatitudeToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :latitude, :float
  end
end
