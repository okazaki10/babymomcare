import 'react-native-gesture-handler';
import * as React from 'react';

import { colors } from '../../../globalstyles';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View} from 'react-native';

import Datanurse from './datanurse';

import Relasipasien from './relasipasien';
const Tab = createMaterialTopTabNavigator();

function Tabnurse() {
  return (
    <View style={{flex:1,backgroundColor:"white"}}>
      <View style={{
        flex: 1,
      }}>
        <Tab.Navigator
          initialRouteName="Datanurse"
          tabBarOptions={{
            activeTintColor: colors.button,
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen
            name="Datanurse"
            component={Datanurse}
            options={{
              tabBarLabel: "Data Profil",
            }}
          />
            <Tab.Screen
            name="Relasipasien"
            component={Relasipasien}
            options={{
              tabBarLabel: "Relasi Pasien",
            }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default Tabnurse;
