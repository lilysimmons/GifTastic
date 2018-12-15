// My GIPHY API key: uKX1nS2ktlKRylod1a50NtrrJHEyqNZE


var topics = ["Coral Reef", "Sharks", "Dolphins", "Penguins", "Sea Turtles"]
var imgAnimate;

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
        // var html = `<button type="button" data-still="" class="btn btn-primary gifBtn">${animalType}</button>`

        // $("#buttonHolder").append(html);  

    }
}
showButtons();
displayGifs();


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
          imgAnimate = results[0].images.downsized.url;
          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);
            
            
            // Creating and storing an image tag
            // var animalImage = $("<img>");
            // Setting the src attribute to still image; adding data-state attribute with "still" value; add class "gif"
            var animalImage = `<img class="gif" data-state="still" src="${results[i].images.fixed_height_still.url}" data-animate="${results[i].images.fixed_height.url}" data-still="${results[i].images.fixed_height_still.url}">`
            
            
            // animalImage.attr("src", results[i].images.fixed_height_still.url);
            // animalImage.attr("data-state", "still");
            
            // var still = animalImage.data("still", results[i].images.fixed_height_still.url)
            // console.log(still);
            // animalImage.addClass("gif");
            // Appending the paragraph and image tag to the gif div
            $("#gifs-appear-here").prepend(p);
            $("#gifs-appear-here").prepend(animalImage);


            //Function 3) Click Event to animate/pause images
// $(document).on("click", ".gif", function() {
//     // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
//     var animate = $(this).attr("src", results[i].images.fixed_height.url);
    
    
//     console.log("clicked");

//     $(this).animalImage.attr("src", animate);
//     $(this).animalImage.attr("date-state", "animate");

//     var state = $(this).attr("data-state");
//     // If the clicked image's state is still, update its src attribute to what its data-animate value is.
//     // Then, set the image's data-state to animate
//     // Else set src to the data-still value
//     if (state === "still") {
//         $(this).animalImage.attr("src", $(this).animalImage.attr(animate));
//         $(this).attr("data-state", "animate");
//     //   } else
//     //     $(this).attr("data-state", "still");
//     //   }
//     }
//   });

            
          }
        });
    });
}
//function 2) Click Event on gifBtn to make Ajax call & display gifs
// $(".gifBtn").on("click", function () {
//     console.log("clicked");
// });

// Function 3) Click Event to animate/pause images
$(document).on("click", ".gif", function(e) {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    
    var state = $(this).attr("data-state");
    var animate = e.currentTarget.dataset.animate
    var still = e.currentTarget.dataset.still

    
    // console.log(animate);
    
    

    if (state === "still"){
      
      $(this).attr("src", animate);
      $(this).attr("data-state", "animate");
      
    }
      else{
        $(this).attr("src", still);
        $(this).attr("data-state", "still");

      }

  // $(this).attr("src", imgAnimate);
    

    // $(this).animalImage.attr("src", imgAnimate);
    // $(this).animalImage.attr("date-state", "animate");

    // var state = $(this).attr("data-state");
    // // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // // Then, set the image's data-state to animate
    // // Else set src to the data-still value
    // if (state === "still") {
    //     $(this).animalImage.attr("src", $(this).animalImage.attr(animate));
    //     $(this).attr("data-state", "animate");
    // //   } else
    // //     $(this).attr("data-state", "still");
    // //   }
    // }
  });


//Function 4) Click Event to create new gifBtn & call show button
      $("#add-animal").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var newAnimal = $("#animal-input").val().trim();

        // Adding movie from the textbox to our array
        topics.push(newAnimal);

        // Calling renderButtons which handles the processing of our movie array
        showButtons();
        displayGifs();
      });

// set data-attribute
// img.attr("data-still", "");

// var button = document.createElement("button");
// button.innerHTML = "Do Something";

// // 2. Append somewhere
// var body = document.getElementsByTagName("body")[0];
// body.appendChild(button);

// // 3. Add event handler
// button.addEventListener("click", function () {
//     alert("did something");
// });

//javascript, jQuery
// var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
// xhr.done(function(data) { console.log("success got data", data); });


