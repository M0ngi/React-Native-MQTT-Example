import * as mqtt from '@taoqf/react-native-mqtt'
import { NotLoggedInError } from '../errors';
import { MQTTCst } from '../const/MQTT';

interface Creds {
    username: string;
    password: string;
    clientid: string;
}

export class SmartGardenClient{
  private static _instance ?: mqtt.MqttClient = undefined;
  private static loginCreds ?: Creds = undefined;

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

  public static login(api ?: string, clientID ?: string){
    if(this._instance){
      if(this._instance.connected)
        return this._instance;
    }
    if(api && clientID){
      this.loginCreds = {
        username: api,
        password: api,
        clientid: clientID,
      };
    }
    else{
      if(!this.loginCreds){
        throw new NotLoggedInError();
      }
      // Update
      if(api){
        this.loginCreds.password = api;
        this.loginCreds.username = api;
      }
      else if(clientID){
        this.loginCreds.clientid = clientID;
      }
    }
    
    const opt = {
      ...this.loginCreds,
      ...MQTTCst.connection
    };

    this._instance = mqtt.connect(opt)
  }

  public static logout(){
    if(this._instance) this._instance.end();

    this._instance = undefined;
    this.loginCreds = undefined;
  }
}