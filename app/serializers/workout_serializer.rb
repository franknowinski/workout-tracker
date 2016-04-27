class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :name, :sets, :reps, :completed
end
