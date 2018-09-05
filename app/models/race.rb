class Race < ApplicationRecord
belongs_to :user
has_many :reviews, dependent: :destroy
has_many :questions, dependent: :destroy
after_validation :geocode

geocoded_by :location  do |obj, results|
    if geo = results.first
      obj.latitude = geo.latitude
      obj.longitude = geo.longitude
      obj.state = geo.address_components[2]["short_name"]
      obj.country = geo.country
    end
end



end
