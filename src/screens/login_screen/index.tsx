import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginByEmail } from "../../services/auth";
import { styles } from './styles';

export default function LoginScreen(){
  const [emailInput, setEmailInout] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const validPassword = true;

  const loginButtonClick = ()=>{
    loginByEmail(emailInput, passwordInput);
  }

  const emailInputHandler = (input : string) => {
    setEmailInout(input);
  }

  const passwordInputHandler = (input : string) =>{
    setPasswordInput(input);
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={[styles.inputContainer, !validPassword && styles.invalidInput ]}>
          <TextInput
            style={styles.inputBox}
            placeholder={"E-mail"}
            placeholderTextColor='#507686'
            keyboardType='email-address'
            onChangeText={emailInputHandler}
            value={emailInput}
          />
        </View>

        <View style={[styles.inputContainer, !validPassword && styles.invalidInput ]}>
          <TextInput
            style={styles.inputBox}
            placeholder={"Password"}
            placeholderTextColor='#507686'
            secureTextEntry={hidePassword}
            onChangeText={passwordInputHandler}
            value={passwordInput}	
          />
        </View>

          <TouchableOpacity style={styles.loginButton} onPress={loginButtonClick} >
            <Text style={[styles.TextButtonText]}>Login</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}