class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.string :name
      t.string :explevel
      t.string :rplevel
      t.string :location
      t.string :desc

      t.timestamps
    end
  end
end
