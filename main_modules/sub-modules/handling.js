// ---------------- Handling with FlightID Data  -------------------- //

const CheckFlightID = function(inputID, inputKeydata) {
    for(let i = 0; i < inputKeydata.length; i++)
        if (inputID === inputKeydata[i]['ID'])
            return inputKeydata[i];
}

const BestPlaneInWeekly = function(inputData) {
    arr = inputData.sort(function(a,b) {return a[0]['ID'].localeCompare(b[0]['ID'])});
    var max = new Array;
    max[1] = 0;
    var count =1;
    for(let i = 1; i < arr.length; i++) {
        if (arr[i-1][0]['ID'] === arr[i][0]['ID']) ++count;
        else{
            if (max[1] < count){
                max[0] = arr[i][0];
                max[1] = count;   
           }
           count = 1;
        }
    }
    return max;
}

// ---------------- Handling with CityID Data  -------------------- //

const CheckCity = function(inputCity, inputKeydata) {
    for(let i = 0; i < inputKeydata.length; i++)
        if (inputCity === inputKeydata[i]['Short name'])
            return (inputKeydata[i]['City'] + ', ' + inputKeydata[i]['Country']);
}



const WhereMostFrom = function(inputData) {
    arr = inputData.sort(function(a,b) {return a[7]['ID'].localeCompare(b[7]['ID'])});
    var max = new Array;
    max[1] = 0;
    var count = 1;
    for(let i = 1; i < arr.length; i++) {
        if (arr[i-1][7]['ID'] === arr[i][7]['ID']) ++count;
        else{
            if (max[1] < count){
                max[0] = arr[i][7];
                max[1] = count;   
           }
           count = 1;
        }
    }
    return max;
}

const WhereMostTo = function(inputData) {
    arr = inputData.sort(function(a,b) {return a[8]['ID'].localeCompare(b[8]['ID'])});
    var max = new Array;
    max[1] = 0;
    var count = 1;
    for(let i = 1; i < arr.length; i++) {
        if (arr[i-1][8]['ID'] === arr[i][8]['ID']) ++count;
        else{
            if (max[1] < count){
                max[0] = arr[i][8];
                max[1] = count;   
           }
           count = 1;
        }
    }
    return max;
}

const GetDataFrom = function(inputData, inputKeyData) {
    arr = inputData.sort(function(a,b) {return a[7]['ID'].localeCompare(b[7]['ID'])});
    var result = new Array;
    result[0] = new Array;
    result[1] = new Array;
    result[0][0] = CheckCity(arr[0][7]['ID'], inputKeyData);
    result[1][0] = 1;
    for(let i = 1, j = 0; i < arr.length; i++) {
        if (arr[i-1][7]['ID'] !== arr[i][7]['ID']){
            j++;
            result[0][j] = new Array;
            result[0][j] = CheckCity(arr[i][7]['ID'], inputKeyData);
            result[1][j] = 1;
        }
        else {
            result[1][j]++;
        }
    }
    return result;
}

// ---------------- Handling with Date Data  -------------------- //

const FormatDate = function(inputDate) {
    inputDate.setSeconds(0);
    inputDate.setMinutes(0);
    let Hour = inputDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return (Hour + ' ' + inputDate.toLocaleString('en-us', { weekday:"long", year:"numeric", month:"long", day:"numeric"}));
}

const FormatOnlyDate = function(inputDate) {
    return (inputDate.toLocaleString('en-us', { year:"numeric", month:"short", day:"numeric"}));
}

const GetWeek = function(inputDate) {
    startDate = new Date(inputDate.getFullYear(), 0, 1);
    var days = Math.floor((inputDate - startDate) / (24 * 60 * 60 * 1000));
    var weekNumber = Math.ceil(days / 7);
    return weekNumber;
}

const GetDateInWeekNumber = function(inputDataDate) {
    var Min = inputDataDate[0][4]['DateNum'];
    var Max = Min;
    for(let i = 0; i < inputDataDate.length; i++) {
        if(Max < inputDataDate[i][4]['DateNum']) {
            Max = inputDataDate[i][4]['DateNum'];
            continue;
        }
        if(Min > inputDataDate[i][4]['DateNum']) {
            Min = inputDataDate[i][4]['DateNum'];
            continue;
        }
    }
    return {'Start': FormatOnlyDate(Min), 'End': FormatOnlyDate(Max)};
}

const GetTotalTimeFly = function(inputData) {
    var Sum = 0;
    for(let i = 0; i < inputData.length; i++)
        Sum += inputData[i][6]['TimeFly'];
    return Sum;
}

const GetDayToDay = function(inputDataDate) {
    var result = new Array;
    result[0] = inputDataDate[0][4]['DateNum'].getDate();
    for(let i = 1, j = 0; i < inputDataDate.length; i++) {
        if (inputDataDate[i-1][4]['DateNum'].getDate() !== inputDataDate[i][4]['DateNum'].getDate()) {
            j++;
            result[j] = inputDataDate[i][4]['DateNum'].getDate();
        }
    }
    return result;
}

// ---------------- Handling with Customer Data  -------------------- //

const GetTotalCustomer = function(inputData) {
    var Sum = 0;
    for(let i = 0; i < inputData.length; i++)
        Sum += inputData[i][3]['Customer'];
    return Sum;
}

