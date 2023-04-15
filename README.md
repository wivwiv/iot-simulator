# IoT Simulator

Construct simulated IoT data according to the preset scenarios, and use an MQTT client to generate simulated data based on specified parameters and send it to a specific MQTT broker.

## Run

### Local

Node.js: 14+

```bash
yarn install && yarn link

iot-simulator --host broker.emqx.io --sense tesla --count 10
# node index.js
```

### Docker

```bash
docker pull docker.pkg.github.com/wivwiv/iot-simulator/iot-simulator

docker run -it --rm iot-simulator

> 46550e525157:/app#

iot-simulator --host broker.emqx.io --sense tesla --count 10

1s Messages: 0, Bytes: 0 Bytes, Speed: 0/s, 0 Bytes/s
2s Messages: 0, Bytes: 0 Bytes, Speed: 0/s, 0 Bytes/s
3s Messages: 0, Bytes: 0 Bytes, Speed: 0/s, 0 Bytes/s
4s Messages: 10, Bytes: 2.76 KB, Speed: 10/s, 2.76 KB/s
5s Messages: 20, Bytes: 5.52 KB, Speed: 10/s, 2.76 KB/s
6s Messages: 30, Bytes: 8.29 KB, Speed: 10/s, 2.77 KB/s
7s Messages: 40, Bytes: 11.04 KB, Speed: 10/s, 2.75 KB/s
8s Messages: 50, Bytes: 13.8 KB, Speed: 10/s, 2.76 KB/s
9s Messages: 60, Bytes: 16.57 KB, Speed: 10/s, 2.77 KB/s
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
