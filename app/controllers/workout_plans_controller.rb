class WorkoutPlansController < ApplicationController
  def show
    @workout_plan = WorkoutPlan.find(params[:id])
  end
end
