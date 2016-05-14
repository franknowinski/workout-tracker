class WorkoutsController < ApplicationController
  before_filter :authenticate_user!, only: [:edit]
  before_action :set_workout, only: [:edit, :update]
  before_action :set_workout_plan, only: [:update]

  def edit
  end

  def update
    respond_to do |format|
      if @workout.update(workout_params)
        format.js {}
        format.json { render json: {
            completion: @workout_plan.completed_workouts,
            workout: @workout
          }
        }
      else
        format.js {}
        format.json { render json: @workout.errors }
      end
    end
  end

  def destroy
    if @workout = current_user.workouts.find_by(id: params[:id])
      @workout.destroy
    else
      redirect_to root_path, alert: 'Access Denied'
    end
  end

  private

  def set_workout
    @workout = Workout.find(params[:id])
  end

  def set_workout_plan
    @workout_plan = WorkoutPlan.find(params[:workout_plan_id])
  end

  def workout_params
    params.require(:workout).permit(:name, :sets, :reps, :completed)
  end
end
