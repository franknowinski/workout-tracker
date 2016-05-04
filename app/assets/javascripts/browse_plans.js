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

    var averageRating,
    formAction = $(this).attr('href');
    removeElements();

    $.getJSON(formAction, function(data){
      $('.browse-table-header').text(data.workout_plan.name);
      data.workout_plan.exercises.forEach(function(workout){
        var muscleGroup = workout.muscle_group,
        workouts = workout.workouts;

        // Create workout plan table
        if (workouts.length > 0) {
          contstructTable(muscleGroup, workouts);
        }
      });

      // Add workout plan average rating
      if (data.workout_plan.ratings.length > 0) {
        $('#browse-plan-table').append(constructRatings(data.workout_plan));
      } else {
        $('#browse-plan-table').append(constructfirstRating(data.workout_plan));
      }

      // Add comments to workout plan
      if (data.workout_plan.comments.length > 0) {
        var commentsHeader = constructCommentsHeader(),
        allComments = '';

        data.workout_plan.comments.forEach(function(comment){
          allComments += constructComment(comment);
        });
        leaveCommentLink = constructLinks(this.url);
        $('#browse-plan-table').append(commentsHeader + leaveCommentLink + allComments);
      } else {
        $('#browse-plan-table').append(constructFirstComment(this.url));
      };
    });
  });
});
