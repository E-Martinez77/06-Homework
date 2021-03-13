var searchButton = $("#searchButton");
var searchBox = $("#searchBox");

var previousCities = $("#previousCities");
var uvIndex = $("#uvIndex");
var currentCity = $("#currentCity");
var tempMain = $("#tempMain");
var iconDiv = $("#iconDiv");
var fiveDay = $("#fiveDayForecast");

var today = moment().format("MMMM Do YYYY");

var cityArray = [];

var tempDisplay = $("#tempMain");

searchButton.on("click", function (event) {
  event.preventDefault();
  event.stopPropagation();

  var city = searchBox.val().trim();

  cityArray.push(city);
  localStorage.setItem(cityArray, city);

  console.log(city);
  console.log(cityArray);

  citySearch(city);
  cityRender();
});

$(document).on("click", ".cityTargeting", test);

function test() {
  var whatEver = $(this).attr("data-city");
  console.log(whatEver);
  citySearch(whatEver);
}

function cityRender() {
  //set search to be empty
  previousCities.empty();

  searchBox.val("");
  for (let i = 0; i < cityArray.length; i++) {
    var li = $("<li>");
    li.attr("data-city", cityArray[i]);
    li.addClass("cityTargeting");
    li.text(cityArray[i]);
    previousCities.append(li);
  }
}

function citySearch(city) {
  currentCity.empty();
  uvIndex.empty();
  currentCity.empty();
  tempMain.empty();
  iconDiv.empty();
  fiveDay.empty();
  var APIKey = "b9b96241930f99095ee709c216db0ae2";

  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=Imperial&appid=" +
    APIKey;

  var lattitude;
  var longitude;

  // Here we run our AJAX call to the OpenWeatherMap API
  $.ajax({
    url: queryURL,
    method: "GET",
  }) // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {
      // Log the queryURL

      longitude = response.coord.lon;
      lattitude = response.coord.lat;
      console.log(lattitude, longitude);

      var queryURL2 =
        "https://api.openweathermap.org/data/2.5/uvi?lat=" +
        lattitude +
        "&lon=" +
        longitude +
        "&appid=" +
        APIKey;

      // Log the resulting object
      console.log(response);
      currentCity.text(response.name + " " + today);
      // $("p").append("Some appended text.");
      tempMain.append("Today's Temperature: " + response.main.temp + " °F");
      var iconCode = response.weather[0].icon;
      $("#iconDiv").attr(
        "src",
        "https://openweathermap.org/img/w/" + iconCode + ".png"
      );
      $("#currentHumidity").text("Humidity: " + response.main.humidity + " %");
      $("#currentWind").text(" Wind Speed: " + response.wind.speed + " MPH");
      $.ajax({
        url: queryURL2,
        method: "GET",
      }).then(function (response) {
        $("#uvIndex").text("UV Index: " + response.value);

        console.log(response);
      });
    });

  var queryURL3 =
    // "  https://api.openweathermap.org/data/2.5/onecall?lat=" +
    // lattitude +
    // "&lon=" +
    // longitude +
    // "&appid=" +
    // APIKey;

    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial" +
    "&appid=" +
    APIKey;

  $.ajax({
    url: queryURL3,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    for (var i = 0; i < 5; i++) {
      var day = response.list[i * 8].dt_txt;
      var subDay = day.substring(5, 10);
      // console.log(subDay);
      // $("#fiveDay1").text(subDay);
      // fiveDay1.$("p").append(subDay);

      // $("#fiveDayForecast").text(
      //   "Today's Temperature: " + response.list[0].main.temp + " °F"
      // );
      // $("#fiveDayForecast")
      //   .append()
      //   .text("Humidity: " + response.list[0].main.humidity + " %");

      var newDiv = $("<div>");
      newDiv.addClass("col");
      var date = $("<h3>");
      var tempPtag = $("<p>");
      var newImg = $("<img>");

      var tempPtag2 = $("<p>");
      var fiveIcon = response.list[i * 8].weather[0].icon;
      newImg.attr(
        "src",
        "https://openweathermap.org/img/w/" + fiveIcon + ".png"
      );

      var fiveTemp = response.list[i * 8].main.temp;
      var fiveHum = response.list[i * 8].main.humidity;

      date.append(subDay);

      newDiv.append(date);
      newDiv.append(newImg);

      tempPtag.append("Temp: " + fiveTemp);

      newDiv.append(tempPtag);

      tempPtag2.append("Humidity: " + fiveHum);

      newDiv.append(tempPtag2);
      fiveDay.append(newDiv);

      // create - class - append
      //append needs to be read backwards *IMPORTANT*

      //Date
      //Icon
      //Temp
      //Humidity

      console.log(response.list[0].weather[0].icon + " Icon Test");
      console.log(response.list[0].main.temp + " Temp Test");
      console.log(response.list[0].main.humidity + " Humidity Test");
    }
  });
}

function getCities() {
  for (let i = 0; i < localStorage.length; i++) {
    var li = $("<li>");
    li.attr("data-city", localStorage.getItem(localStorage.key(i)));
    li.addClass("cityTargeting");
    li.text(localStorage.getItem(localStorage.key(i)));
    previousCities.append(li);
  }
  citySearch(localStorage.getItem(localStorage.key(cityArray)));
}
if (localStorage) {
  getCities();
}
