import { doc } from "firebase/firestore";
import { FirebaseConfig } from "../config/firebase";
import { FirestorePaths } from "../const/firestore";

export function getDoc2(path:string) {
    return doc(FirebaseConfig.firestore, path);
}

export function getUserPath(uid:string) {
    return getDoc2(FirestorePaths.users + uid + "/");
}