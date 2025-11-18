require('dotenv').config();
const express = require('express');
const mqttHandler = require('./mqttHandler');
const influxService = require('./influxService');
const alertService = require('./alertService');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.send({status: 'ok'}));

app.get('/stats', async (req, res) => {
  try {
    const stats = await influxService.queryLast24h();
    res.json(stats);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Backend running on port', PORT);
  mqttHandler.start();
});
