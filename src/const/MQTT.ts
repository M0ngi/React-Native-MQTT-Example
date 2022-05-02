export class MQTTCst{
    public static readonly connection = {
        hostname: 'mqtt.flespi.io', 
        port: 80,
        protocol: 'ws'
    }
    public static readonly topic = {
        root: 'gardens/',
        temp: 'temperature',
        water: 'water'
    }
}
