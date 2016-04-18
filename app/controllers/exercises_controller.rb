class ExercisesController < ApplicationController
  before_filter :authenticate_user!, only: [:new, :create]

  def new
    @exercise = Exercise.new
    @workout_plan = WorkoutPlan.find(params[:workout_plan_id])
    @all_workout_plans = WorkoutPlan.all.select{ |workout| workout.user_id != current_user.id }
  end

  def create
    @exercise = current_user.workout_plans.find(params[:workout_plan_id]).exercises.create(exercise_params)
    @exercise.workout_plan.update(name: params[:workout_plan][:name]) if @exercise.workout_plan.name.nil?

    respond_to do |format|
      if @exercise.save
        format.html { render :new }
        format.js { }
      else
        format.html { render action: :new }
        format.js { render json: @exercise.errors }
      end
    end

  end

  private

  def exercise_params
    params.require(:exercise).permit(:muscle_group_id, :workouts_attributes => [:name, :sets, :reps])
  end
end
