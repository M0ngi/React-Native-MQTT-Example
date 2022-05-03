import { MQTTPath } from "../const/MQTT";

export function getUserMQTTPath(uid:string) {
    return MQTTPath.root + uid + "/#";
}

export function getPathDetails(path: string) : {userid: string; gardenid: string; category: string;}{
    const decomposed = path.split('/');
    return {userid: decomposed[1], gardenid: decomposed[2], category: decomposed[3]}
}