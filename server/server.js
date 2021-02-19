const express = require('express');
const bodyParser = require("body-parser");
const { core } = require('../lib/core/core');
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get('/',(req, res) => {
  res.sendFile(__dirname + "/index.html");
});

router.post('/parse', (req, res) => {
  const { entries } = req.body;
  const responses = [];

  const entriesArray = (typeof entries === 'string' ? JSON.parse(entries) : entries);

  entriesArray.forEach((test) => {
    responses.push(core(test));
  });

  res.json(responses);
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
