/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
]; */

$(document).ready(function () {
  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (let user of tweets) {
      const $tweet = createTweetElement(user);
      $(".tweet-container").prepend($tweet);
    }
  };
  renderTweets(data);

  const createTweetElement = function (tweet) {
    let date = new Date(tweet.created_at).toLocaleDateString();

    return `
    <article class="tweet">
    <header>
    <div class="info">
    <img src=${tweet.user.avatars} class="avatar"/>
    <span class="name">${tweet.user.name}</span>
    </div>
    <span class="handle">${tweet.user.handle}</span>
    </header>
    <p class="tweetData">${escape(tweet.content.text)}</p>
    <footer>
    <span class="date">${date}</span>
    <span class ="icons">
    <span id="heart" class="fas fa-heart"></span>
    <span id="retweet" class="fas fa-retweet"></span>
    <span id="flag" class="fas fa-flag"></span>
    </footer>
    </article>
    `;
  };

  const $newTweet = $("#submit-tweet");
  $newTweet.on("submit", function (event) {
    event.preventDefault();
  });

  const loadTweets = function () {
    $.ajax({
      method: "GET",
      url: "/tweets",
    }).then((response) => {
      console.log("RESPONSE: ");
      console.log(response);
      renderTweets(response);
      // $('#tweet-text').val("");
      $(".counter").text(140);
    });
  };
  loadTweets();
  $("#errorMessage").hide();
});
