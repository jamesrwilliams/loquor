const express = require('express');
const bodyParser = require("body-parser");
const { parser, debug } = require('../lib/parser');
const app = express();
const port = 3000;
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get('/',(req, res) => {
  res.sendFile(__dirname + "/index.html");
});

router.post('/parse', (req, res) => {
  var testCases = req.body;
  var responses = [];

  testCases.forEach((test) => {
    responses.push(parser(test));
  });

  res.json(responses);
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
