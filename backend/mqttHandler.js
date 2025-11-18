const mqtt = require('mqtt');
const influxService = require('./influxService');
const alertService = require('./alertService');

const brokerUrl = process.env.MQTT_BROKER || 'mqtt://localhost:1883';
const client = mqtt.connect(brokerUrl);

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe('energysense/+/power', (err) => {
    if (err) console.error('Subscribe error', err);
  });
});

client.on('message', async (topic, msg) => {
  try {
    const payload = JSON.parse(msg.toString());
    console.log('MQTT message', topic, payload);
    await influxService.writePoint(payload);
    if (payload.current > 5.0) { // exemplo: corrente > 5A
      await alertService.sendAlert(payload);
    }
  } catch (err) {
    console.error('Message handler error', err);
  }
});

module.exports = { start: () => {} };
