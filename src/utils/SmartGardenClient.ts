import * as mqtt from '@taoqf/react-native-mqtt'
import { NotLoggedInError } from '../errors';
import { MQTTConnection } from '../const/MQTT';
import { Garden } from './Garden';
import { getUserMQTTPath } from './mqtt';

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
    return this._instance !== undefined && this._instance.connected;
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
      ...MQTTConnection
    };

    console.log('MQTT Login')
    console.log(opt);
    this._instance = mqtt.connect(opt);
    return this._instance;
  }

  public static logout(){
    if(this._instance) this._instance.end();

    this._instance = undefined;
    this.loginCreds = undefined;
  }

  public static subscribe(gardens: Garden[]){
    if(!this.loginCreds){
      throw new Error("");
      // TODO : Throw error
    }
    this.getClient().subscribe(getUserMQTTPath(this.loginCreds.clientid))
    // this.getClient().subscribe(gardens.map((garden)=>{
    //   return garden.mqtt_id;
    // }))
  }

  public static unsubscribe(){
    if(!this.loginCreds){
      throw new Error("");
      // TODO : Throw error
    }
    this.getClient().unsubscribe(getUserMQTTPath(this.loginCreds.clientid));
    this.getClient().removeAllListeners("message");
  }
}