class CreateMuscleGroups < ActiveRecord::Migration
  def change
    create_table :muscle_groups do |t|
      t.string :name
      # t.references :exercise, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
