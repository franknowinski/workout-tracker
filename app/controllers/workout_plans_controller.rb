class WorkoutPlansController < ApplicationController
  before_filter :authenticate_user!, only: [:index, :new, :destroy]
  before_action :set_workout_plan, only: [:edit, :update, :destroy]

  def index
    @all_workout_plans = WorkoutPlan.all.select{ |workout| workout.user_id != current_user.id }
    @workout_plans = current_user.workout_plans
  end

  def new
    current_user.new_plan
    redirect_to new_workout_plan_exercise_path(current_user.current_plan)
  end

  def destroy
    if @workout_plan.user == current_user
      @workout_plan.destroy
      redirect_to workout_plans_path(current_user), notice: 'Successfully deleted your workout plan.'
    else
      redirect_to root_path, alert: 'Access Denied'
    end
  end

  private

  def set_workout_plan
    @workout_plan = WorkoutPlan.find(params[:id])
  end
end
