$(document).ready(function() {

  $("#new-tweet-text").keyup(function() {
    $(".counter").html(140 - this.value.length);
    if (this.value.length > 140) {
      $(".counter").addClass("counterNegative").removeClass("counterPositive");
      $(".counter").parent().children("button").attr("disabled", "disabled");
    } else {
      $(".counter").removeClass("counterNegative").addClass("counterPositive");
      $(".counter").parent().children("button").removeAttr("disabled");
    }
  });

});