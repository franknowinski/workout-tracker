// Clear workout table and comments when clicking on a new workout plan
function removeElements() {
  $('#browse-plan-table').removeClass('hidden');
  $('a.leave-comment').remove();
  $('div.ratings-container').remove();
  $('div.table-rows').remove();
  $('div.comments-container').remove();
  $('.workout-comment').remove();
  $('blockquote').remove();
}

$(function() {

  $('#browse-plan-table').on('click', 'a.rate-plan', function(e){
    e.preventDefault();
    $(this).remove();
    var url = $(this).attr('href');

    $('.form-container').append(displayRatingForm(url));
  });

  // Display workout plan
  $('#browse-plans-item').on('click', 'a.browse-plan', function(e){
    e.preventDefault();

    var averageRating, formAction = $(this).attr('href');
    removeElements();

    $.getJSON(formAction, function(data){
      $('.browse-table-header').text(data.workout_plan.name);
      data.workout_plan.exercises.forEach(function(workout){
        var muscleGroup = workout.muscle_group;
        var workouts = workout.workouts;

        // Create workout plan table
        if (workouts.length > 0) {
          contstructTable(muscleGroup, workouts);
        }
      });

      if (data.workout_plan.ratings.length > 0) {
        $('#browse-plan-table').append(constructRatings(data.workout_plan));
      } else {
        var ratingHTML = [
          '<div class="form-container col-sm-7">',
            '<a href="/workout_plans/' + data.workout_plan.id + '/ratings" class="rate-plan">Rate workout</a>',
          '</div>',
        ].join('');
        $('#browse-plan-table').append(ratingHTML);
      }

      // Add comments to workout plan
      if (data.workout_plan.comments.length > 0) {
        var commentsHeader = [
          '<div class="comments-container">',
            '<h2 class="comments-header">Comments:</h2><hr>'
        ].join(' ');

        var allComments = '';
        data.workout_plan.comments.forEach(function(comment){
          allComments += constructComment(comment);
        });

        $('#browse-plan-table').append(commentsHeader + allComments);
      };

      // Add 'Leave a comment' link
      $('#browse-plan-table').append(constructLinks(this.url));
    });
  });
});
