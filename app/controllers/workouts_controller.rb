class WorkoutsController < ApplicationController
  before_filter :authenticate_user!, only: [:edit]
  before_action :set_workout, only: [:edit, :update]

  def edit
  end

  def update
    @completed = params[:workout][:completed]
    @workout.update(workout_params)
  end

  def destroy
    if current_user.workouts.exists?(params[:id])
      @workout = Workout.find(params[:id]).destroy
    else
      redirect_to root_path, alert: 'Access Denied'
    end
  end

  private

  def set_workout
    @workout = Workout.find(params[:id])
  end

  def workout_params
    params.require(:workout).permit(:name, :sets, :reps, :completed)
  end
end
