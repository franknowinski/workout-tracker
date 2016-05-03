class Rating < ActiveRecord::Base
  belongs_to :workout_plan
  belongs_to :user
end
