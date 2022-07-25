const MakePDF = require('pdfkit');
const fs = require('fs');
const path = require('path');

const CheckFolder = function(inputPath) {
    if(!fs.existsSync(inputPath))
        fs.mkdirSync(inputPath);

}
const Path = './Report File';
CheckFolder(Path);

const exportsPDFDaily = function(inputData) {
    const doc = new MakePDF({size: 'A4'});
    const PathDaily = path.join(Path, 'Daily');
    CheckFolder(PathDaily);
    const NamePDF ='\\' + inputData[1]['ID'] + '-' + inputData[5]['Only Date'] + '.pdf';
    doc.pipe(fs.createWriteStream(PathDaily + NamePDF));
    doc

    // ----------- title ----------- //
    .font('dataPDF/fonts/Montserrat-Black.ttf')
    .fontSize(20).fillColor([111,111,111])
    .text(inputData[0], {align: 'center'})
    .font('dataPDF/fonts/Montserrat-Bold.ttf')
    .fontSize(15)
    .text(inputData[5]['Only Date'], {align: 'center'})
    .moveDown()
    .font('dataPDF/fonts/Montserrat-Regular.ttf')
    .fontSize(10).fillColor('black')
    .text('Flights are recorded on a daily basis, and are completed based on analyst Desplay Shido, any questions please contact email: ' + 'desplayshido@proton.me', {align: 'center' ,mailto:'desplayshido@gmail.com'})
    
    // ------------- image -------------- // 
    .image('dataPDF/image/data image.png', 234.5, 170, {scale: 0.4})
    .fillColor('black').fontSize(15)

    // ------------- Flight number -------------- // 
    .font('dataPDF/fonts/Montserrat-Bold.ttf')
    .text('Flight Number: ', 73, 290, {align: 'left', continued: true})
    .font('dataPDF/fonts/Montserrat-Regular.ttf')
    .text(inputData[1]['ID'])
    .font('dataPDF/fonts/Montserrat-Bold.ttf')

    // ------------- Plane information -------------- // 
    .moveDown()
    .fontSize(22.5).fillColor([115,115,115])
    .text('▶', {align: 'left', continued: true})
    .fillColor('black').fontSize(11)
    .text(' Plane name: ', 73, 335.5, {continued: true})
    .font('dataPDF/fonts/Montserrat-Regular.ttf')
    .text(inputData[1]['Flight name'], {continued: true})
    .font('dataPDF/fonts/Montserrat-Bold.ttf')
    .text(' - Captain: ', {continued: true})
    .font('dataPDF/fonts/Montserrat-Regular.ttf')
    .text(inputData[1]['Captain'])

    // ------------- Total customer -------------- // 
    .moveDown()
    .fontSize(22.5).fillColor([115,115,115])
    .text('▶', {align: 'left', continued: true})
    .fillColor('black').fontSize(11)
    .font('dataPDF/fonts/Montserrat-Bold.ttf')
    .text(' Total customer: ', 73, 370.5, {continued: true})
    .font('dataPDF/fonts/Montserrat-Regular.ttf')
    .text(inputData[4]['Customer'])

    // ------------- Revenue + Operation + Profit -------------- // 
    .moveDown()
    .fontSize(22.5).fillColor([115,115,115])
    .text('▶', {align: 'left', continued: true})
    .fillColor('black').fontSize(11)
    .font('dataPDF/fonts/Montserrat-Bold.ttf')
    .text(' Revenue: ', 73, 405.5,{align: 'left', continued: true})
    .font('dataPDF/fonts/Montserrat-Regular.ttf')
    .text(inputData[2]['Revenue In AUD'] + ' AUD', {continued: true})
    .font('dataPDF/fonts/Montserrat-Bold.ttf')
    .text(' - Operation cost: ', {continued: true})
    .font('dataPDF/fonts/Montserrat-Regular.ttf')
    .text(inputData[3]['Cost In AUD'] + ' AUD', {continued: true})
    .font('dataPDF/fonts/Montserrat-Bold.ttf')
    .text(' - Profit: ', {continued: true})
    .font('dataPDF/fonts/Montserrat-Regular.ttf')
    .text(inputData[11]['Profit in AUD'] + ' AUD')

    // ------------- Date start + form -------------- // 
    .moveDown()
    .fontSize(22.5).fillColor([115,115,115])
    .text('▶', {align: 'left', continued: true})
    .fillColor('black').fontSize(11)
    .font('dataPDF/fonts/Montserrat-Bold.ttf')
    .text(' Date start: ', 73, 441.5, {align: 'left', continued: true})
    .font('dataPDF/fonts/Montserrat-Regular.ttf')
    .text(inputData[5]['Date from'])
    .moveDown()
    .fontSize(22.5).fillColor([115,115,115])
    .text('▶', {align: 'left', continued: true})
    .fillColor('black').fontSize(11)
    .font('dataPDF/fonts/Montserrat-Bold.ttf')
    .text(' From: ', 73, 477.5, {align: 'left', continued: true})
    .font('dataPDF/fonts/Montserrat-Regular.ttf')
    .text(inputData[8]['From'])

    // ------------- Date end + to -------------- // 
    .moveDown()
    .fontSize(22.5).fillColor([115,115,115])
    .text('▶', {align: 'left', continued: true})
    .fillColor('black').fontSize(11)
    .font('dataPDF/fonts/Montserrat-Bold.ttf')
    .text(' Date end: ', 73, 513.5, {align: 'left', continued: true})
    .font('dataPDF/fonts/Montserrat-Regular.ttf')
    .text(inputData[6]['Date to'])
    .moveDown()
    .fontSize(22.5).fillColor([115,115,115])
    .text('▶', {align: 'left', continued: true})
    .fillColor('black').fontSize(11)
    .font('dataPDF/fonts/Montserrat-Bold.ttf')
    .text(' To: ', 73, 549.5, {align: 'left', continued: true})
    .font('dataPDF/fonts/Montserrat-Regular.ttf')
    .text(inputData[9]['To'])

    // ------------- Time Fly -------------- // 
    .moveDown()
    .fontSize(22.5).fillColor([115,115,115])
    .text('▶', {align: 'left', continued: true})
    .fillColor('black').fontSize(11)
    .font('dataPDF/fonts/Montserrat-Bold.ttf')
    .text(' Time fly: ', 73, 585, {align: 'left', continued: true})
    .font('dataPDF/fonts/Montserrat-Regular.ttf')
    .text(inputData[7]['TimeFly'] + ' Hours')

    // ----------- title end ----------- //
    .text('"Analysis by Desplay Shido"', 410, doc.page.height - 50, {align: 'right', lineBreak: false})
    .end();
    return;
}

