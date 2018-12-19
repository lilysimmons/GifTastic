
var topics = ["Kelp Forest", "Sharks", "Dolphins", "Penguins", "Sea Turtles"]


//Function 1) Show Buttons
function showButtons() {
    $("#buttonHolder").empty();
    for (var i = 0; i < topics.length; i++) {
        var animalType = topics[i];
        console.log(animalType);
        var button = $("<button>");
        button.text(animalType);
        button.addClass("gifBtn");
        button.attr("data-animal", animalType);
        $("#buttonHolder").append(button); 
    }
}
showButtons();
displayGifs();

// function 2) display gifs & ajax call
// My GIPHY API key: uKX1nS2ktlKRylod1a50NtrrJHEyqNZE

function displayGifs(){

    $(".gifBtn").on("click", function() {

        $("#gifs-appear-here").empty();
        // Grabbing and storing the data-animal property value from the button
        var animal = $(this).attr("data-animal");
  
        // Constructing a queryURL using the animal name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          animal + "&api_key=uKX1nS2ktlKRylod1a50NtrrJHEyqNZE&limit=10";
  
        // Performing an AJAX request with the queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After data comes back from the request
        .then(function(response) {
          console.log(queryURL);

          console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.data;
          
          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);
            
            // Setting the src attribute to still image; adding data-state attribute with "still" & "animate" values; add class "gif"
            var animalImage = `<img class="gif" data-state="still" src="${results[i].images.fixed_height_still.url}" data-animate="${results[i].images.fixed_height.url}" data-still="${results[i].images.fixed_height_still.url}">`
          
            // append rating and images to HTML
            $("#gifs-appear-here").prepend(p);
            $("#gifs-appear-here").prepend(animalImage);

            
          }
        });
    });
}

// Function 3) Click Event to animate/pause images
$(document).on("click", ".gif", function(e) {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    
    var state = $(this).attr("data-state");
    var animate = e.currentTarget.dataset.animate
    var still = e.currentTarget.dataset.still

    if (state === "still"){
      
      $(this).attr("src", animate);
      $(this).attr("data-state", "animate");
      
    }
      else{
        $(this).attr("src", still);
        $(this).attr("data-state", "still");

      }

  });


//Function 4) Click Event to create new gifBtn & push to topics array
      $("#add-animal").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input value
        var newAnimal = $("#animal-input").val().trim();

        // Adding animal from the textbox to our array
        topics.push(newAnimal);

        // Calling showButtons which handles the processing of our topics array
        showButtons();
        displayGifs();
      });



