/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
// const data = [{
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];

//Create html Tweet Element
const createTweetElement = function(tweet) {
  let $tweet = `<article><header><div><img src="${tweet['user']['avatars']}" alt="Avatar" class="tweetsAvatar" /><span>${tweet['user']['name']}</span></div><label>${tweet['user']['handle']}</label></header><div class="content"><div id="tweet-text">${tweet['content']['text']}</div></div><footer><label>${timeago.format(tweet['created_at'])}</label><div><i class="fas fa-flag "></i><i class="fas fa-heart "></i><i class="fas fa-retweet "></i></div></footer></article>`;
  return $tweet;
};

//Processing tweets
const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
};

//Fetching tweets from DB
const loadtweets = function() {
  $.getJSON('/tweets', function(tweetsdata) {
    let sortedTweets = tweetsdata.sort((a, b) => a.created_at > b.created_at && -1 || 1);
    renderTweets(sortedTweets);
  });
};


//doing something
$(document).ready(function() {
  //Fetching tweets from DB
  loadtweets();

  //adding Compose button action
  document.querySelector(".atag").addEventListener("click", (e) => {
    e.preventDefault();
    $(".new-tweet").toggle();
  });

  //adding second toggle button action(backToTop)
  $('.backToTop').click(function() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  });

  //hide and unhide second toggle button action(backToTop)
  $(document).scroll(function() {

    /* If we're not at the top of the browser */
    if ($(window).scrollTop() !== 0) {
      $('.backToTop').show();
      /* If we're at the top of the browser */
    } else {
      $('.backToTop').hide();
    }
  });

  //new tweet submit with error handling
  $(".new-tweet-form").submit(function(event) {
    event.preventDefault();
    if ($("#new-tweet-text").val().length === 0) {
      $("#errors-container").html('The tweet is empty! Please type something!');
      $("#errors-container").show();
    } else if ($("#new-tweet-text").val().length > 140) {
      $("#errors-container").html('Too long! It should be limited to 140 characters.');
      $("#errors-container").show();
    } else {
      let input = $("<div>").text($('#new-tweet-text').val());
      $.post("/tweets", "text=" + input[0].innerHTML);
      //$.post("/tweets", $(".new-tweet-form").serialize());
      window.location.reload();
    }
  });
});

// const $tweet = createTweetElement(tweetData);

// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.