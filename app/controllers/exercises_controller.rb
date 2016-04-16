class ExercisesController < ApplicationController
  before_filter :authenticate_user!, only: [:new, :create]

  def new
    if !current_user.workout_plans.exists?(params[:workout_plan_id])
      redirect_to root_path, alert: 'Access Denied'
    end
    @exercise = Exercise.new
    @workout_plan = WorkoutPlan.find(params[:workout_plan_id])
  end

  def create
    @exercise = current_user.workout_plans.find(params[:workout_plan_id]).exercises.create(exercise_params)
    @exercise.workout_plan.update(name: params[:workout_plan][:name]) if @exercise.workout_plan.name.nil?

    respond_to do |format|
      if @exercise.save
        format.html { render :new }
        format.js { }
      else
        # format.html { render action: 'new' }
        format.html { redirect_to new_workout_plan_exercise_path(current_plan), notice: 'Failed' }
        format.js { render json: @exercise.errors}
        # format.json { render json: { error: @exercise.errors }, status: 422 }
        # render new_workout_plan_exercise_path(current_plan)
      end
    end

  end

  private

  def exercise_params
    params.require(:exercise).permit(:muscle_group_id, :workouts_attributes => [:name, :sets, :reps])
  end
end
