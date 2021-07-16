$(document).ready(function() {

  $("#new-tweet-text").keyup(function() {
    $(".counter").html(140 - this.value.length);
    //if length bigger than 140 change counter color to red
    if (this.value.length > 140) {
      $(".counter").addClass("counterNegative").removeClass("counterPositive");
      //$(".counter").parent().children("button").attr("disabled", "disabled");
    } else {
      //if length smaller than 140 change counter color to normal mode
      $(".counter").removeClass("counterNegative").addClass("counterPositive");
      //$(".counter").parent().children("button").removeAttr("disabled");
    }
  });

});