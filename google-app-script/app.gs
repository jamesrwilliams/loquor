/**
 * Find and format particular strings
 *
 * @author James W. <james.williams@points.com>
 */

/**
 * onOpen event from Google Sheets
 *
 * Adds our custom menu to the Sheet to allow us to run our functions at will.
 */
function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    {name: 'Debug styles...', functionName: 'formatText'},
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
  var input = sheet.getRange("A1");
  var output = sheet.getRange("B1");
  var val = input.getValue().toString();

  var len = val.length; // length of string in A1
  var rich = SpreadsheetApp.newRichTextValue(); //new RichText
      rich.setText(val); //Set Text value in A1 to RichText as base

  var style = SpreadsheetApp.newTextStyle(); // Create a new text style for each character
      style.setForegroundColor('#f00');
  var buildStyle = style.build();

  // set this text style to the current character and save it to Rich text
  rich.setTextStyle(0,4, buildStyle);

  var format = rich.build();
  output.setRichTextValue(format); //Set the final RichTextValue to A1

}
