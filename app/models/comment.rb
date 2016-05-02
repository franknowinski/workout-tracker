class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :workout_plan
  validates_presence_of :content
  validates :content, length: { maximum: 250 }
end
