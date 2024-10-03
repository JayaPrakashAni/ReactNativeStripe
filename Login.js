import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  Linking,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { AuthContext } from "./AuthContext";

const LoginScreen = ({ navigation }) => {
  const { login, signOut } = useContext(AuthContext);
  const signInLogo = require('../Assets/Icon/cmpylogo.png');

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const Separator = () => (
    <View style={styles.separatorContainer}>
      <View style={styles.line} />
      <Text style={styles.separatorText}>or</Text>
      <View style={styles.line} />
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground style={{ width: '100%', height: '100%', backgroundColor: 'white' }} >
        <Image style={styles.logo} source={signInLogo} />
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <Text style={styles.loginText}>Login</Text>
            <TextInput style={styles.input}
              placeholder="Enter Username"
              placeholderTextColor="black"
              value={username}
              onChangeText={text => setUsername(text)} />

            <TextInput style={styles.input}
              placeholder="Enter Password" secureTextEntry
              placeholderTextColor="black"
              value={password}
              onChangeText={text => setPassword(text)} />

            <View style={{ alignItems: 'center' }}>
              <Separator />
              <TouchableOpacity onPress={() => {
                signOut();
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Back' }],
                });
              }}>
                <Text style={styles.skipText}>Skip to Home</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text style={styles.account}>Don't have an Account?</Text>
              <TouchableOpacity onPress={() => Linking.openURL("https://my.bmusician.com/Account/Register")}>
                <Text style={styles.signUPlink}> Signup</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.signInButton}
              onPress={async () => {
                const success = await login(username, password);
                if (success) {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Back' }],
                  });
                }
              }} >
              <Text style={styles.signInButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '90%',
    padding: 5,
  },
  loginText: {
    width: 65,
    height: 32,
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 150,
    marginTop: 50,
    marginBottom: 50,
    color: '#183151',
  },
  input: {
    paddingVertical: 10,
    borderWidth: 3,
    marginBottom: 30,
    borderColor: '#bbb',
    paddingHorizontal: 25,
    borderRadius: 10,
    fontSize: 16,
  },
  signUPlink: {
    color: 'blue',
    fontSize: 18,
    padding: 10,
    fontWeight: 'bold',
    marginTop: 100,
  },
  logo: {
    width: 220,
    height: 50,
    resizeMode: "stretch",
    marginTop: 70,
    padding: 20,
    marginLeft: 90,
  },
  account: {
    fontSize: 18,
    color: 'black',
    padding: 10,
    marginTop: 100,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#D3D3D3',
  },
  separatorText: {
    marginHorizontal: 10,
    color: 'grey',
    fontSize: 18,
  },
  skipText: {
    marginTop: 20,
    fontSize: 16,
    color: 'purple',
    backgroundColor: 'lightgrey',
    paddingVertical: 6,
    textAlign: 'center',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'grey',
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
  signInButton: {
    height: 50,
    backgroundColor: '#183151',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 1 }, // Shadow offset for iOS
    shadowOpacity: 0.2, // Shadow opacity for iOS
    shadowRadius: 1.41, // Shadow radius for iOS
    elevation: 2, // Elevation for Android
    marginTop: 20,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
