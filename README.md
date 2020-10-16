# Translations formatter

## Overview

Two core components of this deliverable:

- The Google App Script - This component interfaces with the Google Sheet of translations and handles the formatting of the cells.
- The `parser()` function - This is the JS function that breaks our test strings down into a format that we can pass to our Google app script to format with.

The Google App Script (GAS) portion of this project accepts an array of arrays of pairs of numbers denoting the start and end of the "translatable" sub-strings of the current cell. This component script fails safe. It will assume the whole string is not translatable unless a provided range of characters is provided denoting substrings that need translating.

The `parse()` expected input is a single string.

## Getting Started with development

Use `npm start` to run the server locally.

Use `npm run develop` to run the server with [nodemon](https://nodemon.io/) to automatically restarts the node server.

You can use [Ngrok](https://ngrok.com/) to tunnel the app script to your local machine during development. Changing the `ENDPOINT` constant at the top of the [app.gs](./google-app-script/app.gs) file to your HTTPs Ngrok tunnel URL will route the script requests to your local server.

## Tests

Test suite written with [Mocha](https://mochajs.org/)/[Chai](https://www.chaijs.com/) to ensure the`parese()` function correctly processes strings. These do not test the GAS script formatting. 

```
npm test
```

## Todo

- [ ] Set default text color of the output to red (matches then set to black).
- [ ] Handle multiple rows rather than singular
- [ ] Update tests to cover test cases.

