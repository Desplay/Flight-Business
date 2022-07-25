const QuickChart = require('quickchart-js');
const fs = require('fs');

const CreatePath = function(inputPath) {
  var Path = './dataPDF/Chart/';
  Path += inputPath + '-Chart.png';
  return Path;
}

const ExportChartBar = function(inputData) {
    const myChart = new QuickChart();
    myChart
    .setConfig({
      type: 'bar',
      data: { 
        labels: inputData[1]['DayToDay'], 
        datasets:[{label:'Revenue',data:inputData[8]['Revenue']},
                  {label:'Cost',data: inputData[8]['Cost']}]
    }})
    .setWidth(595.28)
    .setHeight(300)
    .setDevicePixelRatio(5);
    return myChart.toFile(CreatePath(inputData[1]['DayToDay'][0] + '-' + inputData[1]['DayToDay'][inputData[1]['DayToDay'].length-1] + '-Bar'));
}

const ExportChartCircle = function(inputData) {
  const myChart = new QuickChart();
    Revenue = inputData[8]['Revenue'];
    myChart.setConfig({
      type: "outlabeledPie",
      data: {
        labels: inputData[9]['From Location'][0],
        datasets: [{
          backgroundColor: ["#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5", "#ffa300", "#dc0ab4", "#b3d4ff", "#00bfa0"],
          data: inputData[9]['From Location'][1],
        }]
      },
      options: {
        plugins: {
          legend: false,
          outlabels: {
            text: "%l %p",
            color: "white",
            stretch: 35,
            font: {
              resizable: true,
              minSize: 12,
              maxSize: 18
            }
          }
        }
      }
    })
    .setWidth(595.28)
    .setHeight(300)
    .setDevicePixelRatio(5);
    return myChart.toFile(CreatePath(inputData[1]['DayToDay'][0] + '-' + inputData[1]['DayToDay'][inputData[1]['DayToDay'].length-1] + '-Circle'));
}
module.exports = {ExportChartBar, ExportChartCircle};