class CreateRaces < ActiveRecord::Migration[5.2]
  def change
    create_table :races do |t|
      t.references :user, foreign_key: true
      t.string :name
      t.string :typo
      t.integer :distance
      t.integer :elevation
      t.date :last_edition
      t.date :next_edition
      t.string :location
      t.string :country
      t.float :latitude
      t.float :longitude
      t.string :organizer
      t.integer :price
      t.string :website
      t.string :subscription_link
      t.float :rating
      t.timestamps
    end
  end
end