// ---------------- Handling with AUD convert Data  -------------------- //

const CheckAUD = function(inputMoney ,inputAUD, inputKeydata) {
    var Money = inputMoney;
    for(let i = 0; i < inputKeydata.length; i++)
        if (inputAUD === inputKeydata[i]['Currency'])
            Money = Math.ceil(inputMoney * inputKeydata[i]['AUD convert']);
    return Money;
}

const GetDataRevenue = function(inputData) {
    var arr = inputData.sort(function (a,b) {return a[4]['DateNum'] - b[4]['DateNum']})
    var result = new Array;
    result[0] = arr[0][1]['Revenue In AUD']
    for(let i = 1, j = 0; i < arr.length; i++) {
        if (arr[i-1][4]['Only Date'] !== arr[i][4]['Only Date']){
            j++;
            result[j] = arr[i][1]['Revenue In AUD'];

        }
        else {
            result[j] += arr[i][1]['Revenue In AUD'];
        }
    }
    return result;
}

const GetDataCost = function(inputData) {
    var arr = inputData.sort(function (a,b) {return a[4]['DateNum'] - b[4]['DateNum']})
    var result = new Array;
    result[0] = arr[0][2]['Cost In AUD']
    for(let i = 1, j = 0; i < arr.length-1; i++) {
        if (arr[i-1][4]['Only Date'] !== arr[i][4]['Only Date']){
            j++;
            result[j] = arr[i][2]['Cost In AUD'];

        }
        else {
            result[j] += arr[i][2]['Cost In AUD'];
        }
    }
    return result;
}

// ---------------- main modules exports ----------------- //

const ReportDaily = function(inputData, inputKeyData) {
    var WeekNum = new Map();
    var Data = new Array;
    for (let i = 0; i < inputData.length; i++) {
        Data[i] = new Array;
        Data[i][0] = 'FLIGHT DAILY REPORT';
        Data[i][1] = CheckFlightID(inputData[i][0], inputKeyData[0]);
        Data[i][2] = {'Revenue In AUD': CheckAUD(inputData[i][1],inputData[i][3], inputKeyData[2])};
        Data[i][3] = {'Cost In AUD': CheckAUD(inputData[i][2],inputData[i][3], inputKeyData[2])};
        Data[i][4] = {'Customer': inputData[i][4]};
        Data[i][5] = {'Date from': FormatDate(inputData[i][5]),
                      'Only Date': FormatOnlyDate(inputData[i][5]), 
                      'Week': GetWeek(inputData[i][5]),
                      'DateNum': inputData[i][5]};
        Data[i][6] = {'Date to': FormatDate(inputData[i][6])};
        Data[i][7] = {'TimeFly': inputData[i][7]};
        Data[i][8] = {'From': CheckCity(inputData[i][8], inputKeyData[1]),
                      'ID': inputData[i][8]};
        Data[i][9] = {'To': CheckCity(inputData[i][9], inputKeyData[1]),
                      'ID': inputData[i][9]};
        Data[i][10] = {'Remark': inputData[i][10]};
        Data[i][11] = {'Profit in AUD': CheckAUD(inputData[i][11], inputData[i][3], inputKeyData[2])};
        if(WeekNum.get(GetWeek(inputData[i][5])) === undefined)
            WeekNum.set(GetWeek(inputData[i][5]), GetWeek(inputData[i][5]));
    }
    Data[Data.length] = WeekNum;
    return Data;
}

const ReportWeekly = function(inputData, inputKeyData) {
    var DataTemp = ReportDaily(inputData, inputKeyData);
    var Data = new Array;
    var x = 0;
    for(let i = 0;i < 52; i++) {
        if(DataTemp[DataTemp.length-1].get(i) === undefined)
            continue;
        var y = 0;
        Data[x] = new Array;
        for(j = 0; j < DataTemp.length-1; j++) {
            if(DataTemp[DataTemp.length-1].get(i) !== DataTemp[j][5]['Week'])
                continue;
            DataTemp[j].splice(0,1);
            Data[x][y] = DataTemp[j];
            y++;
        }
        x++;
    }
    var NewData = new Array;
    for(let i = 0; i < Data.length; i++) {
        NewData[i] = new Array;
        NewData[i][0] = 'FLIGHT WEEKLY REPORT';
        NewData[i][1] = {'Date':GetDateInWeekNumber(Data[i]),
                         'DayToDay': GetDayToDay(Data[i])};
        NewData[i][2] = BestPlaneInWeekly(Data[i]);
        NewData[i][3] = {'Total Customer': GetTotalCustomer(Data[i])};
        NewData[i][4] = {'Total Time Fly': GetTotalTimeFly(Data[i])};
        NewData[i][5] = {'Avarage Flight Time': Math.round(NewData[i][4]['Total Time Fly'] / NewData[i].length)};
        NewData[i][6] = {'Where Most From': WhereMostFrom(Data[i])};
        NewData[i][7] = {'Where Most To': WhereMostTo(Data[i])};
        NewData[i][8] = {'Revenue': GetDataRevenue(Data[i]),
                         'Cost': GetDataCost(Data[i])};
        NewData[i][9] = {'From Location' : GetDataFrom(Data[i], inputKeyData[1])};
    }
    return NewData;
}

module.exports = {ReportDaily, ReportWeekly};