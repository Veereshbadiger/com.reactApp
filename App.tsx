import React from 'react';
import {SafeAreaView,StyleSheet,Text,} from 'react-native';
// import SignInScreen from './src/screens/SignInScreen';
import EmployeeList from './src/components/EmployeeList';
import { EmployeeForm } from './src/components';


function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.root}>
      <EmployeeList />
      <EmployeeForm />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root:{
    flex:1,
    backgroundColor:'#F9FBFC',
  }
});

export default App;
