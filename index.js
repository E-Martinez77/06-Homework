var searchButton = document.getElementById("searchButton");
var searchBox = document.getElementById("searchBox");

var previousCities = document.getElementById("previousCities");

var cityArray = [];

$("#searchButton").on("click", function (event) {
  event.preventDefault();
  event.stopPropagation();

  var city = $("#searchBox").val().trim();

  cityArray.push(city);

  console.log(city);
  console.log(cityArray);

  citySearch();
  cityRender();
});

function cityRender() {
  //set search to be empty
  $("#previousCities").empty();
  $("#searchBox").val("");
  for (let i = 0; i < cityArray.length; i++) {
    var li = $("<li>");
    li.attr("data-city", cityArray[i]);
    li.text(cityArray[i]);
    $("#previousCities").append(li);
  }
}

function citySearch() {
  var city = $("#searchBox").val().trim();
  var APIKey = "b9b96241930f99095ee709c216db0ae2";

  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;

  // Here we run our AJAX call to the OpenWeatherMap API
  $.ajax({
    url: queryURL,
    method: "GET",
  }) // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {
      // Log the queryURL

      // Log the resulting object
      console.log(response);
    });
}
