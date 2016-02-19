class ExercisesController < ApplicationController
  before_filter :authenticate_user!, only: [:new, :create]

  def new
    @exercise = Exercise.new
  end

  def create
    @exercise = Exercise.new

    if params[:exercise][:muscle_group].empty?
      @exercise.errors[:base] << 'Please select a muscle group.'
      render :new
    elsif empty_workouts?
      @exercise.errors[:base] << 'Please enter at least one workout.'
      render :new
    else
      current_user.current_plan.exercises.create(exercise_params)
      redirect_to workout_plan_path(current_user.current_plan), notice: 'Successfully added an exercise to your workout!'
    end
  end

  private

  def emtpy_muscle_group?(params)
    params[:exercise][:muscle_group].empty?
  end

  def empty_workouts?
    params[:exercise][:workouts_attributes].values.all? do |value|
      value.values.all?{|value| value == "" }
    end
  end

  def exercise_params
    params.require(:exercise).permit(:muscle_group, :workouts_attributes => [:name, :sets, :reps])
  end
end
