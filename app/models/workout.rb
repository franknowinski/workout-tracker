class Workout < ActiveRecord::Base
  belongs_to :exercise

  # def workouts_attributes=(workouts)
  #   workouts.values.collect do |workout|
  #     self.class.create(workout) unless workout.values.any?{|info| info == ""}
  #   end
  # end
end
