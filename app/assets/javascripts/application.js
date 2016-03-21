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

  $('form').submit(function(event){
    event.preventDefault();
  })

  // Abstracted away to use generalized form - create exercise form
  // $('#exercise-form').submit(function(event){
  //   event.preventDefault();
  //
  //   // REMOVED TO UTILIZE REMOTE TRUE
  //   // var form_method = $(this).attr('method');
  //   // var form_action = $(this).attr('action');
  //   //
  //   //
  //   // $.ajax(form_action, {
  //   //   type: form_method,
  //   //   dataType: 'script',
  //   //   data: $(this).serialize()
  //   // })
  // });

  // Abstracted away to use generalized form - edit workout form
  // $('form.edit_workout').submit(function(event){
  //   event.preventDefault();
  // })

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

  $('tbody').on('click', 'a.edit-link', function(){
    var workoutRow = $(this).parents('tr')

    // Hide workout values and display edit workout input form
    $('span', workoutRow).addClass('hide-row');
    $('input', workoutRow).attr('id', 'edit-workout')
  });

  $('tbody').on('blur', 'a.edit-link', function(){
    var workoutRow = $(this).parents('tr')

    // Display workout values and hide edit workout input form
    $('span', workoutRow).removeClass('hide-row');
    $('input', workoutRow).removeAttr('id');
  });
}

$(function(){
  attachListeners();
})
