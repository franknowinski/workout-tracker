class ExercisesController < ApplicationController
  before_action :set_exercise, only: [:edit]

  def new
    @exercise = Exercise.new
  end

  def create
    current_user.current_plan.exercises.create(exercise_params)
    redirect_to workout_plan_path(current_user.current_plan)
  end

  private

  def set_exercise
    @exercise = Exercise.find(params[:id])
  end

  def exercise_params
    params.require(:exercise).permit(:muscle_group, :workouts_attributes => [:name, :sets, :reps])
  end
end
