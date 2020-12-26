import 'react-native-gesture-handler';
import * as React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {  faHome, faCalendarAlt, faBell, faBook, faBookOpen, faComments, faCommentsDollar, faCommentDots, faCog, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { View, Image, Dimensions, ScrollView, ImageBackground, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';

import Beranda from '../nurse/beranda';
import Daftarperawat from './chat/daftarperawat';
import Tabreminder from './tabreminder';
import Pengaturan from '../nurse/pengaturan/pengaturan';
import Tabmateri from '../nurse/materi/tabmateri';


const Tab = createBottomTabNavigator();

function Menubarpasien() {
  return (
    <Tab.Navigator
      initialRouteName="Beranda"
      tabBarOptions={{
        activeTintColor: "#F0BA7D",
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Beranda"
        component={Beranda}
        options={{
          tabBarLabel: 'Beranda',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faHome} size={28} color={color}></FontAwesomeIcon>
          ),
        }}
      />
      <Tab.Screen
        name="Materi"
        component={Tabmateri}
        options={{
          tabBarLabel: 'Materi',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faBookOpen} size={28} color={color}></FontAwesomeIcon>
          ),
        }}
      />
      <Tab.Screen
        name="Daftarperawat"
        component={Daftarperawat}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({color, size}) => (
            <View>
            <View style={{ position: "absolute", top: -5, right: -3,zIndex:100,backgroundColor:"red",width:18,height:18,justifyContent:"center",alignItems:"center",borderRadius:50}}>
              <Text style={{fontSize:12,color:"white"}}>1</Text>
            </View>
            <FontAwesomeIcon icon={faComments} size={28} color={color}></FontAwesomeIcon>
          </View>
          ),
        }}
      />
       <Tab.Screen
        name="Reminder"
        component={Tabreminder}
        options={{
          tabBarLabel: 'Reminder',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faClipboardList} size={28} color={color}></FontAwesomeIcon>
          ),
        }}
      />
       <Tab.Screen
        name="Settings"
        component={Pengaturan}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faCog} size={28} color={color}></FontAwesomeIcon>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Menubarpasien;
