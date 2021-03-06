const express = require('express');
const bodyParser = require('body-parser');
const { entry } = require('../lib/entry');

const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

router.post('/parse', (req, res) => {
  const { entries } = req.body;
  const responses = [];
  const entriesArray = (typeof entries === 'string' ? JSON.parse(entries) : entries);

  if (entriesArray) {
    entriesArray.forEach((test) => {
      responses.push(entry(test[0]));
    });
  }

  res.json(responses);
});

app.use('/', router);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${port}`);
});
