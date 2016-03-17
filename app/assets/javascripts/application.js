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

    var form_method = $(this).attr('method');
    var form_action = $(this).attr('action');


    $.ajax(form_action, {
      type: form_method,
      dataType: 'script',
      data: $(this).serialize()
    }).done(function(data){
      // var muscle = data.exercises[1].name
      // $('.muscle-group:last').append('<h2>' + muscle + '</h2>')
      // debugger;
      // $('<tr class="chest-group"><td>Dips></td><td>3</td><td><10></td></tr>')
      // $('#myTable tr:last').after('<tr>...</tr><tr>...</tr>');
    })
  })
}

$(function(){
  attachListeners();
})
