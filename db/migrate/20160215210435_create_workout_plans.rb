class CreateWorkoutPlans < ActiveRecord::Migration
  def change
    create_table :workout_plans do |t|
      # t.text :chest, default: []
      # t.text :back, default: []
      # t.text :legs, default: []
      # t.text :shoulders, default: []
      # t.text :bis, default: []
      # t.text :tris, default: []
      # t.text :cardio, default: []
      # t.text :core, default: []
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
