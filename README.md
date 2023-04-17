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
  "vin": "XTEJ1XX637YH70924",
  "speed": 92,
  "odometer": 32802,
  "soc": 34,
  "elevation": 420,
  "heading": 221,
  "accuracy": 28,
  "power": 98,
  "shift_state": "N",
  "range": 201,
  "est_battery_range": 347,
  "gps_as_of": 1681712241686,
  "location": {
    "latitude": "69.8736",
    "longitude": "119.3114"
  },
  "timestamp": 1681712241687
}
```

### logistics

```json
{
  "shipment_id": "c47f92ba-51d0-4eeb-98ae-50b657fedf6c",
  "origin": "West Rebekah",
  "destination": "Brooklynland",
  "temperature": 3,
  "humidity": 90,
  "weight": 596,
  "location": {
    "latitude": "-52.3820",
    "longitude": "-80.4776"
  },
  "timestamp": "2023-04-17T06:17:21.688Z"
}
```

### industrial

```json
{
  "machine_id": "666bff56-5b44-4762-a4c9-bca5da449970",
  "temperature": 173,
  "pressure": 308,
  "speed": 985,
  "timestamp": "2023-04-17T06:17:21.688Z"
}
```

### wind-turbine

```json
{
  "rpm": 3,
  "powerOutput": 4644
}
```

### weather-station

```json
{
  "station_id": "5f839460-96e1-4c55-afd4-d7d7983603d3",
  "temperature": -21,
  "humidity": 74,
  "pressure": 1096,
  "wind_speed": 48,
  "wind_direction": "S",
  "timestamp": "2023-04-17T06:17:21.688Z"
}
```

### payment

```json
{
  "transaction_id": "25904546-9052-40ea-aeb9-c4dc4b2fedb1",
  "merchant_id": "12e52ba5-8b14-40bf-878c-f4c430b1a4b4",
  "customer_id": "9a791b6c-f15a-4951-bf82-382f0890a95f",
  "amount": 4570,
  "currency": "RSD",
  "timestamp": "2023-04-17T06:17:21.688Z"
}
```

### vending-machine

```json
{
  "machine_id": "0c2b03a7-1baa-4836-8f70-a33ac949aeac",
  "product_id": "0a5d3495-d8b6-4daf-bdf9-944d75556ba8",
  "price": 77,
  "quantity": 4,
  "timestamp": "2023-04-17T06:17:21.688Z"
}
```
