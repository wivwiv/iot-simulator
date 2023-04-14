const yargs = require('yargs');
const mqtt = require('mqtt');
const faker = require('faker');

// 使用 yargs 解析参数
const argv = yargs
  .option('mqtt-version', {
    description: 'MQTT version',
    type: 'string',
    choices: ['3.1.1', '5.0'],
    default: '3.1.1'
  })
  .option('host', {
    description: 'MQTT broker host',
    type: 'string',
    default: 'localhost'
  })
  .option('port', {
    description: 'MQTT broker port',
    type: 'number',
    default: 1883
  })
  .option('clientid', {
    description: 'MQTT client ID',
    type: 'string',
    default: '',
    // 模拟数据上报选项中客户端数量 > 1 时，禁止设置该选项
    // conflicts: 'count'
  })
  .option('username', {
    description: 'MQTT username',
    type: 'string'
  })
  .option('password', {
    description: 'MQTT password',
    type: 'string'
  })
  .option('protocol', {
    description: 'MQTT connection protocol',
    type: 'string',
    choices: ['mqtt', /*TODO mqtts*/],
    default: 'mqtt'
  })
  .option('keepalive', {
    description: 'MQTT keepalive interval in seconds',
    type: 'number',
    default: 60
  })
  // .option('tls-cert', {
  //   description: 'TLS certificate file path',
  //   type: 'string'
  // })
  // .option('tls-key', {
  //   description: 'TLS key file path',
  //   type: 'string'
  // })
  // .option('tls-ca', {
  //   description: 'TLS CA file path',
  //   type: 'string'
  // })
  .option('sense', {
    description: 'Mock data sense',
    type: 'string',
    choices: ['tesla', 'logistics', 'industrial', 'wind-turbine', 'weather-station', 'payment', 'vending-machine'],
    default: 'tesla'
  })
  .option('topic_prefix', {
    description: 'MQTT topic prefix',
    type: 'string',
    default: ''
  })
  .option('client_suffix', {
    description: 'MQTT client ID suffix',
    type: 'string',
    default: ''
  })
  .option('retain', {
    description: 'Enable retained messages',
    type: 'boolean',
    default: false
  })
  .option('qos', {
    description: 'MQTT QoS',
    type: 'number',
    choices: [0, 1, 2],
    default: 0
  })
  .option('interval', {
    description: 'Interval between each MQTT client connection in milliseconds',
    type: 'number',
    default: 10
  })
  .option('interval_of_msg', {
    description: 'Interval between each mock data generation and MQTT publish in milliseconds',
    type: 'number',
    default: 1000
  })
  .option('count', {
    description: 'Number of MQTT clients to simulate',
    type: 'number',
    default: 1
  })
  .help()
  .alias('h', 'help')
  .argv;


const counter = {
  lastCount: 0,
  lastBytes: 0,

  msgCount: 0,
  msgBytes: 0,
  messageRate: 0,
  byteRate: 0,

  // 持续时间
  duration: 0,
}

function initMqttClient(arg, index = 0) {
  const generateClientid = `emqx_mock_${Math.random().toString(36).slice(2, 8)}_${index}${arg.client_suffix ? `_${arg.client_suffix}` : ''}`
  const clientid = arg.count > 1 ? generateClientid : arg.clientid || generateClientid;

  const client = mqtt.connect(`${arg.protocol}://${arg.host}:${arg.port}`, {
    clientId: clientid,
    username: arg.username,
    password: arg.password,
    keepalive: arg.keepalive,
    clean: true,
    protocolVersion: arg.mqttVersion === '3.1.1' ? 4 : 5,
    connectTimeout: 15 * 1000,
  })
  return new Promise((resolve, reject) => {
    client.on('connect', () => {
      return resolve(client);
    })
    client.on('error', (error) => {
      console.log(new Error('MQTT client connect error', error))
      process.exit(1);
    })
  })
}

function startProducers(arg) {
  const producers = [];
  for (let i = 0; i < arg.count; i++) {
    producers.push(new Promise((resolve, reject) => {
      setTimeout(async () => {
        const client = await initMqttClient(arg, i);
        console.log(`Start producer ${client.options.clientId}...`)
        const producer = setInterval(() => {
          const data = generateData(arg.sense);
          const topic = `${arg.topic_prefix ? arg.topic_prefix + '/' : ''}emqx_mock/${arg.sense}/${client.options.clientId}`;
          const payload = JSON.stringify(data);
          client.publish(topic, payload, { qos: arg.qos, retain: arg.retain }, (err) => {
            if (err) {
              console.error(err);
              return
            }
            counter.msgCount++;
            counter.msgBytes += Buffer.byteLength(payload);
          });
        }, arg.interval_of_msg);
        client.on('close', () => {
          clearInterval(producer);
          return resolve();
        })
        client.on('error', (err) => {
          clearInterval(producer);
          return reject(err);
        })
      }, i * arg.interval);
    }))
  }
  return producers;
}

