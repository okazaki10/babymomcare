import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



import styles from './globalstyles';


import Mainpage from './containers/pasien/mainpage';
import Login from './containers/login';


const Stack = createStackNavigator();
const headerTitleStyle = [styles.font22, styles.bold];


function Navigation() {
  var initialroute = global.initialroute
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialroute}>
      <Stack.Screen
          name="Mainpage"
          component={Mainpage}
          options={{ headerShown:false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown:false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
