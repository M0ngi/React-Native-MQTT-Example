import { FirebaseNotInitedError } from "../errors";
import { initializeApp, FirebaseApp, getApps } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import firebaseConfig from './firebaseConfig.json'

export class FirebaseConfig{
    private static _instance ?: FirebaseConfig = undefined;
    private firebaseApp : FirebaseApp;

    /**
     * Initializes a new {@link FirebaseApp} if it's not already initialized.
     */
    private constructor(){
        const apps = getApps();
        if(apps.length == 0){
            this.firebaseApp = initializeApp(firebaseConfig);
        }
        else{
            this.firebaseApp = apps[0];
        }
    }

    /**
     * Initializes a {@link FirebaseConfig} instance only once
     * 
     * @returns A {@link FirebaseConfig} instance
     */
    public static init(){
        if(this._instance) return this._instance;

        this._instance = new FirebaseConfig();
        return this._instance;
    }

    /**
     * Instance getter for {@link Auth}
     */
    public get auth(){
        return FirebaseConfig.auth;
    }

    /**
     * Instance getter for {@link Firestore}
     */
    public get firestore(){
        return FirebaseConfig.firestore;
    }

    /**
     * Class getter for {@link Auth}
     */
    public static get auth(){
        if(!this._instance) throw new FirebaseNotInitedError();

        return getAuth(this._instance.firebaseApp);
    }

    /**
     * Class getter for {@link Firestore}
     */
    public static get firestore(){
        if(!this._instance) throw new FirebaseNotInitedError();

        return getFirestore(this._instance.firebaseApp);
    }
}