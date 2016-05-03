function constructMuscleGroup(muscleGroup) {
  return [
    '<div class="row ' + muscleGroup.name.toLowerCase() + '-group table-rows">',
      '<div class="container col-sm-3">',
        '<h2 class="browse-muscle-header">' + muscleGroup.name + '</h2><br>',
      '</div>'
  ].join('');
};

function constructTableHeader() {
  return [
    '<div class="col-sm-8">',
      '<table class="table table-hover clearfix">',
        '<thead>',
          '<tr>',
            '<th class="col-sm-4">Exercise</th>',
            '<th class="col-sm-3">Sets</th>',
            '<th class="col-sm-3">Reps</th>',
          '</tr>',
        '</thead>',
      '<tbody>',
    '</div>'
  ].join('');
};

function constructWorkoutRow(workout) {
  return [
    '<tr class="browse-workout-row">',
      '<td>' + workout.name + '</td>',
      '<td>' + workout.sets + '</td>',
      '<td>' + workout.reps + '</td>',
    '</tr>'
  ].join('');
};

function contstructTable(muscleGroup, workouts) {
  if ($('.' + muscleGroup.name.toLowerCase() + '-group').length == 0){

    var muscleHeader = constructMuscleGroup(muscleGroup),
    workoutsHeader = constructTableHeader(),
    workoutRows = '',
    html;

    workouts.forEach(function(workout){
      workoutRows += constructWorkoutRow(workout);
    });

    html = muscleHeader += workoutsHeader += workoutRows += '</tbody></table></div>';

    $('#browse-plan-table').append(html);
  };
};
