class ReviewsController < ApplicationController
  def create
    @review = Review.new(review_params)
    @race = Race.find(params[:race_id])
    @review.race = @race
    @review.user = User.first
    if @review.save
      respond_to do |format|
          format.html { render "races/show" }
          format.js
      end
    end
  end

  def review_params
    params.require(:review).permit(:title, :text, :path_rating, :organization_rating, :quality_price_rating, :difficulty )
  end
end
