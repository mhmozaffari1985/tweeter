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

const createTweetElement = function(tweet) {

  let $tweet = `<article><header><div><img src="${tweet['user']['avatars']}" alt="Avatar" class="tweetsAvatar" /><span>${tweet['user']['name']}</span></div><label>@${tweet['user']['handle']}</label></header><div class="content"><div id="tweet-text">${tweet['content']['text']}</div></div><footer><label>${timeago.format(tweet['created_at'])}</label><div><i class="fas fa-flag "></i><i class="fas fa-heart "></i><i class="fas fa-retweet "></i></div></footer></article>`;
  return $tweet;
};

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
};

const loadtweets = function() {
  $.getJSON('/tweets', function(tweetsdata) {
    let sortedTweets = tweetsdata.sort((a, b) => a.created_at > b.created_at && -1 || 1);
    renderTweets(sortedTweets);
  });
};

$(document).ready(function() {
  loadtweets();
  $(".new-tweet-form").submit(function(event) {
    event.preventDefault();
    if ($("#new-tweet-text").val().length === 0) {
      alert('The tweet is empty!');
    } else if ($("#new-tweet-text").val().length > 140) {
      alert('Too long! It should be limited to 140 characters.');
    } else {
      $('#new-tweet-error').text('');

      $.post("/tweets", $(".new-tweet-form").serialize());
      window.location.reload();
    }
  });
});

// const $tweet = createTweetElement(tweetData);

// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.