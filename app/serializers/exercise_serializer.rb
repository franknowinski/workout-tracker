class ExerciseSerializer < ActiveModel::Serializer
  attributes :id, :workout_plan_id, :muscle_group_id
end
