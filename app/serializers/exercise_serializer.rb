class ExerciseSerializer < ActiveModel::Serializer
  attributes :id
  has_one :muscle_group, serializer: MuscleGroupSerializer
  has_many :workouts, serializer: WorkoutSerializer
end
