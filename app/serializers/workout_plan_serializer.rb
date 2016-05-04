class WorkoutPlanSerializer < ActiveModel::Serializer
  attributes :id, :name, :created_at
  has_many :comments, serializer: CommentSerializer
  has_many :exercises, serializer: ExerciseSerializer
  has_many :ratings, serializer: RatingSerializer
  has_many :workouts, serializer: WorkoutSerializer
end
