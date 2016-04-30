//= require jquery
//= require jquery_ujs

function contstructTable(muscleGroup, workouts) {
  if ($('.' + muscleGroup.name.toLowerCase() + '-group').val() == undefined){
    var muscleHeader ='<div class="row ' + muscleGroup.name.toLowerCase() + '-group"><div class="container col-sm-3"><h2 id="table-muscle-header">' + muscleGroup.name + '</h2><br></div>';

    var workoutsHeader = '<div class="col-sm-8"><table class="table table-hover clearfix"><thead><tr><th class="col-sm-4">Exercise</th><th class="col-sm-3">Sets</th><th class="col-sm-3">Reps</th></tr></thead><tbody></div>';

    var workoutRows = '';

    workouts.forEach(function(workout){
      workoutRows += '<tr><td>' + workout.name + '</td><td>' + workout.sets + '</td><td>' + workout.reps + '</td></tr>';
    })

    var html = muscleHeader += workoutsHeader += workoutRows += '</tbody></table></div>';

    $('#browse-table').append(html);
  };
}


function attachListeners(){

  $('#browse-plan-item').on('click', 'a.browse-plan-link', function(e){
    e.preventDefault();
    var formAction = $(this).attr('href');
    $('#workout-plans-index').hide();
    $('div.hidden-table').removeClass('hidden-table');
    $('#workout-plans-header').html($(this).text());

    $.getJSON(formAction, function(data){
      data.workout_plans.forEach(function(workout){
        var muscleGroup = workout.muscle_group;
        var workouts = workout.workouts;
        var workoutPlan = workout.workout_plan;

        contstructTable(muscleGroup, workouts);
      })
    });
  });

  // Clear validation error messages after successful request
  $('#new_exercise').bind("ajax:success", function(evt, xhr, status, error){
    $('div.field_with_errors').html("");
  });

  // Display error messages
  $('#new_exercise').bind("ajax:error", function(evt, xhr, status, error){

    var $form = $(this), errorText = '', errors;
    try {
      // Populate errorText with the comment errors
      errors = $.parseJSON(xhr.responseText);
    } catch(err) {
      // If the responseText is not valid JSON (like if a 500 exception was thrown), populate errors with a generic error message.
      errors = {message: "Please reload the page and try again"};
    }
    for ( error in errors ) {
      errorText += "<li>" + errors[error] + "</li>";
    }
    $form.find('div.field_with_errors').html(errorText);
  });

  $('tbody').on('click', 'a.edit-link', function(event){
    event.preventDefault();
    var workoutRow = $(this).parents('#workout-rows');

    // Hide workout values and display edit workout input form
    $('span', workoutRow).addClass('hide-row');
    $('#edit-form-instruction').removeClass('hide-row');
    $('input', workoutRow).attr('id', 'edit-workout');
  });

  $('#browse-plan-item #browse-workouts-link').click(function(e){
    e.preventDefault();
    var formAction = $(this).attr('href');

    $.getJSON(formAction, function(data){
      $('#browse-workouts-link').hide();

      data.browse_workout_plans.forEach(function(workout_plan){
        var html = '<h4><a href="/workout_plans/' + workout_plan.id + '" class="browse-plan-link">' + workout_plan.name + '</a></h4>'
        $('#browse-plan-item').append(html);
      });
    });
  });

  // Abstracted away to use Remote True - create exercise form
  // $('.exercise-form').submit(function(event){
  //   event.preventDefault();
  //   var form_method = $(this).attr('method');
  //   var form_action = $(this).attr('action');
  //
  //   $.ajax(form_action, {
  //     type: form_method,
  //     dataType: 'script',
  //     data: $(this).serialize()
  //   })
  // });

  // $('tbody td a').click(function(event){
  //   event.preventDefault();
  //
  //   // REMOVED TO USE REMOTE TRUE
  //   // var method = $(this).data('method');
  //   // var deleteURL = $(this).attr('href');
  //   //
  //   // $.ajax(deleteURL, {
  //   //   type: method,
  //   //   dataType: 'script',
  //   // })
  // });

  // $('tbody').on('blur', 'a.edit-link', function(){
  //   var workoutRow = $(this).parents('tr')
  //
  //   // Display workout values and hide edit workout input form
  //   $('span', workoutRow).removeClass('hide-row');
  //   $('input', workoutRow).removeAttr('id');
  // });
}

$(function(){
  attachListeners();
})
