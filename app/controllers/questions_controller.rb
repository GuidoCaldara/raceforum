class QuestionsController < ApplicationController
  def create
    @question = Question.new(title: params[:question][:title], text: params[:question][:text])
    @question.race_id = params[:race_id]
    @question.user = current_user
    @absolute = "absolute-flash"
    if @question.save
      respond_to do |format|
          format.html { render "races/show" }
          format.js {flash[:success] = "La nuova discussione è stata inserita correttamente!"}
      end
    else
      render :json => {:errors => @course.errors}
    end
  end
end
