class AddLongitudeToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :longitude, :float
  end
end
