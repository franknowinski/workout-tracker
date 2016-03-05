class Exercise < ActiveRecord::Base
  belongs_to :workout_plan
  belongs_to :muscle_group
  has_many :workouts
  validates_presence_of :muscle_group
  before_save :workouts_present?
  accepts_nested_attributes_for :muscle_group
  accepts_nested_attributes_for :workouts,
                                :reject_if => lambda { |workout| workout.values.all?{|w| w.blank? }}

  def workouts_present?
    if self.workouts.blank?
      self.errors.add(:workouts, "need at least one workout.")
      return false
    end
  end
end
