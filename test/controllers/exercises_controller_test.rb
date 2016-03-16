require 'test_helper'

class ExercisesControllerTest < ActionController::TestCase
  describe "Exercise" do
    it "creates an exercise object" do
        @exercise = Exercise.new
        @workouts = Workout.create(name: 'Bench', sets: 3, reps: 10);
        @exercise.workouts = @workouts
        @exercise.muscle_group = MuscleGroup.find(1);
        binding.pry
    end
  end
end
