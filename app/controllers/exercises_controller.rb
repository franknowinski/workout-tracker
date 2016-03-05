class ExercisesController < ApplicationController
  before_filter :authenticate_user!, only: [:new, :create]

  def new
    if !current_user.workout_plans.exists?(params[:workout_plan_id])
      redirect_to root_path, alert: 'Access Denied'
    end

    @exercise = Exercise.new
  end

  def create
    @exercise = current_user.current_plan.exercises.create(exercise_params)
    if @exercise.save
      redirect_to workout_plan_path(current_user.current_plan), notice: 'Successfully added an exercise to your workout!'
    else
      render :new
    end
  end

  private

  def exercise_params
    params.require(:exercise).permit(:muscle_group_id, :workouts_attributes => [:name, :sets, :reps])
  end
end
