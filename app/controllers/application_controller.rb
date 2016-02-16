class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # def initialize_plan
  #   @workout_plan = current_user.current_plan
  #   if @workout_plan.nil?
  #     @workout_plan = WorkoutPlan.create
  #     @workout_plan.user = current_user
  #     current_user.current_plan = @workout_plan
  #     current_user.save
  #     @workout_plan.save
  #   end
  # end

  def current_plan
    current_user.current_plan
  end
  helper_method :current_plan
end
