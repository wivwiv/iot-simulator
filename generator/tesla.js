faker = require('faker');
const idStore = {}

function generateData(id) {
  const storeData = idStore[id] || {}
  const data = {
    car_id: faker.vehicle.vin(),
    display_name: faker.name.firstName() + "'s Tesla",
    state: faker.random.arrayElement(['online', 'asleep', 'charging']),
    since: faker.date.recent().toISOString(),
    healthy: faker.datatype.boolean(),
    version: faker.system.semver(),
    update_available: faker.datatype.boolean(),
    update_version: faker.system.semver(),
    model: faker.random.arrayElement(['S', '3', 'X', 'Y']),
    trim_badging: faker.lorem.word(),
    exterior_color: faker.commerce.color(),
    wheel_type: faker.lorem.word(),
    spoiler_type: faker.lorem.word(),
    geofence: faker.address.city(),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    shift_state: faker.random.arrayElement(['D', 'N', 'R', 'P']),
    power: faker.datatype.number({ min: -10000, max: 10000 }),
    speed: faker.datatype.number({ min: 0, max: 200 }),
    heading: faker.datatype.number({ min: 0, max: 359 }),
    elevation: faker.datatype.number({ min: -100, max: 5000 }),
    locked: faker.datatype.boolean(),
    sentry_mode: faker.datatype.boolean(),
    windows_open: faker.datatype.boolean(),
    doors_open: faker.datatype.boolean(),
    trunk_open: faker.datatype.boolean(),
    frunk_open: faker.datatype.boolean(),
    is_user_present: faker.datatype.boolean(),
    is_climate_on: faker.datatype.boolean(),
    inside_temp: faker.datatype.number({ min: -20, max: 50, precision: 0.1 }),
    outside_temp: faker.datatype.number({ min: -20, max: 50, precision: 0.1 }),
    is_preconditioning: faker.datatype.boolean(),
    odometer: faker.datatype.number({ min: 0, max: 1000000 }),
    est_battery_range_km: faker.datatype.number({ min: 0, max: 1000, precision: 0.1 }),
    rated_battery_range_km: faker.datatype.number({ min: 0, max: 1000, precision: 0.1 }),
    ideal_battery_range_km: faker.datatype.number({ min: 0, max: 1000, precision: 0.1 }),
    battery_level: faker.datatype.number({ min: 0, max: 100 }),
    usable_battery_level: faker.datatype.number({ min: 0, max: 100 }),
    plugged_in: faker.datatype.boolean(),
    charge_energy_added: faker.datatype.number({ min: 0, max: 100, precision: 0.01 }),
    charge_limit_soc: faker.datatype.number({ min: 0, max: 100 }),
    charge_port_door_open: faker.datatype.boolean(),
    charger_actual_current: faker.datatype.number({ min: 0, max: 100, precision: 0.01 }),
    charger_power: faker.datatype.number({ min: 1, max: 100 }),
    charger_voltage: faker.datatype.number({ min: 220, max: 240 }),
    charge_current_request: faker.datatype.number({ min: 10, max: 50 }),
    charge_current_request_max: faker.datatype.number({ min: 10, max: 50 }),
    scheduled_charging_start_time: faker.date.between('2023-01-01', '2023-12-31').toISOString(),
    time_to_full_charge: faker.datatype.number({ min: 0.5, max: 10, precision: 0.01 }),
    tpms_pressure_fl: faker.datatype.number({ min: 2.0, max: 3.5, precision: 0.1 }),
    tpms_pressure_fr: faker.datatype.number({ min: 2.0, max: 3.5, precision: 0.1 }),
    tpms_pressure_rl: faker.datatype.number({ min: 2.0, max: 3.5, precision: 0.1 }),
    tpms_pressure_rr: faker.datatype.number({ min: 2.0, max: 3.5, precision: 0.1 }),
    timestamp: Date.now(),
    ...storeData
  }
  if (id && !idStore[id]) {
    idStore[id] = {
      car_id: data.car_id,
      display_name: data.display_name,
      model: data.model,
      trim_badging: data.trim_badging,
      exterior_color: data.exterior_color,
      wheel_type: data.wheel_type,
      spoiler_type: data.spoiler_type,
      geofence: data.geofence,
    }
  }
  return data
}

module.exports = generateData