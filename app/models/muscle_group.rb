class MuscleGroup < ActiveRecord::Base
  # belongs_to :workout_plan
  # has_many :workouts
  # accepts_nested_attributes_for :workouts

  # def build_workouts(workouts_params)
  #   workouts_params["workouts_attributes"].values.collect do |workout|
  #     self.workouts.create(workout) unless workout.values.any?{|info| info == ""}
  #   end.compact
  # end

end
