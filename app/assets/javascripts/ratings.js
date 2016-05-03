function constructRatings(workout_plan){
  return [
    '<div class="row ratings-container">',
      '<h3 class="ratings-header col-sm-4">Average Rating: <span class="average-rating">' + getAverageRating(workout_plan.ratings).toFixed(1) + '</span></h3>',
      '<div class="form-container col-sm-7">',
        '<a href="/workout_plans/' + workout_plan.id + '/ratings" class="rate-plan">Rate workout</a>',
      '</div>',
    '</div>'
  ].join('');
};

function getAverageRating(ratings){
  return ratings.map(function(rating){
    return rating.rating;
  }).reduce(function(a, b){ return a + b; }) / ratings.length;
};

function displayRatingForm(url){
  return [
    '<div class="row">',
      '<form action="' + url + '" method="post" id="rating-form">',
        '<fieldset class="form-group">',
            '<label class="col-sm-3">Rate Plan</label>',
            '<select class="form-control col-sm-1" id="rating-input" name="rating">',
              '<option>5</option>',
              '<option>4</option>',
              '<option>3</option>',
              '<option>2</option>',
              '<option>1</option>',
            '</select>',
            '<button class="btn btn-primary col-sm-3">Submit</button>',
          '</fieldset>',
      '</form>',
    '</div>',
  ].join('');
};

$(function(){
  $('#browse-plan-table').on('submit', '#rating-form', function(e){
    e.preventDefault();

    var data = $('form').serialize();
    var url = $(this).attr('action');

    $.ajax({
      type: "POST",
      url: url,
      data: data,
      dataType: 'json',
      success: function(data){
        $('span.average-rating').text(getAverageRating(data.ratings).toFixed(1));
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Your comment failed to be posted");
      }
    });
  });
});
