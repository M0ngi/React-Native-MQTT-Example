import { signInWithEmailAndPassword, User } from "firebase/auth";
import { FirebaseConfig } from "../config/firebase";
import { CurrentUser } from "../utils/CurrentUser";
import { SmartGardenClient } from "../utils/SmartGardenClient";
import { loadCurrentUserInfo } from "./user";

export async function loginByEmail(email:string, password: string) {
  const auth = FirebaseConfig.auth;

  if(auth.currentUser){
    // TODO : throw error
    throw new Error("");
  }

  const user = await signInWithEmailAndPassword(auth, email, password).catch((err)=>{
    // TODO : handle error
  })
  if(!user){
    // TODO: throw error
    throw new Error("");
  }
}

export async function authChangeHandler(user:User | null) {
  if(user){
    console.log("Logged in");
    if(CurrentUser.currentUser.userData) {
      if(user.uid !== CurrentUser.currentUser.userData.uid){
        await loadCurrentUserInfo()
          .then((userinfo)=>{
            CurrentUser.currentUser.loadUser(userinfo);
          })
          .catch((err)=>{
            // TODO : handle errors
            console.log(err)
            FirebaseConfig.auth.signOut();
          })
      }
    }
    else{
      await loadCurrentUserInfo()
        .then((userinfo)=>{
          CurrentUser.currentUser.loadUser(userinfo);
        })
        .catch((err)=>{
          // TODO : handle errors
          console.log(err)
          FirebaseConfig.auth.signOut();
        })
    }
    
  }
  else{
    if(CurrentUser.currentUser.userData){
      CurrentUser.currentUser.logout();
    }

    if(SmartGardenClient.isConnected){
      SmartGardenClient.logout();
    }
    
    console.log("Not logged in");
  }
}