# IoT Simulator

Construct simulated IoT data according to the preset scenarios, and use an MQTT client to generate simulated data based on specified parameters and send it to a specific MQTT broker.

## Run

### Local

Node.js: 14+

```bash
yarn install
node main.js
```

### Docker

```bash
docker build -t iot-simulator .
docker run -it --rm --name iot-simulator iot-simulator \
  node main.js --host broker.emqx.io --sense tesla --count 10
```

## CLI Useage

| Option            | Description                                                                                                          |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| --version         | Show version number                                                                                                  |
| --mqtt-version    | MQTT version                                                                                                         |
|                   | Possible values: "3.1.1", "5.0"                                                                                      |
|                   | Default: "3.1.1"                                                                                                     |
| --host            | MQTT broker host                                                                                                     |
|                   | Default: "localhost"                                                                                                 |
| --port            | MQTT broker port                                                                                                     |
|                   | Default: 1883                                                                                                        |
| --clientid        | MQTT client ID                                                                                                       |
|                   | Default: ""                                                                                                          |
| --username        | MQTT username                                                                                                        |
| --password        | MQTT password                                                                                                        |
| --protocol        | MQTT connection protocol                                                                                             |
|                   | Possible values: "mqtt"                                                                                              |
|                   | Default: "mqtt"                                                                                                      |
| --keepalive       | MQTT keepalive interval in seconds                                                                                   |
|                   | Default: 60                                                                                                          |
| --sense           | Mock data sense                                                                                                      |
|                   | Possible values: "tesla", "logistics", "industrial", "wind-turbine", "weather-station", "payment", "vending-machine" |
|                   | Default: "tesla"                                                                                                     |
| --topic_prefix    | MQTT topic prefix                                                                                                    |
|                   | Default: ""                                                                                                          |
| --client_suffix   | MQTT client ID suffix                                                                                                |
|                   | Default: ""                                                                                                          |
| --retain          | Enable retained messages                                                                                             |
|                   | Default: false                                                                                                       |
| --qos             | MQTT QoS                                                                                                             |
|                   | Possible values: 0, 1, 2                                                                                             |
|                   | Default: 0                                                                                                           |
| --interval        | Interval between each MQTT client connection in milliseconds                                                         |
|                   | Default: 10                                                                                                          |
| --interval_of_msg | Interval between each mock data generation and MQTT publish in milliseconds                                          |
|                   | Default: 1000                                                                                                        |
| --count           | Number of MQTT clients to simulate                                                                                   |
|                   | Default: 1                                                                                                           |
| -h, --help        | Show help                                                                                                            |
