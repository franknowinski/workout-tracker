// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs


function contstructTableHead(muscleGroup) {
  if ($('.' + muscleGroup.name.toLowerCase() + '-group').val() == undefined){
    var html = '<div class="row ' + muscleGroup.name.toLowerCase() + '-group"><div class="container col-sm-3"><h2 id="table-muscle-header">' + muscleGroup.name + '</h2><br></div>';

    $('.browse-table').append(html);
  };
}

function attachListeners(){

  $('.browse-plan-container ').on('click', 'a.browse-workout-plan', function(){
    event.preventDefault();
    var url = $(this).attr('href');
    $.getJSON(url, function(res){

      res.workout_plans.forEach(function(exercises){
        var muscleGroup = exercises.muscle_group;
        var workouts = exercises.workouts;
        var workoutPlan = exercises.workout_plan;

        // Workout Plan Name
        $('.browse-plan-header').html(workoutPlan.name);

        contstructTableHead(muscleGroup);
        debugger;
      })

        // Muscle Group
        // var muscleRow = '<div class="row" id="' + muscleGroup.name + '-group"><div class="container col-sm-3"><h2 id="table-muscle-header" class="browse-plan-muscle">' + muscleGroup.name + '</h2></div>'
        //
        // debugger;
        // $('#workout-plans-header').append(muscleRow);
        //
        // '<h2 class="' + muscleGroup.name + '-group" id="table-muscle-header"> ' + muscleGroup.name + '</h2>'
        // $('.muscle-header').append(muscleGroup.name);

        // Workout Plan Name
        // $('.browse-plan-header').html(workoutPlan);
        //
        // workouts.forEach(function(workout) {
        //   var workoutRow = "<tr id='workout-rows' data-muscle-group-id=" + muscleGroup.id + "> date-workout-id=" + workout.id + "><td>"+ workout.name + "</td><td>" + workout.sets + "</td><td>" + workout.reps + "</td></tr>";
        //   // $('.browse-plan-table').append(workoutRow);
        //   $('.browse-row table tbody').append(workoutRow);
        // })
    });

  })


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

  $('tbody').on('click', 'a.edit-link', function(){
    var workoutRow = $(this).parents('tr');

    // Hide workout values and display edit workout input form
    $('span', workoutRow).addClass('hide-row');
    $('#edit-form-instruction').removeClass('hide-row');
    $('input', workoutRow).attr('id', 'edit-workout');
  });

  $('#browse-plans-header').click(function(){
    event.preventDefault();
    var url = $(this).attr('href') + '.json';
    $.get(url, function(res){
      res.all_workouts.forEach(function(workout_plan) {
        if ($('li[data-workout-id="' + workout_plan.id + '"]').val() == undefined){
          var html = '<li data-workout-id="' + workout_plan.id + '"><a href="/workout_plans/' + workout_plan.id +'" class="browse-workout-plan">' + workout_plan.name + '</a></li>';
          $('.browse-plan-list').append(html);
        };
      });
    });
  });

  $('#new_exercise').submit(function(){
    event.preventDefault();
    var form_action = $(this).attr('action') + '.json';

    $.post(form_action, $(this).serialize(), function(data){
      // Get muscle group id
      var muscleGroupId = $('#exercise_muscle_group_id').val();

      var muscleGroupName = data.exercise.muscle_group.name.toLowerCase();
      var workouts = data.exercise.workouts;
      var workoutPlanId = data.exercise.workout_plan.id;

      // Either create a new muscle group table w/ workouts or add a row to an existing table
      if ($('[data-muscle-group-id="' + muscleGroupId + '"]').length == 0){
        // $('#workout-plan-table').append("<%= j render 'table', exercise: @exercise %>");
      } else {
        // $('.' + muscleGroupName +'-group div.col-sm-8 tbody').append("<%= j render 'table_rows', exercise: @exercise %>");
        workouts.forEach(function(workout) {
          var workoutRow = "<tr id='workout-rows'><td>"+ workout.name + "</td><td>" + workout.sets + "</td><td> " + workout.reps + "</td><td><input type='checkbox' id='workout_completed'></td><td><a href='/workout_plans/" + workoutPlanId + "/workouts/" + workout.id + "/edit' class='edit-link' data-remote=true>Edit</a></td></tr>";

          $('.' + muscleGroupName +'-group div.col-sm-8 tbody').append(workoutRow);
        })
      }

      // Clear form fields
      $('#new_exercise input.form-control').val('');
      $('#exercise_muscle_group_id').val('')
    })
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
