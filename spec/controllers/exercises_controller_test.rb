require_relative "../rails_helper.rb"

class ExercisesControllerTest < ActionController::TestCase
  describe "Exercise" do
    it "creates an exercise object" do
        user = User.create(email: 'test@test.com', password: 'password')
        @exercise = Exercise.new
        @exercise.workouts.build(name: 'Bench', sets: 3, reps: 10)
        @exercise.muscle_group = MuscleGroup.create(name: 'Chest');
        @exercise.build_workout_plan(name: 'My First Workout', user_id: user.id)
        @exercise.save

        expect(@exercise.workouts.first).to eq()
    end
  end
end
