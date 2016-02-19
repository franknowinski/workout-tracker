class Workout < ActiveRecord::Base
  belongs_to :exercise
  validates_presence_of :name, :sets, :reps
end
