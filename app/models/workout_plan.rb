class WorkoutPlan < ActiveRecord::Base
  belongs_to :user
  has_many :exercises
  has_many :workouts, through: :exercises

  MUSCLE = {
    "chest" => 1,
    "back" => 2,
    "legs" => 3,
    "shoulders" => 4,
    "bis" => 5,
    "tris" => 6,
    "abs" => 7,
  }

  def all_muscle_groups
    self.exercises.collect{ |exercise| exercise.muscle_group.name.downcase }.uniq
  end

  def muscle_group_by(name)
    exercises.where(muscle_group_id: MUSCLE[name])
  end

  def created_date
    created_at.strftime("%A, %b %d")
  end
end
