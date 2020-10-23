var currentday = function myDate() {
    var today = new Date();
    var weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";
    var nameofday = weekdays[today.getDay()];
    return nameofday;
  }

  module.exports.currentday = currentday;