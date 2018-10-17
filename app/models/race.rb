class Race < ApplicationRecord
belongs_to :user
has_many :reviews, dependent: :destroy
has_many :questions, dependent: :destroy
has_many :photos

after_validation :geocode
before_save :set_distance_type

geocoded_by :location do |obj, results|
  if geo = results.first
      obj.latitude = geo.latitude
      obj.longitude = geo.longitude
      obj.state = geo.address_components[2]["short_name"]
      obj.country = geo.country
    end
end

 scope :filter_by_type, -> (array) { where(typo: array) }
 scope :filter_by_min_date, -> (date) {where("next_edition > ?", date) }
 scope :filter_by_max_date, -> (date) {where("next_edition < ?", date) }

 def short_name
   "#{self.name[0..20]}..." if self.name.length > 25
 end

  def set_distance_type
    if self.race_distance <= 21
      self.distance_type = "short"
    elsif self.race_distance <= 42
      self.distance_type = "medium"
    elsif self.race_distance <= 100
      self.distance_type = "long"
    else
      self.distance_type = "ultra"
    end
  end


  def photo_list
    photos_array = []
    photos= Photo.where(race: self)
    photos.each do |photo|
      photo.images.attachments.each  do |att|
        photos_array << Rails.application.routes.url_helpers.rails_blob_path(att, only_path: true)
    end
  end
  return photos_array
  end

  def self.filter_by_race_distance(array, races)
    races_ids = []
    array.each_slice(1).to_a.each do |a|
      my_races = races
      min = a.join("").split(",")[0].to_i
      max = a.join("").split(",")[1].to_i
      my_races = my_races.where("race_distance > ?", min).where("race_distance < ?", max)
      races_ids << my_races.pluck(:id)
    end
    races.where(id: races_ids.flatten)
  end
end
