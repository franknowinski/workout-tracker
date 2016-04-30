class BrowseWorkoutPlansController < ApplicationController
  before_action :set_workout_plans, only: [:index]

  def index
    respond_to do |format|
      format.html { render :new }
      format.json { render json: @workout_plans }
    end
  end

  private

  def set_workout_plans
    @workout_plans = WorkoutPlan.where.not('user_id': current_user.id)
  end
end
