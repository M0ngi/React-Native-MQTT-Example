import { Garden } from "./Garden";
import { IMQTTCreds } from "./SmartGardenClient";

interface IUserData{
    uid : string;
    firstname : string;
    lastname : string;
    mqttCreds : IMQTTCreds;
}

export interface IUserDoc{
    uid : string;
    firstname : string;
    lastname : string;
    mqtt_username : string;
    mqtt_password : string;
    gardens : Garden[];
}

export class CurrentUser{
  private static user ?: CurrentUser = undefined;
  private userInfo ?: IUserData = undefined;
  private gardens : Garden[] = [];

  private constructor(){
  }

  public static get currentUser(){
    if(this.user){
      return this.user;
    }

    this.user = new CurrentUser();
    return this.user;
  }

  public static loadUser(data : IUserDoc){
    CurrentUser.currentUser.loadUser(data);
  }

  public static get userData(){
    return CurrentUser.currentUser.userData;
  }

  public get userData(){
    return this.userInfo;
  }

  public loadUser(data : IUserDoc){
    const userData : IUserData = {
      uid: data.uid,
      firstname: data.firstname,
      lastname: data.lastname,
      mqttCreds: {
        username: data.mqtt_username,
        password: data.mqtt_password,
        clientid: data.uid,
      }
    };

    this.userInfo = userData;
  }

  public logout(){
    this.userInfo = undefined;
  }
}