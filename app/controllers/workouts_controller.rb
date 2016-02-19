class WorkoutsController < ApplicationController
  before_action :set_workout, only: [:edit, :update]

  def edit
  end

  def update
    @workout.update(workout_params)
    redirect_to current_user.current_plan
  end

  def destroy
    binding.pry
  end
  private

  def set_workout
    @workout = Workout.find(params[:id])
  end

  def workout_params
    params.require(:workout).permit(:name, :sets, :reps)
  end
end
