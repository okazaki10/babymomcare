import 'react-native-gesture-handler';
import * as React from 'react';



import { colors } from '../../globalstyles';

import Anjuranpasien from '../nurse/reminder/anjuranpasien';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';
import {  Text} from 'react-native-elements';
import style from '../../globalstyles';
const Tab = createMaterialTopTabNavigator();

function Tabreminder() {
  return (
    <View style={{flex:1,backgroundColor:"white"}}>
      <Text style={[style.poppinsbold, { fontSize: 20, marginTop: 20, textAlign: "center" }]}>Anjuran</Text>
      <View style={[style.line, { height: 3, backgroundColor: '#ECECEC' }]}></View>
      <View style={{
        flex: 1,
      }}>
        <Tab.Navigator
          initialRouteName="Hariini"
          tabBarOptions={{
            activeTintColor: colors.button,
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen
            name="Hariini"
            component={Anjuranpasien}
            options={{
              tabBarLabel: "Anjuran yang disarankan",
            }}
          />
     
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default Tabreminder;
