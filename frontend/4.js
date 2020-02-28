google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawChart2);

function drawChart2() {

  var data2 = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['', 0],
  ]);
  var options2= {
    width: 600, height: 220,
    greenFrom:25,greenTo:35,
    redFrom: 50, redTo: 100,
    yellowFrom:35, yellowTo: 50,
    minorTicks: 5,
    
  };
  var chart = new google.visualization.Gauge(document.getElementById('chart_div2'));

  chart.draw(data2, options2);
  setInterval(function() {
    data2.setValue(0, 1, document.getElementById("st").value);
    chart.draw(data2, options2);
  }, 1000);
}