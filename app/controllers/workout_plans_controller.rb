class WorkoutPlansController < ApplicationController
  before_filter :authenticate_user!, only: [:index, :show, :new, :destroy]
  before_action :set_workout_plan, only: [:show, :edit, :update, :destroy]

  def index
    @workout_plans = current_user.workout_plans
  end

  def show
  end

  def new
    WorkoutPlan.create(user_id: current_user.id)
    redirect_to new_workout_plan_exercise_path(current_user.current_plan)
  end

  def destroy
    @workout_plan.destroy
    redirect_to root_path, notice: 'Successfully deleted your workout plan.'
  end

  private

  def set_workout_plan
    @workout_plan = WorkoutPlan.find(params[:id])
  end
end
