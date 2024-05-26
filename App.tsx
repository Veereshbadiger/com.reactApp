import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Button, View, NativeModules } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EmployeeList from './src/components/EmployeeList';
import EmployeeForm from './src/components/EmployeeForm';
import SignInScreen from './src/screens/SignInScreen'; // Adjust the path to your SignInScreen

const Stack = createStackNavigator();

const HomeScreen = ({navigation}: {navigation: any}) => {
  const onMenuButtonClick = () => {
    NativeModules.DevMenu.show();
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.buttonContainer}>
        <Button title="Go to Employee List" onPress={() => navigation.navigate('EmployeeList')} />
        <Button title="Go to Employee Form" onPress={() => navigation.navigate('EmployeeForm')} />
        <Button title="Open Dev Menu" onPress={onMenuButtonClick} />
      </View>
    </SafeAreaView>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? 'Home' : 'SignIn'}>
        {!isAuthenticated ? (
          <Stack.Screen name="SignIn">
            {props => <SignInScreen {...props} onSignIn={handleSignIn} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="EmployeeList" component={EmployeeList} />
            <Stack.Screen name="EmployeeForm" component={EmployeeForm} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'space-around',
    height: '20%',
    color: 'black',
  },
});

export default App;
