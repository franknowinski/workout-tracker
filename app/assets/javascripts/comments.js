// Display blockquote
function constructComment(comment) {
  var date = new Date(comment.created_at).toString().slice(0, 10);
  var user = comment.user.name || comment.user.email;

  return [
    '<blockquote>',
      '<p>' + comment.content +'</p>',
      '<footer>' + user + '<cite> ' + date + '</cite></footer>',
    '</blockquote>'
  ].join('');
}

// Displays comment form
function constructCommentForm(formAction) {
  return [
    '<div class="field-with-errors"></div>',
      '<form action="' + formAction + '/comments" method="post" id="comment-form">',
        '<textarea name="comment" class="form-control" rows="3" placeholder="Your Comment"></textarea><br>',
      '<button type="submit" class="btn btn-primary">Post Comment</button>',
    '</form>'
  ].join(' ');
}

// Displays 'Leave a comment' link
function constructLinks(url) {
  return [
    '<div class="workout-comment">',
      '<a href="' + url + '" class="leave-comment">Leave a comment</a>',
    '</div>'
  ].join('');
}

// Validates comment
function displayError(error) {
  $('div.field-with-errors').append('<p style="color:red">' + error + '</p>');
}

// Displays comment upon successful AJAX request
function displayComment(comment, url) {
  $('form').remove();
  $('.field-with-errors').remove();  $('#browse-plan-table').append(constructComment(comment));
  $('#browse-plan-table').append(constructLinks(url));
}

$(function(){
  // Display comment form
  $('#browse-plan-table').on('click', 'a.leave-comment', function(e){
    e.preventDefault();
    $('div.workout-comment').addClass('hidden');
    var formAction = $(this).attr('href').replace('/comments', '');

    // $('.workout-comment').html(constructCommentForm(formAction));
    $('#browse-plan-table').append(constructCommentForm(formAction));
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
          displayError(data.comments);
        } else {
          displayComment(data.comment, url);
        }
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Your comment failed to be posted");
      }
    });
  });
});