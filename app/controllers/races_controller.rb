class RacesController < ApplicationController
  before_action :set_race, only: [:show, :edit, :update, :destroy]

  def index
    @races = Race.all
  end

  def show
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
    params.require(:race).permit(:name, :typo, :distance, :elevation, :last_edition, :next_edition, :location, :organizer, :price, :website, :subscription_link)
  end

  def set_race
    @race = Race.find(params[:id])
  end
end

