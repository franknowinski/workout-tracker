class WorkoutPlansController < ApplicationController
  before_action :set_workout_plan, only: [:show, :edit, :update]

  def show
  end
  
  private

  def set_workout_plan
    @workout_plan = WorkoutPlan.find(params[:id])
  end
end
