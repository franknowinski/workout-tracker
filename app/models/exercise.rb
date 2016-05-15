class Exercise < ActiveRecord::Base
  belongs_to :workout_plan
  belongs_to :muscle_group
  has_many :workouts, dependent: :destroy
  before_save :muscle_group_blank?
  before_save :workouts_blank?
  accepts_nested_attributes_for :muscle_group
  accepts_nested_attributes_for :workouts,
                                :reject_if => lambda { |workout| workout.values.all?{|w| w.blank? }}

  def muscle_group_blank?
    if self.muscle_group.blank?
      self.errors.add(:muscle_group, "Please select a muscle group.")
      return false
    end
  end

  def workouts_blank?
    if self.workouts.blank? || workout_blank?
      self.errors.add(:workouts, 'Please populate each field for at least one workout.')
      return false
    end
  end

  def workout_blank?
    workouts.each do |workout|
      return true if workout.name.blank? || workout.sets.blank? || workout.reps.blank?
    end
    false
  end
end
