import React from 'react';
import { SafeAreaView, StyleSheet, Button, View } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EmployeeList from './src/components/EmployeeList';
import EmployeeForm from './src/components/EmployeeForm';

const Stack = createStackNavigator();

const HomeScreen = ({navigation}: {navigation: any}) => {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.buttonContainer}>
        <Button title="Go to Employee List" onPress={() => navigation.navigate('EmployeeList')} />
        <Button title="Go to Employee Form" onPress={() => navigation.navigate('EmployeeForm')} />
      </View>
    </SafeAreaView>
  );
};

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="EmployeeList" component={EmployeeList} />
        <Stack.Screen name="EmployeeForm" component={EmployeeForm} />
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
    color:'black',
  },
});

export default App;
