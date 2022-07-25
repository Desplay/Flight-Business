const Read = require('./sub-modules/reading-data');
const Handling = require('./sub-modules/handling');
const CreatePDF = require('./sub-modules/create-pdf');
const CreateCharts = require('./sub-modules/create-charts');

const Main = async function(inputFolder) {
    const inputPath = inputFolder + "/Flight data.xlsx";
    const data = Read.ReadData(inputPath);
    const inputPath1 = inputFolder + "/FlightID.csv";
    const inputPath2 = inputFolder + "/City.csv";
    const inputPath3 = inputFolder + "/AUD convert.csv";
    var dataKey = new Array;
    dataKey[0] = Read.ReadKey(inputPath1);
    dataKey[1] = Read.ReadKey(inputPath2);
    dataKey[2] = Read.ReadKey(inputPath3);

    // ---------------- handling ------------------- //
    // const reportDaily = Handling.ReportDaily(data, dataKey);
    // for(let i = 0; i < reportDaily.length-1; i++)
    //     CreatePDF.exportsPDFDaily(reportDaily[i], inputFolder);
    const reportWeekly = Handling.ReportWeekly(data, dataKey);
    for(let i = 0; i < reportWeekly.length; i++) {
        await CreateCharts.ExportChartBar(reportWeekly[i]);
        await CreateCharts.ExportChartCircle(reportWeekly[i]);
        CreatePDF.exportsPDFWeekly(reportWeekly[i]);
    }
    return console.log('All done, file PDF have export in folder: "Report file"');
}

module.exports = Main;