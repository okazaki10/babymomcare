import 'react-native-gesture-handler';
import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faCalendarAlt, faBell, faBook, faBookOpen, faComments, faCommentsDollar, faCommentDots, faCog, faClipboardList } from '@fortawesome/free-solid-svg-icons';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../globalstyles';
import Beranda from '../nurse/beranda';
import Materiedukasi from '../nurse/materi/materiedukasi';
import Listpasien from '../nurse/pasien/listpasien';
import Forum from '../nurse/forum/forum';
import Chat from './chat/chat';
import Daftarperawat from './chat/daftarperawat';
import Anjuranpasien from '../nurse/reminder/anjuranpasien';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Image, Dimensions, ScrollView, ImageBackground, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import style from '../../globalstyles';
const Tab = createMaterialTopTabNavigator();

function Tabreminder() {
  return (
    <View style={{flex:1,backgroundColor:"white"}}>
      <Text style={[style.poppinsbold, { fontSize: 20, marginTop: 20, textAlign: "center" }]}>Reminder</Text>
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
              tabBarLabel: "Hari ini",
            }}
          />
          <Tab.Screen
            name="Besok"
            component={Anjuranpasien}
            options={{
              tabBarLabel: "Besok",
            }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default Tabreminder;
