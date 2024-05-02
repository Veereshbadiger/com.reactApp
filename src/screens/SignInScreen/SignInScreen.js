import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native'
import React ,{useState} from 'react'
import Logo from '../../../assets/images/suite.png';
import CustomInput from '../../components/CustomInputs/CustomInput'
import CustomButton from '../../components/CustomBurron/CustomButton';  

const SignInScreen = () => {
  const [Username,setUsername] = useState('');
  const [Password,setPassword] = useState('');

  const {height}=useWindowDimensions();
  
  const onSignInPressed=() =>{
    console.warn("Sign IN");
  }

  const onForgotPressed=() =>{
    console.warn("Forgot Password");
  }
 
  return (
    <View style ={styles.root}>
      <Image source={Logo} style={[styles.logo , {height:height * 0.3}]} resizeMode='contain' />
      <CustomInput 
      placeholder="Username"
      value={Username}
      setValue={setUsername}
      />

      <CustomInput
      placeholder="Password"
      value={Password}
      setValue={setPassword}
      secureTextEntry
      />
      <CustomButton 
      text="Sign In" 
      onPress={onSignInPressed}
      />

      <CustomButton 
      text="Forgot Password" 
      onPress={onForgotPressed} 
      type='TERTIARY'
      />

    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding:20,
  },
  logo: {
    width: '70%',
    maxWidth:300,
    height: 100,
    maxHeight:200,
  },
})

export default SignInScreen