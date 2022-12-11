const express = require('express')
  , bodyParser = require('body-parser')
  , cors = require('cors')
  , app = express();

/* load dotenv */
require('dotenv').load();
const config = require('./src/config/config');

/* Middlewares */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

/* Routes */
app.get('/', (req, res) => {
  res.json({
    'endpoints': config.api.endpoints
  });
});

app.use('/api', require('./src/routes/main'));

/* App listen */
app.listen(4000, () => console.log(`O back-end esta no ar na porta 4000`));


