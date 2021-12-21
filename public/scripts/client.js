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
  const loadTweets = function () {
    $.ajax({
      method: "GET",
      url: "/tweets",
    }).then((response) => {
      //   console.log("RESPONSE: ");
      //   console.log(response);
      renderTweets(response);
      $(".counter").text(140);
      $("#tweet-text".val(""));
    });
  };
  loadTweets();
  $("#errorMessage").hide();

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    $(".tweets-container").empty();
    for (let tweet of tweets) {
      $(".tweets-container").prepend(createTweetElement(tweet));
    }
  };

  const createTweetElement = function (tweet) {
    let date = new Date(tweet.created_at).toLocaleDateString();

    return `
  <article class="tweet-header wrapper">
  <header>
    <!-- <div class="left">             -->
    <i class="fas"></i>
    <h2 class="left">
    ${tweet.user.name}</h2>
    <!-- </div> --> 
    <h5 class="right">${tweet.user.handle}</h5>
    <img src="${tweet.user.avatars}">
  </header>
  <main> 
  <p class="message">${escape(tweet.content.text)}</p>
  </main>
  <footer class="tweet-footer">
    <div>
      <p class="left" id="days">${timeago.format(tweet.created_at)}</p>
    </div>
    <div>
      <span class="fas fa-flag"></span>
      <span class="fas fa-retweet"></span>
      <span class="fas fa-heart"></span>
    </div>
  </footer>
</article> 
    `;
  };

  /*  <article class="tweet">
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
    <span id="flag" class="fas fa-flag"></span>
    <span id="retweet" class="fas fa-retweet"></span>
    <span id="heart" class="fas fa-heart"></span>
    </footer>
    </article>
    */

  const $newTweet = $("#tweet-form");
  $newTweet.on("submit", function (event) {
    event.preventDefault();
    const tweet = $("#tweet-text").val().trim().length;
    if (!tweet) {
      $("#errorMessage").show();
      $("#errorMessage").text("Tweet cannot be empty!");
      return;
    }

    if (tweet > 140) {
      $("#errorMessage").show();
      $("#errorMessage").text("Tweet can't be longer than 140 characters!");
      return;
    } else {
      const val = $(this).serialize();
      $.ajax("/tweets", {
        method: "POST",
        data: val,
      }).then(() => {
        $("#errorMessage").hide();
        loadTweets();
        $("#tweet-text").val("");
      });
    }
  });

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
});