const exportsPDFWeekly = function(inputData) {
    const doc = new MakePDF({size: 'A4'});
    const PathWeekly = path.join(Path, 'Weekly');
    CheckFolder(PathWeekly);
    const ID = inputData[1]['DayToDay'][0] + '-' + inputData[1]['DayToDay'][inputData[1]['DayToDay'].length-1];
    const PathChartBar ='./dataPDF/Chart/' + ID + '-Bar-Chart.png';
    const PathChartCircle ='./dataPDF/Chart/' + ID + '-Circle-Chart.png';
    const NamePDF ='\\' + inputData[1]['Date']['Start'] + '-' +inputData[1]['Date']['End'] + '.pdf';
    doc.pipe(fs.createWriteStream(PathWeekly + NamePDF));
    doc

    // ----------- title ----------- //
    .font('dataPDF/fonts/Montserrat-Black.ttf')
    .fontSize(20).fillColor([111,111,111])
    .text(inputData[0], {align: 'center'})
    .font('dataPDF/fonts/Montserrat-Bold.ttf')
    .fontSize(15)
    .text(inputData[1]['Date']['Start'] + ' - ' + inputData[1]['Date']['End'], {align: 'center'})
    .fontSize(5)
    .moveDown()
    .font('dataPDF/fonts/Montserrat-Regular.ttf')
    .fontSize(10).fillColor('black')
    .text('Flights are recorded on a daily basis, and are completed based on analyst Desplay Shido, any questions please contact email: ' + 'desplayshido@proton.me', {align: 'center' ,mailto:'desplayshido@gmail.com'})
    
    // ----------- Image ----------- //
    .image('dataPDF/image/data image.png', 360, 160, {scale: 0.5})
    .fillColor('black').fontSize(15)

    // ----------- Most used aircraft ----------- //
    .moveDown()
    .fontSize(22.5).fillColor([115,115,115])
    .text('▶', {align: 'left', continued: true})
    .fillColor('black').fontSize(11)
    .font('dataPDF/fonts/Montserrat-Bold.ttf')
    .text(' Most used aircraft: ', 73, 165.5, {continued: true})
    .font('dataPDF/fonts/Montserrat-Regular.ttf')
    .text(inputData[2][0]['Flight name'])

    // ----------- Total customer for week ----------- //
    .fontSize(22.5).fillColor([115,115,115])
    .text('▶', {align: 'left', continued: true})
    .fillColor('black').fontSize(11)
    .font('dataPDF/fonts/Montserrat-Bold.ttf')
    .text(' Total customer for week: ', 73, 187.5, {continued: true})
    .font('dataPDF/fonts/Montserrat-Regular.ttf')
    .text(inputData[3]['Total Customer'])

    // ----------- Total time fly ----------- //
    .fontSize(22.5).fillColor([115,115,115])
    .text('▶', {align: 'left', continued: true})
    .fillColor('black').fontSize(11)
    .font('dataPDF/fonts/Montserrat-Bold.ttf')
    .text(' Total time fly: ', 73, 209, {continued: true})
    .font('dataPDF/fonts/Montserrat-Regular.ttf')
    .text(inputData[4]['Total Time Fly'] + ' Hours')


    // ----------- Avenage time fly ----------- //
    .fontSize(22.5).fillColor([115,115,115])
    .text('▶', {align: 'left', continued: true})
    .fillColor('black').fontSize(11)
    .font('dataPDF/fonts/Montserrat-Bold.ttf')
    .text(' Avenage time fly: ', 73, 231, {continued: true})
    .font('dataPDF/fonts/Montserrat-Regular.ttf')
    .text(inputData[5]['Avarage Flight Time'] + ' Hours')
    

    // ----------- Places to go the most ----------- //
    .fontSize(22.5).fillColor([115,115,115])
    .text('▶', {align: 'left', continued: true})
    .fillColor('black').fontSize(11)
    .font('dataPDF/fonts/Montserrat-Bold.ttf')
    .text(' Places to go the most: ', 73, 253.5, {continued: true})
    .font('dataPDF/fonts/Montserrat-Regular.ttf')
    .text(inputData[6]['Where Most From'][0]['From'])


    // ----------- Places to go the most ----------- //
    .fontSize(22.5).fillColor([115,115,115])
    .text('▶', {align: 'left', continued: true})
    .fillColor('black').fontSize(11)
    .font('dataPDF/fonts/Montserrat-Bold.ttf')
    .text(' Destination to go the most: ', 73, 275.5, {continued: true})
    .font('dataPDF/fonts/Montserrat-Regular.ttf')
    .text(inputData[7]['Where Most To'][0]['To'])


    .image(PathChartBar, 73, 300, {scale: 0.375})
    .fontSize(11).fillColor('black')
    .font('dataPDF/fonts/Montserrat-Italic.ttf')
    .text('Daily profit analysis chart', 73, 522.5, {align: 'center'})

    

    .image(PathChartCircle, 73, 540, {scale: 0.375})
    .font('dataPDF/fonts/Montserrat-Italic.ttf')
    .text('Weekly starting position analysis chart', 73, 750, {align: 'center'})

    .text('"Analysis by Desplay Shido"', 410, doc.page.height - 50, {align: 'right', lineBreak: false})
      
    .end();
    return;
}

module.exports = {exportsPDFDaily,exportsPDFWeekly};