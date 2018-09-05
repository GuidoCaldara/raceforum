class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.references :user, foreign_key: true
      t.references :race, foreign_key: true
      t.string :title
      t.text :text
      t.integer :path_rating
      t.integer :organization_rating
      t.integer :quality_price_rating
      t.integer :difficulty
      t.timestamps
    end
  end
end
