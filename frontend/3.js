google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {

  var data = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['Humidity', 0],
  ]);

  var options = {
    width: 600, height: 220,
    redFrom: 75, redTo: 100,
    yellowFrom:65, yellowTo: 75,
    minorTicks: 5
  };

  var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

  chart.draw(data, options);

  setInterval(function() {
    data.setValue(0, 1, document.getElementById("rt").value);
    chart.draw(data, options);
  }, 1000);
}