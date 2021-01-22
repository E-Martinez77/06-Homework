var searchButton = document.getElementById("searchButton");
var searchBox = document.getElementById("searchBox");

var previousCities = document.getElementById("previousCities");

var cityArray = [];

$("#searchButton").on("click", function (event) {
  event.preventDefault();
  event.stopPropagation();

  var city = $("#searchBox").val().trim();

  cityArray.push(city);

  //create a new element when there's a click.

  // $("#random-number").prepend("<br><hr>" + lottoNumber);

  // $("#previousCities").append("<li>") + city;
  $("#previousCities").append("<li>" + city + "</li>");

  //once I have that element I want to add in city
  // $("ol").append("<li>Appended item</li>");

  console.log(city);
  console.log(cityArray);
});

// $("p").on("click", function(){
//   alert("The paragraph was clicked.");
// });

var APIKey = "166a433c57516f5b9b96241930f99095ee709c216db0ae2";

var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?" +
  "q=Bujumbura,Burundi&appid=" +
  APIKey;

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: "GET",
}) // We store all of the retrieved data inside of an object called "response"
  .then(function (response) {
    // Log the queryURL
    console.log(queryURL);

    // Log the resulting object
    console.log(response);
  });
