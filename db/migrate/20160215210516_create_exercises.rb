class CreateExercises < ActiveRecord::Migration
  def change
    create_table :exercises do |t|
      t.references :workout_plan, index: true, foreign_key: true
      t.references :muscle_group, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
