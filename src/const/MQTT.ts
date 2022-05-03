export const MQTTConnection = {
    hostname: 'mqtt.flespi.io', 
    port: 80,
    protocol: 'ws'
}

export const MQTTCategories = {
    temp: 'temperature',
    water: 'water'
}

/**
 * Example of a path: gardens/Ali/garden1/temperature
 */
export const MQTTPath = {
    root: 'gardens/',
    ...MQTTCategories
}