$(document).ready(function() {
    //our initial array to be used for initial buttons
    var topics = ["Chow chow", "Pitbull", "German Shepard", "Poodle", "Beagle"];

    //this function buttons onto page by looping through topics array
    function displayButtons() {
        $("#buttons").empty();
        for (var i = 0; i < topics.length; i++) {
          var button = $("<button>");
          button.addClass("topic-btn");
          button.attr("data-name", topics[i]);
          button.text(topics[i]);
          $("#buttons").append(button);
        }
    }

    function displayGifs() {
        //take the data-name of the button
        var breed = $(this).attr("data-name");
        //create our search for api
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          breed + "&api_key=dc6zaTOxFJmzC&limit=10";

        //ajax
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            //refines the api object down to just the data we need
            var results = response.data;
            //loop through the amount of gifs in object
            for (var i = 0; i < results.length; i++) {
                //create div
                var gifDiv = $("<div>");
                //create variable that is looped through to get ratings
                var rating = results[i].rating;
                //create variable that displays rating
                var p = $("<p>").text("Rating: " + rating);
                //create variable for the img tag
                //put a bunch of attrs and a class on that img tag for later
                var dogImage = $("<img>");
                dogImage.attr("src", results[i].images.fixed_height_still.url);
                dogImage.attr("data-animate", results[i].images.fixed_height.url);
                dogImage.attr("data-still", results[i].images.fixed_height_still.url);
                dogImage.addClass("gif");
                dogImage.attr("data-state", "still");
                //append the rating to the div made above in the forloop
                gifDiv.prepend(p);
                //append the img to the gifdiv
                gifDiv.append(dogImage);
                //prepend the whole div we just made to our display div
                $("#gifDisplay").prepend(gifDiv);
            }
          });
        }

    //adds a new topic to the array and calls the displayButtons array
    $("#add-topic").on("click", function(event) {
        event.preventDefault();
        var newTopic = $("#topic-input").val().trim();
        topics.push(newTopic);
        displayButtons();
      });

    //this function changes a gif src to animate or still depending on which
    //data-state it is currently in
    function mover() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            var src = $(this).attr("data-animate");
            $(this).attr("src", src);
            $(this).attr("data-state", "animate");
          }
    
          if (state === "animate") {
            var src = $(this).attr("data-still");
            $(this).attr("src", src);
            $(this).attr("data-state", "still");
          }
    }

    //when a gif with class gif is clicked, run mover funtion
    $(document).on("click", ".gif", mover);
    //when a topic button/breed button is clicked, display all the gifs from the api
    $(document).on("click", ".topic-btn", displayGifs);
    //initially puts buttons on page load
    displayButtons();
    
});