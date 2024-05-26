import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, useWindowDimensions } from 'react-native';
import Logo from '../../../assets/images/suite.png'; // Adjust the path to your image
import CustomInput from '../../components/CustomInputs/CustomInput'; // Adjust the path to your custom input component
import CustomButton from '../../components/CustomBurron/CustomButton'; // Adjust the path to your custom button component

const SignInScreen = ({ onSignIn }:{onSignIn:any}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { height } = useWindowDimensions();

  const validateUsername = (username: string) => {
    return /^[a-zA-Z]+$/.test(username);
  };

  const onSignInPressed = () => {
    if (username === '' || password === '') {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (!validateUsername(username)) {
      Alert.alert('Error', 'Username should not contain numbers.');
      return;
    }
    // Implement your authentication logic here
    if (username === 'Test' && password === 'Password') { // This is just a dummy check
      onSignIn();
    } else {
      Alert.alert('Error', 'Invalid username or password.');
    }
  };

  return (
    <View style={styles.root}>
      <Image source={Logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode="contain" />
      <CustomInput placeholder="Username" value={username} setValue={setUsername} secureTextEntry />
      <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry />
      <CustomButton text="Sign In" onPress={onSignInPressed} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    height: 100,
    maxHeight: 200,
  },
});

export default SignInScreen;
