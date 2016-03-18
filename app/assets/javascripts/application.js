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

function attachListeners(){
  $('#exercise-form').submit(function(event){
    event.preventDefault();

    // REMOVED TO UTILIZE REMOTE TRUE
    // var form_method = $(this).attr('method');
    // var form_action = $(this).attr('action');
    //
    //
    // $.ajax(form_action, {
    //   type: form_method,
    //   dataType: 'script',
    //   data: $(this).serialize()
    // })
  });

  $('tbody td a').click(function(event){
    event.preventDefault();

    // REMOVED TO UTILIZE REMOTE TRUE
    // var method = $(this).data('method');
    // var deleteURL = $(this).attr('href');
    //
    // $.ajax(deleteURL, {
    //   type: method,
    //   dataType: 'script',
    // })
  });

  $('a.edit-link').click(function(){

    var workoutId = $(this).parents('tr').data('workout-id')
    var workoutRow = $('tr[data-workout-id="' + workoutId + '"]')

    $('span', workoutRow).addClass('hide-row');
    $('input', workoutRow).attr('id', 'edit-workout')

  });

  $(document).keypress(function(e) {
    if(e.which == 13) {
      debugger;
        alert('You pressed enter!');
    }
  });
}

$(function(){
  attachListeners();
})
