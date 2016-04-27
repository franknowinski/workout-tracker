class BrowseWorkoutPlansController < ApplicationController


  def index
    @all_workout_plans = WorkoutPlan.all.select{ |workout_plan| workout_plan.user_id != current_user.id }
    respond_to do |format|
      format.html {render :index}
      format.json {
        render json: {
          workouts: @workout_plans,
          all_workouts: @all_workout_plans
        }
      }
    end
  end

  def show
    @exercises = @workout_plan.exercises
    respond_to do |format|
      format.html {render :index}
      format.json {render json: @exercises}
    end
  end
end
