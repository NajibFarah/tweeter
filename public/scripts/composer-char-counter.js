$(document).ready(function () {
  $("textarea").on("input", function () {
    const characterCount = 140;
    const inputLength = $(this).val().length;

    $(this)
      .nextAll(".counter")
      .text(characterCount - inputLength);

    if (characterCount - inputLength < 0) {
      $(this).nextAll(".counter").css("color", "red");
    } else {
      $(this).nextAll(".counter").css("color", "black");
    }
  });
});
