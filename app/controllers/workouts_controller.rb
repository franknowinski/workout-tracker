class WorkoutsController < ApplicationController
  before_filter :authenticate_user!, only: [:edit]
  before_action :set_workout, only: [:edit, :update]

  def edit
  end

  def update
    @workout.update(workout_params)
    redirect_to current_user.current_plan
  end

  def destroy
    if current_user == Workout.find(params[:id]).exercise.workout_plan.user
      Workout.find(params[:id]).exercise.destroy
      redirect_to current_user.current_plan, notice: 'Successfully deleted your workout.'
    else
      redirect_to root_path, alert: 'Access Denied'
    end
  end

  private

  def set_workout
    @workout = Workout.find(params[:id])
  end

  def workout_params
    params.require(:workout).permit(:name, :sets, :reps)
  end
end
