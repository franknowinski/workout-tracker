class ExerciseSerializer < ActiveModel::Serializer
  attributes :id
  has_one :muscle_group, serializer: MuscleGroupSerializer
  has_one :workout_plan, serializer: WorkoutPlanSerializer
  has_many :workouts, serializer: WorkoutSerializer
end
