import 'react-native-gesture-handler';
import * as React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {  faHome, faCalendarAlt, faBell, faBook, faBookOpen, faComments, faCommentsDollar, faCommentDots, faCog } from '@fortawesome/free-solid-svg-icons';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../globalstyles';
import Beranda from './beranda';
import Forum from './forum/forum';
import Materiedukasi from './materi/materiedukasi';
import Listpasien from './pasien/listpasien';
import Daftarperawat from '../pasien/chat/daftarperawat';
import { Settings } from 'react-native';
import Pengaturan from './pengaturan/pengaturan';

const Tab = createBottomTabNavigator();

function Menubar() {
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
        component={Materiedukasi}
        options={{
          tabBarLabel: 'Materi',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faBookOpen} size={28} color={color}></FontAwesomeIcon>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Daftarperawat}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faComments} size={28} color={color}></FontAwesomeIcon>
          ),
        }}
      />
       <Tab.Screen
        name="Forum"
        component={Forum}
        options={{
          tabBarLabel: 'Forum',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faCommentDots} size={28} color={color}></FontAwesomeIcon>
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

export default Menubar;