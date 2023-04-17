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
docker run -it --rm docker.pkg.github.com/wivwiv/iot-simulator/iot-simulator \
  iot-simulator --host broker.emqx.io \
  --sense tesla \
  --count 10

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

## CLI Usage

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

## Sense

### tesla

```json
{
  "vin": "G0BX548WTMTN62431",
  "speed": 157,
  "odometer": 36125,
  "soc": 71,
  "elevation": 1131,
  "heading": 301,
  "accuracy": 20,
  "power": 139,
  "shift_state": "P",
  "range": 32,
  "est_battery_range": 201,
  "gps_as_of": 1681711221404,
  "location": {
    "latitude": "-80.3685",
    "longitude": "113.3760"
  },
  "timestamp": 1681711221404
}
```

### logistics

```json
{
  "vin": "JUMV7ZUU8AAW31194",
  "speed": 119,
  "odometer": 9644,
  "soc": 93,
  "elevation": 1341,
  "heading": 309,
  "accuracy": 38,
  "power": 181,
  "shift_state": "R",
  "range": 210,
  "est_battery_range": 91,
  "gps_as_of": 1681711221404,
  "location": {
    "latitude": "-46.7968",
    "longitude": "72.8519"
  },
  "timestamp": 1681711221404
}
```

### industrial

```json
{
  "vin": "J7TDT9648VW641643",
  "speed": 103,
  "odometer": 63893,
  "soc": 17,
  "elevation": 2073,
  "heading": 204,
  "accuracy": 12,
  "power": 167,
  "shift_state": "N",
  "range": 82,
  "est_battery_range": 239,
  "gps_as_of": 1681711221405,
  "location": {
    "latitude": "-79.8257",
    "longitude": "145.4431"
  },
  "timestamp": 1681711221405
}
```

### wind-turbine

```json
{
  "vin": "2687C33MG7BW87551",
  "speed": 29,
  "odometer": 19697,
  "soc": 19,
  "elevation": 2581,
  "heading": 141,
  "accuracy": 31,
  "power": 118,
  "shift_state": "N",
  "range": 67,
  "est_battery_range": 368,
  "gps_as_of": 1681711221405,
  "location": {
    "latitude": "-6.5461",
    "longitude": "84.4353"
  },
  "timestamp": 1681711221405
}
```

### weather-station

```json
{
  "vin": "827AC5BJZRRG90041",
  "speed": 8,
  "odometer": 26779,
  "soc": 78,
  "elevation": 2050,
  "heading": 324,
  "accuracy": 24,
  "power": 57,
  "shift_state": "D",
  "range": 361,
  "est_battery_range": 96,
  "gps_as_of": 1681711221405,
  "location": {
    "latitude": "77.5869",
    "longitude": "-120.3418"
  },
  "timestamp": 1681711221405
}
```

### payment

```json
{
  "vin": "H9BUB26FV0RN84963",
  "speed": 127,
  "odometer": 70960,
  "soc": 24,
  "elevation": 3401,
  "heading": 32,
  "accuracy": 9,
  "power": 36,
  "shift_state": "D",
  "range": 379,
  "est_battery_range": 0,
  "gps_as_of": 1681711221405,
  "location": {
    "latitude": "88.4010",
    "longitude": "124.9621"
  },
  "timestamp": 1681711221405
}
```

### vending-machine

```json
{
  "vin": "VN0GZ01A56RJ28846",
  "speed": 14,
  "odometer": 45105,
  "soc": 74,
  "elevation": 3473,
  "heading": 163,
  "accuracy": 29,
  "power": 175,
  "shift_state": "D",
  "range": 44,
  "est_battery_range": 358,
  "gps_as_of": 1681711221405,
  "location": {
    "latitude": "-38.3728",
    "longitude": "-82.6245"
  },
  "timestamp": 1681711221405
}
```
