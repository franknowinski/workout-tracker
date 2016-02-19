class WorkoutPlansController < ApplicationController
  before_filter :authenticate_user!, only: [:show]
  before_action :set_workout_plan, only: [:show, :edit, :update]

  def index
    @workout_plans = current_user.workout_plans
  end

  def show
  end

  def new
    WorkoutPlan.create(user_id: current_user.id)
    redirect_to new_workout_plan_exercise_path(current_user.current_plan)
  end

  private

  def set_workout_plan
    @workout_plan = WorkoutPlan.find(params[:id]) if params[:id].present?
  end
end
