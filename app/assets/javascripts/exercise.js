// $(function(){

  // $('#workout-plan-table').on('click', 'a.delete-workout', function(e){
  //   var workoutPlanId = $(this).data('workout-plan'),
  //   workoutId = $(this).data('workout-id'),
  //   workoutRow = $(this).parents('tr').attr('class'),
  //   url = '/workout_plans/' + workoutPlanId + '/workouts/' + workoutId,
  //   data = assignData(workoutRow);
  //
  //   $.ajax({
  //     type: "PATCH",
  //     url: url,
  //     data: data,
  //     dataType: 'json',
  //     success: function(data){
  //       updateWorkoutRow(data.workout);
  //       updateProgressBar(data.completion);
  //     }
  //   });
  // });

  // $('.create-exercise').click(function(e){
  //   e.preventDefault();
  //   url = $('#new_exercise').attr('action');
  //   $.ajax({
  //     type: "POST",
  //     url: url,
  //     data: {'exercise': 'fail'},
  //     dataType: 'json',
  //     success: function(data){
  //       updateProgressBar(data)
  //     },
  //     error: function(data){
  //       debugger;
  //     }
  //   });
  // });
// });
