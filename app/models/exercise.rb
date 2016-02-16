class Exercise < ActiveRecord::Base
  belongs_to :workout_plan
  has_many :workouts
  # has_one :muscle_group
  # belongs_to :workout
  belongs_to :muscle_group
  # accepts_nested_attributes_for :workouts_attributes

  def muscle_group_id=(muscle_group_id)
    self.muscle_group = MuscleGroup.find(muscle_group_id)
  end

  def workouts_attributes=(workouts)
    workouts.values.each do |workout|
      self.workouts.build(workout) unless workout.values.any?{|info| info == ""}
    end
  end
end
