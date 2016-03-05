class ExercisesController < ApplicationController
  before_filter :authenticate_user!, only: [:new, :create]

  def new
    if !current_user.workout_plans.exists?(params[:workout_plan_id])
      redirect_to root_path, alert: 'Access Denied'
    end
    if current_user != WorkoutPlan.find(params[:workout_plan_id]).user
      redirect_to root_path, alert: 'Access Denied'
    end

    @exercise = Exercise.new
  end

  def create
    # if emtpy_muscle_group? || empty_workouts?
    #   @exercise = Exercise.new
    #   @workouts = @exercise.workouts.build
    #   @exercise.errors[:base] << 'Please select a muscle group and input at least one workout.'
    #   render :new
    # else
      @exercise = current_user.current_plan.exercises.create(exercise_params)
      if @exercise.save
        redirect_to workout_plan_path(current_user.current_plan), notice: 'Successfully added an exercise to your workout!'
      else
        render :new
      end
    # end
  end

  private

  def emtpy_muscle_group?
    params[:exercise][:muscle_group].empty?
  end

  def empty_workouts?
    params[:exercise][:workouts_attributes].values.all? do |value|
      value.values.all?{|value| value == "" }
    end
  end

  def exercise_params
    params.require(:exercise).permit(:muscle_group_id, :workouts_attributes => [:name, :sets, :reps])
  end
end
