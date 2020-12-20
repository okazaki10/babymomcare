import 'react-native-gesture-handler';
import * as React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {  faHome, faCalendarAlt, faBell, faBook, faBookOpen, faComments, faCommentsDollar, faCommentDots, faCog, faClipboardList } from '@fortawesome/free-solid-svg-icons';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../globalstyles';
import Beranda from '../nurse/beranda';
import Tabmateri from '../nurse/materi/tabmateri';
import Daftarperawat from '../pasien/chat/daftarperawat';
import Tabreminder from '../pasien/tabreminder';
import Pengaturan from '../nurse/pengaturan/pengaturan';



const Tab = createBottomTabNavigator();

function Menubaradmin() {
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
            <FontAwesomeIcon icon={faComments} size={28} color={color}></FontAwesomeIcon>
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

export default Menubaradmin;