// 根据输入的 bytes，自适应返回 KB、MB、GB、TB 等单位
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function main() {

  console.log(`Connect to MQTT broker: ${argv.host}:${argv.port}`, `sense is ${argv.sense}, count is ${argv.count}, msg interval is ${argv.interval_of_msg}ms`);

  // 启动模拟数据生成和上报
  const producers = startProducers(argv);

  // 记录实时消息速度、当前消息总数、实时消息 bytes 大小，当前总消息 bytes 大小
  setInterval(() => {
    counter.duration++;
    counter.messageRate = counter.msgCount - counter.lastCount;
    counter.byteRate = counter.msgBytes - counter.lastBytes;
    counter.msgBytesUnit = formatBytes(counter.msgBytes);
    counter.byteRateUnit = formatBytes(counter.byteRate);
    console.log(
      `${counter.duration}s Messages: ${counter.msgCount}, Bytes: ${formatBytes(counter.msgBytes)}, Speed: ${counter.messageRate}/s, ${formatBytes(counter.byteRate)}/s`
    )
    counter.lastCount = counter.msgCount;
    counter.lastBytes = counter.msgBytes;
  }, 1000);

  // 等待模拟数据生成和上报结束
  await Promise.all(producers);
}

function generateData(sense) {
  switch (sense) {
    case 'tesla':
      return {
        vin: faker.vehicle.vin(),
        speed: faker.datatype.number({ min: 0, max: 160 }),
        odometer: faker.datatype.number({ min: 0, max: 99999 }),
        soc: faker.datatype.number({ min: 0, max: 100 }),
        elevation: faker.datatype.number({ min: -50, max: 5000 }),
        heading: faker.datatype.number({ min: 0, max: 360 }),
        accuracy: faker.datatype.number({ min: 0, max: 50 }),
        power: faker.datatype.number({ min: 0, max: 200 }),
        shift_state: faker.random.arrayElement(['D', 'P', 'R', 'N']),
        range: faker.datatype.number({ min: 0, max: 400 }),
        est_battery_range: faker.datatype.number({ min: 0, max: 400 }),
        heading: faker.datatype.number({ min: 0, max: 360 }),
        gps_as_of: Date.now(),
        // TODO 按照一定的车速，在某个区域内行驶
        location: {
          latitude: faker.address.latitude(),
          longitude: faker.address.longitude(),
        },
        timestamp: Date.now(),
      };
    case 'logistics':
      return {
        shipment_id: faker.random.uuid(),
        origin: faker.address.city(),
        destination: faker.address.city(),
        temperature: faker.random.number({ min: 0, max: 30 }),
        humidity: faker.random.number({ min: 0, max: 100 }),
        weight: faker.random.number({ min: 100, max: 1000 }),
        // TODO 按照一定的车速，在某个区域内行驶
        location: {
          latitude: faker.address.latitude(),
          longitude: faker.address.longitude(),
        },
        timestamp: new Date(),
      };
    case 'industrial':
      return {
        machine_id: faker.random.uuid(),
        temperature: faker.random.number({ min: 100, max: 300 }),
        pressure: faker.random.number({ min: 100, max: 500 }),
        speed: faker.random.number({ min: 100, max: 1000 }),
        timestamp: new Date(),
      };
    case 'wind-turbine':
      return {
        rpm: faker.datatype.number({ min: 0, max: 50 }),
        powerOutput: faker.datatype.number({ min: 0, max: 5000 })
      };
    case 'weather-station':
      return {
        station_id: faker.random.uuid(),
        temperature: faker.random.number({ min: -50, max: 50 }),
        humidity: faker.random.number({ min: 0, max: 100 }),
        pressure: faker.random.number({ min: 900, max: 1100 }),
        wind_speed: faker.random.number({ min: 0, max: 50 }),
        wind_direction: faker.random.arrayElement(['N', 'S', 'E', 'W']),
        timestamp: new Date(),
      };
    case 'payment':
      return {
        transaction_id: faker.random.uuid(),
        merchant_id: faker.random.uuid(),
        customer_id: faker.random.uuid(),
        amount: faker.random.number({ min: 1, max: 10000 }),
        currency: faker.finance.currencyCode(),
        timestamp: new Date(),
      };
    case 'vending-machine':
      return {
        machine_id: faker.random.uuid(),
        product_id: faker.random.uuid(),
        price: faker.random.number({ min: 1, max: 100 }),
        quantity: faker.random.number({ min: 1, max: 100 }),
        timestamp: new Date(),
      };
    default:
      throw new Error(`Unknown sense: ${sense}`);
  }
}

main()