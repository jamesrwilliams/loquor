/**
 * Find and format particular strings
 *
 * @author James W. <james.williams@points.com>
 */

const ENDPOINT = 'https://loquor.herokuapp.com';

/**
 * onOpen event from Google Sheets
 *
 * Adds our custom menu to the Sheet to allow us to run our functions at will.
 */
function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    { name: 'Run Formatter', functionName: 'getRows' },
  ];
  spreadsheet.addMenu('Translation Formatting', menuItems);
}

/**
 * Multiple row formatting implementation
 **/
function getRows() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var input = sheet.getRange("A2:A999");
  var values = input.getValues();

  var entries = values.filter((node) => node[0] !== '');

  var options = {
    'method' : 'post',
    'payload' : {
      'entries': JSON.stringify(entries)
    }
  };

  var translatableStrings = JSON.parse(UrlFetchApp.fetch(ENDPOINT + '/parse', options));

  translatableStrings.forEach((row, index) => {

    var originalValue = values[index][0];
    var rangeKey = `B${index + 2}`;

    //new RichTextValue that we're going to apply formatting to.
    var rich = SpreadsheetApp.newRichTextValue();
    rich.setText(originalValue);

    // Create a new text style for each character
    var defaultStyle = SpreadsheetApp.newTextStyle();
    defaultStyle.setForegroundColor('#F00');
    var defaultStyleBuilt = defaultStyle.build();

    var highlightStyle = SpreadsheetApp.newTextStyle();
    highlightStyle.setForegroundColor('#000');
    var highlightStyleBuilt = highlightStyle.build();

    rich.setTextStyle(0, originalValue.length, defaultStyleBuilt);

    var debug = sheet.getRange(`C${index + 2}`);
    debug.setValue(JSON.stringify(row));

    row.forEach((result) => {
      if(result) {
        rich.setTextStyle(result[0], result[1] + 1, highlightStyleBuilt);
      }
    });

    var output = sheet.getRange(rangeKey);

    var format = rich.build();
    output.setRichTextValue(format);

  });


}
