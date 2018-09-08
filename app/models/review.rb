class Review < ApplicationRecord
    belongs_to :user
    belongs_to :race
    after_create :update_race_rating

    def update_race_rating
      race = self.race
      reviews_number = race.reviews.size
      ratings = race.reviews.pluck(:path_rating, :organization_rating, :quality_price_rating).map! { |e| e.sum }
      ratings.map! { |e| e/3.0}
      race.rating = (ratings.sum / ratings.size).round(1)
      race.save
    end
end
