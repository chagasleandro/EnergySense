const { InfluxDB, Point } = require('@influxdata/influxdb-client');

const url = process.env.INFLUX_URL;
const token = process.env.INFLUX_TOKEN;
const org = process.env.INFLUX_ORG;
const bucket = process.env.INFLUX_BUCKET || 'energysense';

const client = new InfluxDB({ url, token });
const writeApi = client.getWriteApi(org, bucket);
const queryApi = client.getQueryApi(org);

async function writePoint(payload) {
  const p = new Point('power')
    .tag('device_id', payload.device_id)
    .floatField('current', Number(payload.current))
    .timestamp(new Date(payload.timestamp * 1000));
  writeApi.writePoint(p);
  try {
    await writeApi.flush();
  } catch (err) {
    console.error('Influx write error', err);
  }
}

async function queryLast24h() {
  const flux = `from(bucket: "${bucket}") |> range(start: -24h) |> filter(fn: (r) => r._measurement == "power") |> mean()`;
  const rows = [];
  return new Promise((resolve, reject) => {
    queryApi.queryRows(flux, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row);
        rows.push(o);
      },
      error(err) { reject(err); },
      complete() { resolve(rows); }
    });
  });
}

module.exports = { writePoint, queryLast24h };
