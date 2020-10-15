# Translations formatter

Two core components of this deliverable:

- The Google App Script - This component interfaces with the Google Sheet of translations and handles the formatting of the cells.
- The `parser()` function - This is the JS function that breaks our test strings down into a format that we can pass to our Google app script to format with.

The Google App Script (GAS) portion of this project accepts an array of arrays of pairs of numbers denoting the start and end of the "translatable" sub-strings of the current cell. This component script fails safe. It will assume the whole string is not translatable unless a provided range of characters is provided denoting substrings that need translating.
