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

Refer from [teslamate](https://github.com/adriankumpf/teslamate) - [MQTT Integration](https://docs.teslamate.org/docs/integrations/mqtt).

```json
{
    "car_id": "M6XKLSS4RTXY63431",
    "display_name": "Terrence's Tesla",
    "state": "asleep",
    "since": "2023-04-18T14:54:46.055Z",
    "healthy": false,
    "version": "2.5.0",
    "update_available": true,
    "update_version": "9.6.5",
    "model": "S",
    "trim_badging": "optio",
    "exterior_color": "red",
    "wheel_type": "iure",
    "spoiler_type": "expedita",
    "geofence": "New Charlesport",
    "latitude": "51.1366",
    "longitude": "-47.7846",
    "shift_state": "D",
    "power": -7725,
    "speed": 163,
    "heading": 336,
    "elevation": 2559,
    "locked": true,
    "sentry_mode": true,
    "windows_open": false,
    "doors_open": true,
    "trunk_open": false,
    "frunk_open": false,
    "is_user_present": true,
    "is_climate_on": true,
    "inside_temp": -1.9,
    "outside_temp": 23,
    "is_preconditioning": false,
    "odometer": 374097,
    "est_battery_range_km": 634,
    "rated_battery_range_km": 922.4,
    "ideal_battery_range_km": 703.3,
    "battery_level": 69,
    "usable_battery_level": 69,
    "plugged_in": true,
    "charge_energy_added": 68.97,
    "charge_limit_soc": 99,
    "charge_port_door_open": true,
    "charger_actual_current": 16.91,
    "charger_power": 24,
    "charger_voltage": 238,
    "charge_current_request": 23,
    "charge_current_request_max": 42,
    "scheduled_charging_start_time": "2023-08-02T09:14:17.778Z",
    "time_to_full_charge": 8.29,
    "tpms_pressure_fl": 3.2,
    "tpms_pressure_fr": 3.5,
    "tpms_pressure_rl": 2.6,
    "tpms_pressure_rr": 2.9,
    "timestamp": 1681870033506
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
