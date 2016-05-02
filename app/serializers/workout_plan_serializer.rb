class WorkoutPlanSerializer < ActiveModel::Serializer
  attributes :id, :name, :created_at
  has_many :comments, serializer: CommentSerializer
  has_many :exercises, serializer: ExerciseSerializer
end
