function assignData(workoutRow){
  status =  workoutRow == "completed" ? 'false' : 'true';
  return {'workout': {'completed': status}};
};

function updateProgressBar(completion){
  $('.progress-bar').attr('style', 'width: ' + completion + '%;');
  $('.progress-bar').text(completion + '%');
};

function updateWorkoutRow(workout){
  $('[data-workout-id="' + workout.id +'"]').toggleClass('completed');
  $('.' + workout.id + '-edit').toggleClass('hide-row');
  $('.' + workout.id + '-delete').toggleClass('hide-row');
};

$(function(){
  $('#workout-plan-table').on('click', '#workout_completed', function(e){

    var workoutPlanId = $(this).data('workout-plan'),
    workoutId = $(this).data('workout-id'),
    workoutRow = $(this).parents('tr').attr('class'),
    url = '/workout_plans/' + workoutPlanId + '/workouts/' + workoutId,
    data = assignData(workoutRow);

    $.ajax({
      type: "PATCH",
      url: url,
      data: data,
      dataType: 'json',
      success: function(data){
        updateWorkoutRow(data.workout);
        updateProgressBar(data.completion);
      }
    });
  });
});
