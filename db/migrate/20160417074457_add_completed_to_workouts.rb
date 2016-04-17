class AddCompletedToWorkouts < ActiveRecord::Migration
  def change
    add_column :workouts, :completed,  :string
  end
end
