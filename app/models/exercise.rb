class Exercise < ActiveRecord::Base
  belongs_to :workout_plan
  belongs_to :muscle_group
  has_many :workouts

  def muscle_group=(muscle_group_id)
    self.update(muscle_group_id: muscle_group_id)
  end

  def workouts_attributes=(workouts)
    workouts.values.each do |workout|
      self.workouts.create(workout) unless workout.values.all?{|info| info == ""}
    end
  end
end
