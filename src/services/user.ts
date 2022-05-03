import { CurrentUser, IUserDoc } from '../utils/CurrentUser'
import { DocumentReference, getDoc } from 'firebase/firestore';
import { getUserPath } from '../utils/firestore';
import { NotLoggedInError } from '../errors';
import { FirebaseConfig } from '../config/firebase';
import { Garden } from '../utils/Garden';

export async function loadCurrentUserInfo() : Promise<IUserDoc> {
    if(!FirebaseConfig.auth.currentUser){
        throw new NotLoggedInError();
    }
    const docData = (await getDoc(getUserPath(FirebaseConfig.auth.currentUser.uid))).data();
    if(!docData){
        // TODO: Throw error
        throw new Error("");
    }
    
    console.log("docData");
    const res : IUserDoc = {
        uid : FirebaseConfig.auth.currentUser.uid,
        firstname : docData.firstname,
        lastname : docData.lastname,
        mqtt_username : docData.mmqtt_username,
        mqtt_password : docData.mqtt_password,
        gardens : await loadGardens(docData.gardens),
    }
    return res;
}

export async function loadGardens(gardens : DocumentReference[]) : Promise<Garden[]> {
    let res : Garden[] = [];

    for(let i=0; i<gardens.length; i++){
        let docData = (await getDoc(gardens[i])).data();
        if(!docData){
            throw new Error("");
            // TODO : Handle invalid garden
        }
        let gardenObj = new Garden({name : docData.name, mqtt_id: docData.mqtt_id});
        res.push(gardenObj)
    }

    return res;
}