$(document).ready(function() {
    $("#tweet-text").keyup(function() {
        $(".counter").html(140 - this.value.length);
        if (this.value.length > 140) {
            $(".counter").addClass("counterNegative").removeClass("counterPositive");
        } else {
            $(".counter").removeClass("counterNegative").addClass("counterPositive");
        }
    });

});