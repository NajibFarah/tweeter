const data = [
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
];
const createTweetElement = function (info) {
  const date = new Date(tweet.created_at).toLocaleDateString();
  return `
  <article class="tweet-header wrapper">
  <header>
    <!-- <div class="left">             -->
    <i class="fas fa-user-alt"></i>
    <h1 class="left">EdenHazard</h1>
    <!-- </div> -->
    <h5 class="right">@EdenHazard</h5>
  </header>
  <p class="message">Up the Chelssss #KTBFFH ⚡️</p>
  <footer class="tweet-footer">
    <div>
      <p class="left" id="days">10 Days Ago</p>
    </div>

    <div>
      <span class="fas fa-flag"></span>
      <span class="fas fa-retweet"></span>
      <span class="fas fa-heart"></span>
    </div>
  </footer>
</article> `;
};
