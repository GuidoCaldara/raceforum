json.array! @races do |race|
  json.extract! race, :id, :name, :race_distance, :next_edition, :price, :latitude, :longitude, :location, :typo, :elevation, :distance_type, :photo_list, :rating
end
