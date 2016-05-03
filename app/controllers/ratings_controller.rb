class RatingsController < ApplicationController
  before_action :set_workout_plan, only: [:create]
  skip_before_filter :verify_authenticity_token, :only => [:create]

  def create
    @workout_plan.ratings.build(rating: params[:rating], user_id: current_user.id)

    respond_to do |format|
      if @workout_plan.save
        format.json { render json: @workout_plan.ratings }
      else
        format.json { render json: @workout_plan.ratings.last.errors.full_messages }
      end
    end
  end

  private

  def set_workout_plan
    @workout_plan = WorkoutPlan.find(params[:workout_plan_id])
  end
end
