﻿var config = {
  apiKey: "AIzaSyCcz-IVNrPlKBCIfkjCy-R4IgmMQut8qoQ",
  authDomain: "temperature-and-humidity-e8dfd.firebaseapp.com",
  databaseURL: "https://temperature-and-humidity-e8dfd.firebaseio.com",
  projectId: "temperature-and-humidity-e8dfd",
  storageBucket: "temperature-and-humidity-e8dfd.appspot.com"
};
firebase.initializeApp(config);

var database = firebase
  .database()
  .ref()
  .child("sensor/dht22");
var datetimes = [];
var today = new Date();
var temperatures = [];
var hightemp = 10;
var lowtemp = 100;
var humidities = [];
var highhumid = 40;
var lowhumid = 100;
var checker = [];
var work = [1];
document.getElementById("at").value = 0;
document.getElementById("bt").value = 0;
document.getElementById("ct").value = 0;
document.getElementById("dt").value = 0;
document.getElementById("et").value = 0;
document.getElementById("ft").value = 0;
document.getElementById("gt").value = 0;
document.getElementById("ht").value = 0;

function getData(i) {
  database.on("value", snapshot => {
    var deb = snapshot.val();
    var keys = Object.keys(deb);
    var vary = keys.length;
    var k = keys[vary - 1];
    var humidity = deb[k].humidity;
    humidities.push(humidity);
    var sum = 0;
    checker.push(vary);
    for (var iz = 0; iz < humidities.length; iz++) {
      sum += parseInt(humidities[iz], 10);
    }

    var avg = sum / humidities.length;
    document.getElementById("rt").value = humidity;

    document.getElementById("at").value = +(Math.round(avg + "e+2") + "e-2");
    console.log(document.getElementById("hello").innerHTML);

    var somerandomtext =
      document.getElementById("at").value +
      "% " +
      document.getElementById("dt").value +
      "% " +
      document.getElementById("ct").value +
      "%";

    document.getElementById("hello").innerHTML = somerandomtext;
  });

  if (i != 0 && checker[checker.length - 1] == checker[checker.length - 2]) {
    work[0] = 0;
  } else {
    work[0] = 1;
  }
  var some = document.getElementById("rt").value;
  if (some > highhumid) {
    document.getElementById("ct").value = +(Math.round(some + "e+2") + "e-2");
    highhumid = some;
  }
  if (some < lowhumid) {
    document.getElementById("dt").value = +(Math.round(some + "e+2") + "e-2");
    lowhumid = some;
  }
  return some;
}
function getData2(j) {
  database.on("value", snapshot => {
    var deb2 = snapshot.val();
    var keys2 = Object.keys(deb2);
    var vary2 = keys2.length;
    var k2 = keys2[vary2 - 1];
    var temperature1 = deb2[k2].temp;
    temperatures.push(temperature1);
    document.getElementById("st").value = temperature1;
    var sum2 = 0;
    for (var iy = 0; iy < temperatures.length; iy++) {
      sum2 += parseInt(temperatures[iy], 10);
    }

    var avg2 = sum2 / temperatures.length;
    document.getElementById("bt").value = avg2;
    function roundToTwo2(avg2) {
      return +(Math.round(avg2 + "e+2") + "e-2");
    }
    document.getElementById("bt").value = roundToTwo2(avg2);
    console.log(document.getElementById("hello2").innerHTML);

    var somerandomtext =
      document.getElementById("bt").value +
      "°C " +
      document.getElementById("ft").value +
      "°C " +
      document.getElementById("et").value +
      "°C";

    document.getElementById("hello2").innerHTML = somerandomtext;
  });
  var lome = document.getElementById("st").value;
  if (lome > hightemp) {
    document.getElementById("et").value = +(Math.round(lome + "e+2") + "e-2");
    hightemp = lome;
  }
  if (lome < lowtemp) {
    document.getElementById("ft").value = +(Math.round(lome + "e+2") + "e-2");
    lowtemp = lome;
  }

  return lome;
}

s = 0;
var data1 = {
  x: [today],
  y: [getData(s)],
  mode: "lines",
  line: { color: "#FF0000" },
  name: "Humidity"
};

s2 = 0;
var data2 = {
  x: [today],
  y: [getData2(s2)],
  mode: "lines",
  line: { color: "#0000FF" },
  name: "Temperature"
};
var data = [data1, data2];
Plotly.plot("chart", data);

var cnt = 0;
var interval = setInterval(function() {
  var time = new Date();

  var update = {
    x: [[time], [time]],
    y: [[getData(cnt)], [getData2(cnt)]]
  };

  var olderTime = time.setMinutes(time.getMinutes() - 1);
  var futureTime = time.setMinutes(time.getMinutes() + 1);
  var minuteView = {
    xaxis: {
      type: "date",
      title: {
        text: "TIME (s)",
        font: {
          family: "Arial, monospace",
          size: 25,
          color: "#000000"
        }
      },
      range: [olderTime, futureTime]
    },
    yaxis: {
      range: [0, 100]
    }
  };
  Plotly.relayout("chart", minuteView);

  Plotly.extendTraces("chart", update, [0, 1]);
  cnt++;
  if (++cnt === 5) clearInterval(interval);
}, 10000);
