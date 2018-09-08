class PhotosController < ApplicationController

  def create
    @photo = Photo.new
    @race = Race.find(params[:race_id])
    @photo.user = User.first
    @photo.race = @race
    @photo.images.attach(params[:photo][:images])
    if @photo.save
      redirect_to @race
    end
  end
end
