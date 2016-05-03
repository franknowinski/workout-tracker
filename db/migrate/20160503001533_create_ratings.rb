class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.integer :rating
      t.references :user, index: true, foreign_key: true
      t.references :workout_plan, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
