$(document).ready(function(){
  var F = false;
  var apiData;

  backgroundImg = [
    "https://images.unsplash.com/photo-1457528877294-b48235bdaa68?auto=format&fit=crop&w=2100&q=80",
    "https://images.unsplash.com/photo-1505404919723-002ecad81b92?auto=format&fit=crop&w=2100&q=80",
    "https://images.unsplash.com/photo-1508336947438-d417ef037aff?auto=format&fit=crop&w=934&q=80",
    "https://images.unsplash.com/photo-1477601263568-180e2c6d046e?auto=format&fit=crop&w=2850&q=80",
    "https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?auto=format&fit=crop&w=933&q=80",
    "https://images.unsplash.com/photo-1502200893034-b7bca90610ef?auto=format&fit=crop&w=2106&q=80",
    "https://images.unsplash.com/photo-1498354136128-58f790194fa7?auto=format&fit=crop&w=2100&q=80"
  ];

  function displayTemp(C,F) {
    if (F) return Math.round((C* (9/5)+32)) + "&deg; F";
    return Math.round(C) + "&deg; C";
  }

  function render(data,F) {
    var currentWeather = data.weather[0].description;
    var currentTemp = displayTemp(data.main.temp,F);
    var icon = data.weather[0].icon;
    
    $("#currentTemp").html(currentTemp);
    $("#currentWeather").html(currentWeather);
    
    $("#currentTemp").prepend("<img src=" + icon + ">");
  }

if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      console.log(position);
      $("#latitude").html(position.coords.latitude);
      $("#longitude").html(position.coords.longitude);
      
      $.getJSON(
      "https://fcc-weather-api.glitch.me/api/current?lon=" +
        position.coords.longitude +
        "&lat=" +
        position.coords.latitude +
        "",
      function(data) {
        apiData = data;
        render(apiData,F);
        $("#country").html(data.sys.country);
        $("#city").html(data.name);

        $("#toggle").click(function() {
          F = !F;
          render(data, F);
        });
        
        var id = data.weather[0].id,
            bgIndex,
            backgroundId = [299,499,599,699,799,800];
        
        backgroundId.push(id);
        //console.log(backgroundId);
        bgIndex = backgroundId.sort().indexOf(id);console.log(backgroundId);
        
        $("body").css("background-image", "url(" + backgroundImg[bgIndex] + ")");
      });
    });
  }
})

