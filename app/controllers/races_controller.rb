class RacesController < ApplicationController
  before_action :set_race, only: [:show, :edit, :update, :destroy, :add_photo]

  def index
    @races = Race.all
  end

  def show
    @city = @race.location.split(",")[0]
    @markers ={ lat: @race.latitude, lng: @race.longitude }
    @reviews = @race.reviews
    @photos_array = []
    @photos = Photo.where(race: @race)
    @photos.each do |photo|
      photo.images.attachments.each  do |att|
        @photos_array << url_for(att)
    end
  end

    #@images = @photos.photos.images.attachments
  end

  def new
    @race = Race.new
  end

  def create
    @race = Race.new(race_params)
    @race.user = User.last
    if @race.save
      redirect_to @race
      flash[:success] = "Grazie per il tuo contributo! #{@race.name} è stata inserita nel database!"
    else
      render :new
    end
  end

  def add_photo
    @race.photos.attach(params[:race][:photos])
    if @race.save
      redirect_to @race
    end
  end


  def edit
  end

  def update
    @race.update(race_params)
    if @race_save
      redirect_to @race
      flash[:success] = " #{@race.name} è stata aggiornata!"
    else
      render :edit
    end

  end

  def destroy
    if @race.destroy
      redirect_to races_path
      flash[:success] = " #{@race.name} La gara è stata eliminata dal database!t"
    else
      render :edit
    end
  end

  def race_params
    params.require(:race).permit(:name, :typo, :distance, :elevation, :last_edition, :next_edition, :location, :organizer, :price, :website, :subscription_link, photos: [])
  end

  def add_photo_params
    params.require(:race).permit(photos: [])
  end

  def set_race
    @race = Race.find(params[:id])
  end
end
