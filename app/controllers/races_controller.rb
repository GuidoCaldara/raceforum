class RacesController < ApplicationController
  before_action :set_race, only: [:show, :edit, :update, :destroy, :add_photo]

  def index
    # @cordinates = Geocoder.search(request.remote_ip).first.coordinates
    # @races = Race.where.not(latitude: nil, longitude: nil)
    # @races = @races.where("next_edition > ? ", Date.today)
    # if params[:location].present?
    #   @races = @races.near(params[:location], 30, order: '')
    #   result = Geocoder.search(params[:location]).first.coordinates
    #   @cordinates = [result[1], result[0] ]
    # end
    # @races = @races.filter_by_type(params[:typo]) if params[:typo].present?
    # @races = @races.filter_by_race_distance(params[:race_distance], @races) if params[:race_distance].present?
    # if (params[:min_date].present? && params[:max_date].present?)
    #   @races = @races.filter_by_min_date(Date.parse params[:min_date]) if (params[:max_date] != "undefined")
    #   @races = @races.filter_by_max_date(Date.parse params[:max_date]) if (params[:max_date] != "undefined" )
    # end
    # @markers = @races.pluck(:id, :latitude, :longitude, :name)
    # @markers.map! {|e| {id:e[0], lat:e[1], lng:e[2], name:e[3]} }
  end

  def show
    @city = @race.location.split(",")[0]
    @markers ={ lat: @race.latitude, lng: @race.longitude }
    @reviews = @race.reviews.order(created_at: :desc)
    @questions = @race.questions.order(created_at: :desc)
    @photos = @race.photo_list
  end

  def new
    @race = Race.new
  end

  def create
    @race = Race.new(race_params)
    @race.user = current_user
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
    params.require(:race).permit(:name, :typo, :race_distance, :elevation, :last_edition, :next_edition, :location, :organizer, :price, :website, :subscription_link, photos: [])
  end

  def add_photo_params
    params.require(:race).permit(photos: [])
  end

  def set_race
    @race = Race.find(params[:id])
  end
end
