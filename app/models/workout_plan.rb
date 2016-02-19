class WorkoutPlan < ActiveRecord::Base
  belongs_to :user
  has_many :exercises
  has_many :workouts, through: :exercises

  def all_muscle_groups
    self.exercises.collect do |exercise|
      exercise.muscle_group.name.downcase
    end.uniq
  end

  def chest_exercises
    exercises.where(muscle_group_id: 1)
  end

  def back_exercises
    exercises.where(muscle_group_id: 2)
  end

  def legs_exercises
    exercises.where(muscle_group_id: 3)
  end

  def shoulders_exercises
    exercises.where(muscle_group_id: 4)
  end

  def bis_exercises
    exercises.where(muscle_group_id: 5)
  end

  def tris_exercises
    exercises.where(muscle_group_id: 6)
  end

  def abs_exercises
    exercises.where(muscle_group_id: 7)
  end
end
