class WorkoutPlansController < ApplicationController
  before_filter :authenticate_user!, only: [:new, :destroy]
  before_action :set_workout_plan, only: [:show, :edit, :update, :destroy]
  before_action :set_all_workout_plans, only: [:index]

  def index
    @workout_plans = current_user.workout_plans
  end

  def show
    respond_to do |format|
      format.html {render :index}
      format.json {render json: @workout_plan}
    end
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

  def set_all_workout_plans
    @all_workout_plans = WorkoutPlan.where.not('user_id': current_user.id)
  end
end
