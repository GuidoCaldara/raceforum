class PhotosController < ApplicationController

  def create
    @photo = Photo.new
    @race = Race.find(params[:race_id])
    @photo.user = current_user
    @photo.race = @race
    @photo.images.attach(params[:photo][:images])
    if @photo.save
      redirect_to @race
        flash[:success] = "Il/i file sono stati caricati correttamente!"
    end
  end
end
