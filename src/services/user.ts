import { CurrentUser, IUserDoc } from '../utils/CurrentUser'
import { getDoc } from 'firebase/firestore';
import { getUserPath } from '../utils/firestore';
import { NotLoggedInError } from '../errors';
import { FirebaseConfig } from '../config/firebase';

export async function loadCurrentUserInfo() : Promise<IUserDoc> {
    if(!FirebaseConfig.auth.currentUser){
        throw new NotLoggedInError();
    }
    const docData = (await getDoc(getUserPath(FirebaseConfig.auth.currentUser.uid))).data();
    if(!docData){
        // TODO: Throw error
        throw new Error("");
    }
    console.log("here2")
    console.log(docData);
    const res : IUserDoc = {
        uid : FirebaseConfig.auth.currentUser.uid,
        firstname : docData.firstname,
        lastname : docData.lastname,
        mqtt_username : docData.mmqtt_username,
        mqtt_password : docData.mqtt_password
    }
    return res;
}