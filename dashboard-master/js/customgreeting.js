
(function() {

  setInterval(setGreeting, 1000);

  function setGreeting() {
    var today = new Date();
    var hourNow = today.getHours();
    var greeting;

    if (hourNow < 12){
      greeting = "Good Morning, Grady.";
    }
    else if (hourNow < 18){
      greeting = 'Good afternoon, Grady.';
    }
    else if (hourNow < 24){
      greeting = "Good evening, Grady.";
    }
    else {
      greeting = "Hello,";
    }

    document.getElementById("cgreeting").innerHTML = "<p>" + greeting + " </p>";




  }
})()
