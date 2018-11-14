
(function() {

  setInterval(setGreeting, 1000);

  function setGreeting() {
    var today = new Date();
    var hourNow = today.getHours();
    var greeting;
    var icon;

    if (hourNow < 12){
      greeting = "Good Morning, Grady.";
      icon = "coffee";
    }
    else if (hourNow < 18){
      greeting = 'Good afternoon, Grady.';
      icon = "sun-o";
    }
    else if (hourNow < 24){
      greeting = "Good evening, Grady."
      icon = "moon-o";
    }
    else {
      greeting = "Welcome";
    }

    document.getElementById("cgreeting").innerHTML = "<p>" + greeting + " </p>";




  }
})()
