import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { FirebaseConfig } from '../config/firebase';
import HomeScreen from '../screens/home_screen';
import LoginScreen from '../screens/login_screen';
import SignupScreen from '../screens/signup_screen';
import { authChangeHandler } from '../services/auth';

const authStack = createNativeStackNavigator();
const mainStack = createNativeStackNavigator();

const screenOption = {headerShown: false};

function authNavigation(){
  return (
    <authStack.Navigator initialRouteName='loginScreen'>
      <authStack.Screen name='loginScreen' component={LoginScreen} options={screenOption} />
      <authStack.Screen name='signupScreen' component={SignupScreen} options={screenOption} />
    </authStack.Navigator>
  );
}

function mainNavigation(){
  return (
    <mainStack.Navigator initialRouteName='homeScreen'>
      <mainStack.Screen name='homeScreen' component={HomeScreen} options={screenOption} />
    </mainStack.Navigator>
  );
}


export default function Navigator(){
  const [loggedIn, setLoggedIn] = useState(false);
  FirebaseConfig.auth.onAuthStateChanged(async (user)=>{
    await authChangeHandler(user);
    setLoggedIn(user !== null)
  })

  return (
    <NavigationContainer>
      {loggedIn ? mainNavigation() : authNavigation()}
    </NavigationContainer>
  );
}