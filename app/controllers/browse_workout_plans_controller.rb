class BrowseWorkoutPlansController < ApplicationController
  before_action :set_workout_plans, only: [:index]

  def index
  end

  private

  def set_workout_plans
    @workout_plans = WorkoutPlan.where.not('user_id': current_user.id)
  end
end
