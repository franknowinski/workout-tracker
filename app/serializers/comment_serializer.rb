class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :user, :created_at
end
