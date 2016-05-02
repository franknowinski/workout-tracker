function contstructTable(muscleGroup, workouts) {
  if ($('.' + muscleGroup.name.toLowerCase() + '-group').length == 0){

    var muscleHeader ='<div class="row ' + muscleGroup.name.toLowerCase() + '-group table-rows"><div class="container col-sm-3"><h2 class="browse-muscle-header">' + muscleGroup.name + '</h2><br></div>';

    var workoutsHeader = '<div class="col-sm-8"><table class="table table-hover clearfix"><thead><tr><th class="col-sm-4">Exercise</th><th class="col-sm-3">Sets</th><th class="col-sm-3">Reps</th></tr></thead><tbody></div>';

    var workoutRows = '';

    workouts.forEach(function(workout){
      workoutRows += '<tr class="browse-workout-row"><td>' + workout.name + '</td><td>' + workout.sets + '</td><td>' + workout.reps + '</td></tr>';
    });

    var html = muscleHeader += workoutsHeader += workoutRows += '</tbody></table></div>';

    $('#browse-plan-table').append(html);
  };
}

// Clear workout table and comments
function removeElements() {
  $('#browse-plan-table').removeClass('hidden');
  $('a.leave-comment').remove();
  $('div.table-rows').remove();
  $('div.comments-container').remove();
  $('.workout-comment').remove();
  $('blockquote').remove();
}

function constructComment(comment) {
  var date = new Date(comment.created_at).toString().slice(0, 10);
  var user = comment.user.name || comment.user.email;
  var commentRow = '<blockquote><p>' + comment.content +'</p><footer>' + user + '<cite> ' + date + '</cite></footer></blockquote>';

  return commentRow;
}

$(function() {

  // Display workout plan
  $('#browse-plans-item').on('click', 'a.browse-plan', function(e){
    e.preventDefault();

    var formAction = $(this).attr('href');
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

      // Add comments to workout plan
      if (data.workout_plan.comments.length > 0) {
        var commentHTML = '<div class="comments-container"><h2 class="comments-header">Comments:</h2><hr>';
        var allComments = '';

        data.workout_plan.comments.forEach(function(comment){
          allComments += constructComment(comment);
        });

        $('#browse-plan-table').append(commentHTML + allComments);
      };

      // Add 'Leave a comment' link
      var commentLink = '<div class="workout-comment"><a href="' + this.url + '" class="leave-comment">Leave a comment</a></div></div>';

      $('#browse-plan-table').append(commentLink);
    });
  });

  // Display comment form
  $('#browse-plan-table').on('click', 'a.leave-comment', function(e){
    e.preventDefault();
    $('a.leave-comment').addClass('hidden');
    var formAction = $(this).attr('href');

    var commentInput = '<div class="field-with-errors"></div><form action="' + formAction + '/comments" method="post" id="comment-form"><textarea name="comment" class="form-control" rows="3" placeholder="Your Comment"></textarea><br><button type="submit" class="btn btn-primary">Post Comment</button></form>'

    $('.workout-comment').html(commentInput);
  });

  // Submit and display comment
  $('#browse-plan-table').on('submit', '#comment-form', function(e){
    e.preventDefault();
    var data = $('form').serialize();
    var url = $(this).attr('action');

    $.ajax({
      type: "POST",
      url: url,
      data: data,
      dataType: 'json',
      success: function(data){
        if (data.comments) {
          var html = '<p style="color:red">' + data.comments + '</p>';
          $('div.field-with-errors').append(html);
        } else {
          $('form').remove();
          $('.field-with-errors').remove();
          $('a.leave-comment').removeClass('hidden');
          $('#browse-plan-table').append(constructComment(data.comment));
        }
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Your commment failed to ");
      }
    });
  });
});
