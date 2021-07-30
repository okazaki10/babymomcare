import 'react-native-gesture-handler';
import * as React from 'react';


import { colors } from '../../../globalstyles';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';
import {  Text} from 'react-native-elements';
import style from '../../../globalstyles';
import Materiedukasi from './materiedukasi';
import Rekomendasimateri from './rekomendasimateri';
const Tab = createMaterialTopTabNavigator();

function Tabmateri() {
  return (
    <View style={{flex:1,backgroundColor:"white"}}>
      <Text style={[style.poppinsbold, { fontSize: 20, marginTop: 20, textAlign: "center" }]}>Kategori Materi Edukasi</Text>
      <View style={[style.line, { height: 3, backgroundColor: '#ECECEC' }]}></View>
      <View style={{
        flex: 1,
      }}>
        <Tab.Navigator
          initialRouteName="Daftarmateri"
          tabBarOptions={{
            activeTintColor: colors.button,
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen
            name="Daftarmateri"
            component={Materiedukasi}
            options={{
              tabBarLabel: "Daftar materi",
            }}
          />
          <Tab.Screen
            name="Rekomendasi"
            component={Rekomendasimateri}
            options={{
              tabBarLabel: "Rekomendasi materi",
            }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default Tabmateri;
