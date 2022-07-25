const xlsx = require("xlsx");

const addHours = function(numOfHours, date = new Date()) {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
    return date;
  }

const TimeToFly = function(inputDateStart, inputDateEnd) {
        let time1 = inputDateStart.getTime();
        let time2 = inputDateEnd.getTime();
        return Math.ceil((time2 - time1) / (60*60*1000));
}

const GetTime = function(inputDate, inputTime) {
    let Hour = parseInt(inputTime.split(':')[0]) + 1;
    return addHours(Hour, inputDate);
}

const ReadData = function(inputPath) {
    const WorkBook = xlsx.readFile(inputPath, {cellDates:true});
    const WorkSheet = WorkBook.Sheets[WorkBook.SheetNames[0]];
    var Data = xlsx.utils.sheet_to_json(WorkSheet, {header: 1});
    var i = 0;
    while(true) {
        if (Data[i][0] === undefined) {
            Data = Data.splice(0, i);
            break;
        }
        i++;
    }
    Data.splice(0,2);
    for(var i = 0; i < Data.length; i++) {
        Data[i][5] = GetTime(Data[i][5], Data[i][6]);
        Data[i][7] = GetTime(Data[i][7], Data[i][8]);
        Data[i].splice(6,1);
        Data[i].splice(7,1, TimeToFly(Data[i][5], Data[i][6]));
    }
    return Data;
}

const ReadKey = function(inputPath) {
    const WorkBook = xlsx.readFile(inputPath);
    const WorkSheet = WorkBook.Sheets[WorkBook.SheetNames[0]];
    const Data = xlsx.utils.sheet_to_json(WorkSheet, { header: 0 });
    return Data;
}

module.exports = {ReadData, ReadKey};