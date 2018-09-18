class Api::V1::RacesController < Api::V1::BaseController
  def index
    @races = Race.all
  end
end
