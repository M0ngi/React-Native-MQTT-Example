import * as mqtt from '@taoqf/react-native-mqtt'
import { NotLoggedInError } from '../errors';
import { MQTTCst } from '../const/MQTT';

export interface IMQTTCreds {
  username: string;
  password: string;
  clientid: string;
}

export class SmartGardenClient{
  private static _instance ?: mqtt.MqttClient = undefined;
  private static loginCreds ?: IMQTTCreds = undefined;

  private constructor(){

  }

  public static getClient(){
    if(this._instance){
      return this._instance;
    }
    else{
      throw new NotLoggedInError();
    }
  }

  public static get isConnected(){
    return this._instance !== undefined;
  }

  public static login(creds ?: IMQTTCreds) : mqtt.MqttClient{
    if(this._instance){
      if(this._instance.connected)
        return this._instance;
    }
    if(creds){
      this.loginCreds = creds;
    }
    else{
      if(!this.loginCreds){
        throw new NotLoggedInError();
      }
    }
    
    const opt = {
      ...this.loginCreds,
      ...MQTTCst.connection
    };

    this._instance = mqtt.connect(opt);
    return this._instance;
  }

  public static logout(){
    if(this._instance) this._instance.end();

    this._instance = undefined;
    this.loginCreds = undefined;
  }
}