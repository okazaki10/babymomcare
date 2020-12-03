import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



import styles from './globalstyles';


import Mainpage from './containers/nurse/mainpage';
import Login from './containers/login';
import Materiedukasi from './containers/nurse/materiedukasi';
import Detailmateri from './containers/nurse/detailmateri';


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
        <Stack.Screen
          name="Materiedukasi"
          component={Materiedukasi}
          options={{ headerTitle:"Materi Edukasi" }}
        />
        <Stack.Screen
          name="Detailmateri"
          component={Detailmateri}
          options={{ headerTitle:"Materi Edukasi" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
