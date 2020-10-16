/**
 * Find and format particular strings
 *
 * @author James W. <james.williams@points.com>
 */

const ENDPOINT = 'https://75c50537de98.ngrok.io';

/**
 * onOpen event from Google Sheets
 *
 * Adds our custom menu to the Sheet to allow us to run our functions at will.
 */
function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    {name: 'Run Formatter', functionName: 'formatText'},
    {name: 'Run debug function', functionName: 'getRows' },
  ];
  spreadsheet.addMenu('Points', menuItems);
}

/**
 * Format our text
 *
 * @see https://docs.google.com/document/d/1GOupiSKzrzbxDY7snxy7Vx9YMmNiNlVwcjXlEub4HBY/edit
 */
function formatText() {

  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var input = sheet.getRange("A2");
  var output = sheet.getRange("B2");
  var debug = sheet.getRange("C2");
  var val = input.getValue();

  var entries = [];
  entries.push(val);

  var options = {
    'method' : 'post',
    'payload' : {
      'entries': JSON.stringify(entries)
    }
  };
  var response = JSON.parse(UrlFetchApp.fetch(ENDPOINT + '/parse', options));
  var temp_response = response[0][0];

  var len = val.length; // length of string in A1
  var rich = SpreadsheetApp.newRichTextValue(); //new RichText
  rich.setText(val); //Set Text value in A1 to RichText as base

  var style = SpreadsheetApp.newTextStyle(); // Create a new text style for each character
  style.setForegroundColor('#F00');
  var buildStyle = style.build();

  var start = val.indexOf(temp_response);
  var end = start + temp_response.length;

  debug.setValue(JSON.stringify(temp_response));

  rich.setTextStyle(start, end, buildStyle); // set this text style to the current character and save it to Rich text

  var format = rich.build();
  output.setRichTextValue(format); //Set the final RichTextValue to A1

}

/** Attempt at multirow-formatting */
function getRows() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var input = sheet.getRange("A2:A999");
  var data = input.getValues();

  var entries = data.filter((node) => node[0] !== '');

  var options = {
    'method' : 'post',
    'payload' : {
      'entries': JSON.stringify(entries)
    }
  };

  var translatableStrings = JSON.parse(UrlFetchApp.fetch(ENDPOINT + '/parse', options));

  translatableStrings.forEach((row, index) => {

    var originalValue = data[index][0];
    var rangeKey = `B${index + 2}`;

    var rich = SpreadsheetApp.newRichTextValue(); //new RichText
    rich.setText(originalValue); //Set Text value in A1 to RichText as base

    var defaultStyle = SpreadsheetApp.newTextStyle(); // Create a new text style for each character
    defaultStyle.setForegroundColor('#F00');
    var defaultStyleBuilt = defaultStyle.build();

    var highlightStyle = SpreadsheetApp.newTextStyle();
    highlightStyle.setForegroundColor('#000');
    var highlightStyleBuilt = highlightStyle.build();

    rich.setTextStyle(0, originalValue.length, defaultStyleBuilt);

    var debug = sheet.getRange(`C${index + 2}`);
    debug.setValue(JSON.stringify(row));

    row.forEach((substring) => {

      var start = originalValue.indexOf(substring);
      var end = start + substring.length;

      rich.setTextStyle(start, end, highlightStyleBuilt);
    });

    var output = sheet.getRange(rangeKey);

    var format = rich.build();
    output.setRichTextValue(format);

  });


}
