class AnswersController < ApplicationController
  def create
    @answer = Answer.new(text: params[:answer][:text])
    @answer.user = current_user
    @answer.race_id = params[:race_id].to_i
    @answer.question_id = params[:question_id].to_i
    @absolute = "absolute-flash"
    if @answer.save
      respond_to do |format|
        format.html { render 'races/show' }
        format.js {flash[:success] = "La tua risposta è stata inserita!"}

      end
    end
  end

  def destroy
    @answer = Answer.find(params[:id])
    @absolute = "absolute-flash"
    if @answer.destroy
      respond_to do |format|
        format.html { render 'races/show' }
        format.js {
          flash[:success] = "La tua risposta è stata eliminata correttamente!"
        }
       end
    end
  end
end
