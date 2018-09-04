class Race < ApplicationRecord
belongs_to :user 
has_many :reviews, dependent: :destroy
has_many :questions, dependent: :destroy
geocoded_by :location
#after_validation :geocode
#after_validation :reverse_geocode

reverse_geocoded_by :latitude, :longitude do |obj, results|
  if geo = results.first
    obj.country = geo.country
  end
end



end
