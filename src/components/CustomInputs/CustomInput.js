import { View
  , TextInput, StyleSheet } from 'react-native'
import React from 'react'

const CustomInput = ({ value,setValue,placeholder,secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <TextInput
      value={value}
      onChangeText={setValue}
      placeholder={placeholder} 
      placeholderTextColor="gray"
      style={styles.input}
      secureTextEntry={secureTextEntry}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    color:'black',
  },
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
})

export default CustomInput
